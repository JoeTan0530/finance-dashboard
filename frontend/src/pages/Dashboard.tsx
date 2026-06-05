import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import CustomTable from "../components/CustomTable.tsx";
import ExpenseDetailsModal from "../components/ExpenseDetailsModal.tsx";
import { showSystemPopup } from "../services/CustomSystemPopupService.js";
import { showConfirmModal } from "../services/CustomConfirmModalService.js";
import { formatCurrencyRM, formatDateDDMMYYYY } from "../utils/general.js";
import { getCategoryList } from "../services/CategoryService.js";
import { getExpenseList, removeExpense } from "../services/ExpenseService.js";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [rawList, setRawList] = useState([]);
  const [categoryMap, setCategoryMap] = useState<any>({});
  const [pagination, setPagination] = useState({});
  const [selectedExpenseID, setSelectedExpenseID] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const dataList = useRef([]);

  const refreshList = useCallback((pageNum = 1) => {
    getExpenseList(pageNum, (data) => {
      const list = data?.listing || data || [];
      setRawList(Array.isArray(list) ? list : []);
      dataList.current = Array.isArray(list) ? list : [];
      setPagination(data?.pagination || {});
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
  }, []);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

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
        <Col>
          <h1 className="page-title">Expenses</h1>
          <h3 className="page-sub-title">Overview of your spending</h3>
        </Col>
        <Col xs="auto" className="mt-3 mt-md-0">
          <Button variant="primary" onClick={() => navigate("/expenses/new")}>
            <FontAwesomeIcon icon={faPlus} className="btn-icon" />
            <span>Add expense</span>
          </Button>
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
