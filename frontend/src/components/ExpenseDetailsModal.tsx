import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

import { formatCurrencyRM, formatDateDDMMYYYY } from "../utils/general.js";
import { getExpenseItem } from "../services/ExpenseService.js";

interface ExpenseDetailsModalProps {
  expenseID: string | number | null;
  isOpen: boolean;
  onClose: () => void;
}

const ExpenseDetailsModal: React.FC<ExpenseDetailsModalProps> = ({
  expenseID,
  isOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [expense, setExpense] = useState<any>(null);

  useEffect(() => {
    if (!isOpen || !expenseID) return;

    setIsLoading(true);
    getExpenseItem(expenseID, (data) => {
      setExpense(data?.item || data || null);
      setIsLoading(false);
    });
  }, [isOpen, expenseID]);

  const handleClose = () => {
    setExpense(null);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Expense details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="d-flex align-items-center">
            <Spinner animation="border" size="sm" className="me-2" />
            <span>Loading...</span>
          </div>
        ) : expense ? (
          <>
            <div className="row mb-2">
              <div className="col-12 col-md-4 secondary-text-color">Amount</div>
              <div className="col-12 col-md-8 font-weight-thick">
                {formatCurrencyRM(expense.amount) || expense.amount || "-"}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-md-4 secondary-text-color">Category</div>
              <div className="col-12 col-md-8 font-weight-thick">{expense.category || "-"}</div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-md-4 secondary-text-color">Description</div>
              <div className="col-12 col-md-8 font-weight-thick">{expense.description || "-"}</div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 secondary-text-color">Expense date</div>
              <div className="col-12 col-md-8 font-weight-thick">
                {formatDateDDMMYYYY(expense.date) || expense.date || "-"}
              </div>
            </div>
          </>
        ) : (
          <div className="secondary-text-color">Expense details could not be loaded.</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExpenseDetailsModal;
