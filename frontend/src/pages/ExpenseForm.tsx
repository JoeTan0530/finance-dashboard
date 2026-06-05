import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import CustomSelect from "../components/CustomSelect.tsx";
import { showSystemPopup } from "../services/CustomSystemPopupService.js";
import { getCategoryList } from "../services/CategoryService.js";
import { addExpense, editExpense, getExpenseItem } from "../services/ExpenseService.js";
import { formatDateForInitialInput, restrictNumberOnly } from "../utils/general.js";

type ExpenseFormMode = "add" | "edit";

interface ExpenseFormProps {
  mode: ExpenseFormMode;
}

const expenseToForm = (expense) => {
  if (!expense) return {};
  return {
    amount: expense.amount || "",
    category: expense.category || "",
    description: expense.description || "",
    inputDate: expense.date ? formatDateForInitialInput(expense.date) : "",
  };
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { expenseID } = useParams();
  const isEdit = mode === "edit";

  const todayDate = new Date();
  const [formInputData, setFormInputData] = useState<any>({
    amount: "",
    category: "",
    description: "",
    inputDate: `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, "0")}-${String(todayDate.getDate()).padStart(2, "0")}`,
  });
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [useCustomCategory, setUseCustomCategory] = useState(false);
  const [errMsg, setErrMsg] = useState<any>({});

  const requiredOk = useMemo(() => {
    return formInputData.amount?.toString().trim() && formInputData.category?.toString().trim();
  }, [formInputData]);

  useEffect(() => {
    getCategoryList((data) => {
      setCategoryOptions(Array.isArray(data) ? data : []);
    });
  }, []);

  useEffect(() => {
    if (!isEdit || !expenseID) return;
    getExpenseItem(expenseID, (data) => {
      const item = data?.item || data || null;
      setFormInputData((prev) => ({ ...prev, ...expenseToForm(item) }));
    });
  }, [isEdit, expenseID]);

  const updateFormInput = (events) => {
    const { id, value } = events.target;
    setFormInputData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const updateSelect = (id, val) => {
    setFormInputData((prevData) => ({
      ...prevData,
      [id]: val,
    }));
  };

  const toggleCategoryInput = () => {
    setUseCustomCategory((prev) => !prev);
    setFormInputData((prev) => ({
      ...prev,
      category: "",
    }));
  };

  const triggerSave = () => {
    setErrMsg({});

    const payload = {
      amount: formInputData.amount,
      category: formInputData.category,
      description: formInputData.description,
      inputDate: formInputData.inputDate,
    };

    if (isEdit) {
      editExpense({ ...payload, expenseID }, () => {
        showSystemPopup("Expense updated.", "success");
        navigate("/dashboard");
      }, setErrMsg);
      return;
    }

    addExpense(payload, () => {
      showSystemPopup("Expense added.", "success");
      navigate("/dashboard");
    }, setErrMsg);
  };

  return (
    <>
      <div className="mb-2">
        <button type="button" className="sidebar-btn back-btn" onClick={() => navigate("/dashboard")}>
          <FontAwesomeIcon icon={faAnglesLeft} className="btn-icon" />
          Back
        </button>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
        <div>
          <h1 className="page-title mb-0">{isEdit ? "Edit expense" : "Add expense"}</h1>
          <h3 className="page-sub-title mb-0">
            {isEdit ? `Expense ID: ${expenseID}` : "Record a new expense"}
          </h3>
        </div>
        <div className="d-flex d-md-block justify-content-end mt-3 mt-md-0">
          <Button variant="primary" onClick={triggerSave} disabled={!requiredOk}>
            <FontAwesomeIcon icon={faFloppyDisk} className="btn-icon" />
            <span>Save</span>
          </Button>
        </div>
      </div>

      <div className="form-container">
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="form-group" controlId="amount">
              <Form.Label>
                Amount <span className="required-asterisk">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={formInputData.amount}
                onChange={(event) => {
                  restrictNumberOnly(event);
                  updateFormInput(event);
                }}
              />
              {errMsg?.amount && <div className="form-error-msg">{errMsg.amount}</div>}
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="form-group" controlId="category">
              <div className="category-toggle-row">
                <Form.Label className="mb-0">
                  Category <span className="required-asterisk">*</span>
                </Form.Label>
                <Form.Check
                  type="switch"
                  id="categoryInputToggle"
                  label={useCustomCategory ? "Custom input" : "Dropdown"}
                  checked={useCustomCategory}
                  onChange={toggleCategoryInput}
                />
              </div>
              {useCustomCategory ? (
                <Form.Control
                  id="category"
                  type="text"
                  value={formInputData.category}
                  onChange={updateFormInput}
                  placeholder="Enter new category"
                />
              ) : (
                <CustomSelect
                  selectID="category"
                  selectOptions={categoryOptions}
                  currentValue={formInputData.category}
                  addDefaultAllOption={false}
                  handleSelectValue={(event) => updateSelect("category", event.target.value)}
                />
              )}
              {errMsg?.category && <div className="form-error-msg">{errMsg.category}</div>}
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group className="form-group" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formInputData.description}
                onChange={updateFormInput}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="form-group" controlId="inputDate">
              <Form.Label>Expense Date</Form.Label>
              <Form.Control type="date" value={formInputData.inputDate} onChange={updateFormInput} />
            </Form.Group>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ExpenseForm;
