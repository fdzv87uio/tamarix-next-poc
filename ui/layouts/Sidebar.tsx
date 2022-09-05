import { CSSProperties } from "react";
import { Button, Nav, NavItem } from "reactstrap";

const navigation = [
  {
    title: "Home",
    value: "home",
    icon: "bi bi-house-door",
  },
  {
    title: "Portfolios",
    value: "portfolios",
    icon: "bi bi-wallet2",
  },
  {
    title: "Scenarios",
    value: "scenarios",
    icon: "bi bi-card-list",
  },
  {
    title: "Projections",
    value: "projections",
    icon: "bi bi-bar-chart-line",
  },
];

function Sidebar({ handleViewChange }: { handleViewChange: any }) {
  // const showMobilemenu = () => {
  //   document.getElementById("sidebarArea").classList.toggle("showSidebar");
  // };
  // let location = useLocation();

  return (
    <div style={{ height: "100vh", zIndex: 99 }} className="p-3">
      <div className="pt-4 mt-2">
        <Nav vertical>
          {navigation.map((navi, index) => (
            <NavItem
              onClick={() => {
                handleViewChange(navi.value);
              }}
              key={index}
              style={navItem}
            >
              <div style={navItemWrapper}>
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </div>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;

// STYLES

const navItem: CSSProperties = {
  cursor: "pointer",
};

const navItemWrapper: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  margin: "10px",
  padding: "5px",
};
