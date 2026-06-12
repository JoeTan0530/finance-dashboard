import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import CustomTable from "../components/CustomTable.tsx";
import CustomPieChart from "../components/CustomPieChart.tsx";
import CustomProgressBar from "../components/CustomProgressBar.tsx";
import CustomSelect from "../components/CustomSelect.tsx";
import ExpenseDetailsModal from "../components/ExpenseDetailsModal.tsx";
import { showSystemPopup } from "../services/CustomSystemPopupService.js";
import { showConfirmModal } from "../services/CustomConfirmModalService.js";
import { formatCurrencyRM, formatDateDDMMYYYY, restrictNumberOnly } from "../utils/general.js";
import { getCategoryList } from "../services/CategoryService.js";
import { getExpenseList, removeExpense, getWeeklyExpense, getMonthlyExpense } from "../services/ExpenseService.js";
import { getBudgetOptions, getBudgetList, addBudgetItem, editBudgetItem, removeBudget } from "../services/BudgetService.js";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [rawList, setRawList] = useState([]);
  const [categoryMap, setCategoryMap] = useState<any>({});
  const [pagination, setPagination] = useState({});
  const [selectedExpenseID, setSelectedExpenseID] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [weeklyChartData, setWeeklyChartData] = useState([]);
  const [monthlyChartData, setMonthlyChartData] = useState([]);
  const dataList = useRef([]);

  const [budgetOptions, setBudgetOptions] = useState([]);
  const [budgetList, setBudgetList] = useState([]);
  const budgetDataList = useRef([]);
  const [addBudgetFormInput, setAddBudgetFormInput] = useState<any>({
    amount: "",
    type: ""
  });

  const [budgetSection, setBudgetSection] = useState("display");

  const refreshList = useCallback((pageNum = 1) => {
    getExpenseList(pageNum, (data) => {
      const list = data?.listing || data || [];
      setRawList(Array.isArray(list) ? list : []);
      dataList.current = Array.isArray(list) ? list : [];
      setPagination(data?.pagination || {});
    });
    getPieChartData();
  }, []);

  const getPieChartData = useCallback(() => {
    getWeeklyExpense((data) => {
      setWeeklyChartData(mapListForPieChart(data));
    });

    getMonthlyExpense((data) => {
      setMonthlyChartData(mapListForPieChart(data));
    });
  }, []);

  const getBudgetOptionList = useCallback(() => {
    getBudgetOptions((data) => {
      setBudgetOptions(data);
      setAddBudgetFormInput((prevData) => ({
        ...prevData,
        type: data[0]['value'],
      }));
    });
  }, []);

  const getBudgetDataList = useCallback(() => {
    getBudgetList((data) => {
      setBudgetList(data ? data : []);
      budgetDataList.current = Array.isArray(data) ? data : [];
    });
  }, []);

  useEffect(() => {
    getCategoryList((data) => {
      const list = Array.isArray(data) ? data : [];
      const nextMap = {};
      list.forEach((item) => {
        nextMap[item.value] = item.label;
      });
      setCategoryMap(nextMap);
    });

    getBudgetOptionList();
    getBudgetDataList();
  }, []);

  useEffect(() => {
    getPieChartData();
  }, [categoryMap]);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  const mapListForPieChart = (chartDataArr) => {
    let recordCategoryList = [];

    chartDataArr.forEach((item, index) => {
      recordCategoryList.push({
        label: categoryMap[item.category] ? categoryMap[item.category] : item.category,
        value: item.amount
      });
    });

    return recordCategoryList;
  }

  const openDetailsModal = (expenseID) => {
    setSelectedExpenseID(expenseID);
    setIsDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsOpen(false);
    setSelectedExpenseID(null);
  };

  const triggerDelete = useCallback(async (expenseID) => {
    const expenseItem = dataList.current.find((item) => item.expenseID === expenseID);

    const ok = await showConfirmModal({
      title: "Delete expense",
      message: (
        <>
          <div className="mb-3">This will permanently remove the expense record.</div>
          <div className="row mb-2">
            <div className="col-12 col-md-4">Amount:</div>
            <div className="col-12 col-md-8 font-weight-thick">
              {formatCurrencyRM(expenseItem?.amount) || expenseItem?.amount || "-"}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-12 col-md-4">Category:</div>
            <div className="col-12 col-md-8 font-weight-thick">
              {categoryMap[expenseItem?.category] || expenseItem?.category || "-"}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4">Description:</div>
            <div className="col-12 col-md-8 font-weight-thick">{expenseItem?.description || "-"}</div>
          </div>
        </>
      ),
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmVariant: "danger",
    });

    if (!ok) return;

    removeExpense(expenseID, () => {
      showSystemPopup("Expense deleted. Refreshing list.", "success");
      refreshList();
    });
  }, [categoryMap, refreshList]);

  const updateAddBudgetFormInput = (events) => {
    const { id, value } = events.target;
    setAddBudgetFormInput((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const updateSelect = (id, val) => {
    setAddBudgetFormInput((prevData) => ({
      ...prevData,
      [id]: val,
    }));
  };

  const changeBudgetSection = useCallback(async (sectionName) => {
    setBudgetSection(sectionName);
  });

  const triggerAddBudget = useCallback(async () => {
    addBudgetItem(addBudgetFormInput, (data) => {
      showSystemPopup("Successfully added budget setting.");
      getBudgetDataList();
      changeBudgetSection("display");
    });
  });

  const triggerDeleteBudget = useCallback(async (budgetID) => {
    const budgetItem = budgetDataList.current.find((item) => item.budgetID === budgetID);
    
    const ok = await showConfirmModal({
      title: "Delete Budget",
      message: (
        <>
          <div className="mb-3">This will permanently remove the budget setting.</div>
          <div className="row mb-2">
            <div className="col-12 col-md-4">Limit:</div>
            <div className="col-12 col-md-8 font-weight-thick">
              {formatCurrencyRM(budgetItem?.amount) || budgetItem?.amount || "-"}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-12 col-md-4">Type:</div>
            <div className="col-12 col-md-8 font-weight-thick">
              {budgetItem?.type || budgetItem?.type || "-"}
            </div>
          </div>
        </>
      ),
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmVariant: "danger"
    });

    if (!ok) return;

    removeBudget(budgetID, () => {
      showSystemPopup("Successfully removed budget setting.");
      getBudgetDataList();
    });
  });

  const columns = useMemo(
    () => [
      {
        header: "Amount",
        render: (row) => formatCurrencyRM(row.amount) || row.amount || "-",
      },
      {
        header: "Category",
        render: (row) => categoryMap[row.category] || row.category || "-",
      },
      {
        header: "Description",
        render: (row) => (
          <div className="text-ellipsis-1" style={{ maxWidth: 260 }}>
            {row.description || "-"}
          </div>
        ),
      },
      {
        header: "Expense Date",
        render: (row) => formatDateDDMMYYYY(row.date) || row.date || "-",
      },
      {
        header: "Actions",
        render: (row) => (
          <div className="d-flex justify-content-end">
            <Button
              variant="tertiary"
              className="me-1"
              title="View"
              aria-label="View expense details"
              onClick={() => openDetailsModal(row.expenseID)}
            >
              <FontAwesomeIcon icon={faEye} className="btn-icon" />
            </Button>
            <Button
              variant="tertiary"
              className="me-1"
              title="Edit"
              aria-label="Edit expense"
              onClick={() => navigate(`/expenses/${row.expenseID}/edit`)}
            >
              <FontAwesomeIcon icon={faPenToSquare} className="btn-icon" />
            </Button>
            <Button
              variant="tertiary"
              title="Delete"
              aria-label="Delete expense"
              onClick={() => triggerDelete(row.expenseID)}
            >
              <FontAwesomeIcon icon={faTrash} className="btn-icon" />
            </Button>
          </div>
        ),
      },
    ],
    [navigate, categoryMap, triggerDelete]
  );

  const listCss = useMemo(
    () => ({
      header: [{ index: 4, css: { textAlign: "right" } }],
      listing: [{ index: 4, css: { textAlign: "right" } }],
    }),
    []
  );

  return (
    <>
      <Row className="mb-3 align-items-start">
        {
          (budgetList.length !== 0 || monthlyChartData.length !== 0 || weeklyChartData.length !== 0) && (
            <>
              <Col xs={12} className="mb-2">
                <Row>
                  <Col xs={12} xl={6} className="mb-4 mb-xl-0">
                    <Row>
                      <Col xs={12} md={6}>
                        <CustomPieChart 
                          chartDataList={monthlyChartData}
                          chartTitle="Monthly Spending (RM)"
                          emptyChartTitle="No expenses data yet."
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <CustomPieChart 
                          chartDataList={weeklyChartData}
                          chartTitle="Weekly Spending (RM)"
                          emptyChartTitle="No expenses data yet."
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} xl={6} className="d-flex justify-content-center align-items-cetner">
                    {
                      budgetSection == "display" && (
                        <>
                          {
                            budgetList.length === 0 && (
                              <div className="d-flex align-items-center h-100">
                                <Button variant="primary" onClick={() => changeBudgetSection("form")}>
                                  <FontAwesomeIcon icon={faPlus} className="btn-icon" />
                                  <span>Add Budget</span>
                                </Button>
                              </div>
                            )
                          }
                          {
                            budgetList && budgetList.length > 0 && (
                              <div className="w-100">
                                {
                                  budgetList.length < Object.keys(budgetOptions).length && (
                                    <div className="d-flex justify-content-end w-100">
                                      <Button variant="primary" onClick={() => changeBudgetSection("form")}>
                                        <FontAwesomeIcon icon={faPlus} className="btn-icon" />
                                        <span>Add Budget</span>
                                      </Button>
                                    </div>
                                  )
                                }
                                {
                                  budgetList && budgetList.map((item, index) => {
                                    return (
                                      <div key={`budgetProgressBar${index}`} className={`w-100 ${index === budgetList.length - 1 ? "" : "mb-3"}`}>
                                        <div className="d-flex justify-content-between mb-2">
                                          <span className="font-size-md font-weight-thick">
                                            {item.type}
                                          </span>
                                          <div className="d-flex align-items-center">
                                            <Button variant="tertiary" onClick={() => triggerDeleteBudget(item.budgetID)}>
                                              Delete
                                            </Button>
                                          </div>
                                        </div>
                                        <CustomProgressBar limit={item.amount} currentValue={item.totalExpense} showProgressValue={true}/>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            )
                          }     
                        </>
                      )
                    }
                    {
                      budgetSection === "form" && (
                        <div className="w-100">
                          <Form id="addBudgetForm">
                            <Form.Group className="form-group" controlId="amount">
                                <Form.Label>Budget limit</Form.Label>
                                <Form.Control 
                                  type="text" 
                                  onChange={(event) => {
                                    restrictNumberOnly(event);
                                    updateAddBudgetFormInput(event);
                                  }}
                                />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="type">
                              <Form.Label>Budget type</Form.Label>
                              <CustomSelect
                                selectID="type"
                                selectOptions={budgetOptions}
                                currentValue={addBudgetFormInput.type}
                                addDefaultAllOption={false}
                                handleSelectValue={(event) => updateSelect("type", event.target.value)}
                              />
                            </Form.Group>
                          </Form>
                          <div className="d-flex justify-content-end w-100">
                            <Button variant="secondary" className="me-2" onClick={() => changeBudgetSection("display")}>
                              Cancel
                            </Button>
                            <Button variant="primary" onClick={triggerAddBudget}>
                              Add Budget
                            </Button>
                          </div>
                        </div>
                      )
                    }
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <hr/>
              </Col>
            </>
          )
        }
        <Col xs={12}>
          <Row className="align-items-end">
            <Col>
              <h1 className="page-title">All Expenses</h1>
              <h3 className="page-sub-title">Overview of your spending</h3>
            </Col>
            <Col xs="auto" className="mt-3 mt-md-0">
              <Button variant="primary" className="max-content-width" onClick={() => navigate("/expenses/new")}>
                <FontAwesomeIcon icon={faPlus} className="btn-icon" />
                <span>Add expense</span>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <div className="mt-3">
        <CustomTable
          listingID="expenseList"
          listingData={rawList}
          columns={columns}
          listingCss={listCss}
          pagingData={pagination}
          pagingFunction={refreshList}
          emptyTitle="No expenses yet"
          emptySubtitle='Click "Add expense" to create your first record'
        />
      </div>

      <ExpenseDetailsModal
        expenseID={selectedExpenseID}
        isOpen={isDetailsOpen}
        onClose={closeDetailsModal}
      />
    </>
  );
};

export default Dashboard;
