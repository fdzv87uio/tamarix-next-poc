import Sidebar from "./Sidebar";
import Header from "./Header";
import { ReactNode } from "react";

function FullLayout({
  handleViewChange,
  children,
  portfolios,
  setCurrentPortfolio,
  currentView,
}: {
  handleViewChange: any;
  children: ReactNode;
  portfolios: any;
  setCurrentPortfolio: any;
  currentView: string;
}) {
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        <aside
          style={{ zIndex: 99 }}
          className="sidebarArea shadow"
          id="sidebarArea"
        >
          <Sidebar handleViewChange={handleViewChange} />
        </aside>
        <div style={{ width: "100%", height: "100%" }}>
          <Header
            setCurrentPortfolio={setCurrentPortfolio}
            portfolios={portfolios}
            handleViewChange={handleViewChange}
            currentView={currentView}
          />
          <div
            style={{
              backgroundColor: "#FAFAFA",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

export default FullLayout;
