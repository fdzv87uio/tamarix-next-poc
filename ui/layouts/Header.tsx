import { Box, Button, styled } from "@mui/material";
import Link from "next/link";
import React from "react";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  //Button,
} from "reactstrap";

function Header({
  portfolios,
  setCurrentPortfolio,
  handleViewChange,
  currentView,
}: {
  portfolios: any;
  setCurrentPortfolio: any;
  handleViewChange: any;
  currentView: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  // const toggle = () => setDropdownOpen((prevState) => !prevState);
  // const Handletoggle = () => {
  //   setIsOpen(!isOpen);
  // };
  // const showMobilemenu = () => {
  //   document.getElementById("sidebarArea").classList.toggle("showSidebar");
  // };
  return (
    <Navbar
      dark
      expand="md"
      style={{ height: "70px", backgroundColor: "#2478cb" }}
    >
      <NavItemWrapper>
        <Nav className="me-auto" navbar>
          {currentView === "portfolios" ||
          currentView === "scenarios" ||
          currentView === "projections" ? (
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                Select Portfolio
              </DropdownToggle>
              <DropdownMenu end>
                {portfolios.map((item: any, key: number) => {
                  return (
                    <DropdownItem
                      key={`portfolio_${key}`}
                      onClick={() => {
                        setCurrentPortfolio(item);
                        console.log(item);
                      }}
                    >
                      {item}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : null}
        </Nav>
      </NavItemWrapper>
    </Navbar>
  );
}

export default Header;

const BtnSearch = styled(Button)(() => ({
  width: 50,
  height: 50,
  padding: 6,
}));

const NavItemWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
}));

const NavItemText = styled(Box)(() => ({
  color: "#ececec",
  paddingTop: "9px",
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingBottom: "9px",
  flexDirection: "row",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));
