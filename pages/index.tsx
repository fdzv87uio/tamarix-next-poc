import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import FullLayout from "../ui/layouts/FullLayout";
import HomePage from "../ui/views/HomePage";
import Portfolio from "../ui/views/Portfolio";
import Projection from "../ui/views/Projection";
import Scenario from "../ui/views/Scenario";

const Home: NextPage = () => {
  // View Hooks
  const [currentView, setCurrentView] = useState<string>("home");
  //Data Hooks
  const [portfolios, setPortfolios] = useState<any>();
  const [currentPortfolio, setCurrentPortfolio] = useState<any>();
  const [currentPortfolioData, setCurrentPortfolioData] = useState<any>();
  const [scenarios, setScenarios] = useState<any>();
  const [currentScenario, setCurrentScenario] = useState<any>();
  const [currentScenarioData, setCurrentScenarioData] = useState<any>();

  useEffect(() => {
    if (!portfolios) {
      getAllPortfolios();
    }
    if (!currentPortfolio && portfolios) {
      setCurrentPortfolio(portfolios[0]);
    }
    if (currentPortfolio && !scenarios) {
      getAllScenarios(currentPortfolio);
    }
    if (currentPortfolio) {
      getCurrentPortfolioData(currentPortfolio);
    }
    if (!currentScenario && scenarios) {
      setCurrentScenario(scenarios[0]);
    }
    if (currentScenario && currentPortfolio) {
      getCurrentScenarioData(currentScenario);
    }
  }, [portfolios, scenarios, currentPortfolio, currentScenario]);

  // get the list of all portfolios
  async function getAllPortfolios() {
    const url =
      "https://tamarix-technical-interview.herokuapp.com/users/me/portfolios";
    const { data } = await axios.get(url);
    if (data) {
      setPortfolios(data.portfolios);
    }
  }

  // get the list of all portfolios
  async function getCurrentPortfolioData(name: string) {
    const url = `https://tamarix-technical-interview.herokuapp.com/users/me/portfolios/${name}`;
    const { data } = await axios.get(url);
    if (data) {
      setCurrentPortfolioData(data);
    }
  }

  // get the list of all scenarios per portfolio
  async function getAllScenarios(name: string) {
    const url = `https://tamarix-technical-interview.herokuapp.com/users/me/portfolios/${name}/scenarios`;
    const { data } = await axios.get(url);
    if (data) {
      setScenarios(data.scenarios);
    }
  }

  // get get current scenario data
  async function getCurrentScenarioData(name: string) {
    const url = `https://tamarix-technical-interview.herokuapp.com/users/me/portfolios/${currentPortfolio}/scenarios/${name}`;
    const { data } = await axios.get(url);
    if (data) {
      setCurrentScenarioData(data);
    }
  }

  // view change handling function
  function handleViewChange(view: string) {
    if (view) {
      setCurrentView(view);
    }
  }

  if (portfolios) {
    return (
      <div>
        <Head>
          <title>Tamarix Code Challenge</title>
          <meta
            name="description"
            content="This is a Code Challenge of a react + Next.Js + typescript web app"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <FullLayout
          setCurrentPortfolio={setCurrentPortfolio}
          portfolios={portfolios}
          handleViewChange={handleViewChange}
          currentView={currentView}
        >
          {currentView === "home" && <HomePage />}
          {currentView === "portfolios" && currentPortfolioData && (
            <Portfolio data={currentPortfolioData} />
          )}
          {currentView === "scenarios" && scenarios && (
            <Scenario
              currentScenario={currentScenario}
              setCurrentScenario={setCurrentScenario}
              currentScenarioData={currentScenarioData}
              scenarios={scenarios}
            />
          )}
          {currentView === "projections" && <Projection />}
        </FullLayout>
      </div>
    );
  } else {
    return null;
  }
};

export default Home;
