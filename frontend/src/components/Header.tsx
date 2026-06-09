import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBars, faXmark, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../utils/general";
import { showSystemPopup } from '../services/CustomSystemPopupService.js';

const HeaderDisplay: React.FC = () => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const sidebarDisplayRef = useRef(null);
  const [sidebarContainer, setSidebarContainer] = useState(false);

  const toggleSidebar = () => {
    setSidebarContainer((prevState) => !prevState);
  };

  const handleLogout = () => {
    showSystemPopup("Logging out...", 'success');
    logoutUser();
  };

  useEffect(() => {
    if (sidebarContainer) {
      sidebarRef.current.classList.remove("closed-sidebar");
      sidebarDisplayRef.current.classList.remove("closing-sidebar");
      sidebarDisplayRef.current.classList.add("opening-sidebar");
    } else {
      sidebarDisplayRef.current.classList.remove("opening-sidebar");
      sidebarDisplayRef.current.classList.add("closing-sidebar");
      setTimeout(() => {
        sidebarRef.current.classList.add("closed-sidebar");
      }, 300);
    }
  }, [sidebarContainer]);

  return (
    <>
      <Row className="header-outer-row">
        <Col>
          <Container className="header-container">
            <Row className="justify-content-between align-items-center">
              <Col xs={9} md={6}>
                <div className="d-flex align-items-center">
                  <a href="/dashboard" className="d-flex align-items-center header-logo-anchor">
                    <FontAwesomeIcon icon={faChartLine} className="header-logo-icon me-2" />
                    <div className="header-logo-text">Finance Dashboard</div>
                  </a>
                </div>
              </Col>
              <Col xs={3} md={6}>
                <div className="d-flex d-md-none justify-content-end align-items-center">
                  <div>
                    <button type="button" className="header-btn sidebar-btn" onClick={toggleSidebar}>
                      <FontAwesomeIcon icon={faBars} />
                    </button>
                  </div>
                  <div id="sidebarContainer" className="sidebar-container closed-sidebar" ref={sidebarRef}>
                    <div className="sidebar-background">
                      <div className="sidebar-display" ref={sidebarDisplayRef}>
                        <div className="sidebar-list">
                          <div className="d-flex justify-content-end w-100 mb-2">
                            <button type="button" className="sidebar-close-btn" onClick={toggleSidebar}>
                              <FontAwesomeIcon icon={faXmark} className="sidebar-close-btn-icon" />
                            </button>
                          </div>
                          <a href="/dashboard" className="sidebar-btn" onClick={toggleSidebar}>
                            Expenses
                          </a>
                          <a href="/expenses/new" className="sidebar-btn" onClick={toggleSidebar}>
                            Add expense
                          </a>
                          <button type="button" className="sidebar-btn logout-btn" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className="header-icon logout-icon me-1" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-none d-md-flex justify-content-end align-items-center">
                  <a href="/dashboard" className="header-btn">
                    Expenses
                  </a>
                  <a href="/expenses/new" className="header-btn">
                    Add expense
                  </a>
                  <button type="button" className="header-btn logout-btn" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="header-icon logout-icon me-1" />
                    <span>Logout</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default HeaderDisplay;
