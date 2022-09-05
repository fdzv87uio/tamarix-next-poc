import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Grow,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import PieChart2 from "../components/PieChart2";
import TopCard from "../components/TopCard";

const exposures = ["Commitment ", "Total called", "NAV"];

function Portfolio({ data }: { data: any }) {
  const portName = data.port_name;
  const taxonomy = data.port_settings.taxonomy;
  const funds = data.port_data["Fund name"];
  const fundLenght = Object.keys(funds).length;
  const strategyCount = data.port_settings.taxonomy.length;
  const formattedName = portName.replace("_", " ").toUpperCase();
  const [currentExposure, setCurrentExposure] = useState(exposures[0]);
  const [totalCommitted, setTotalCommitted] = useState<any>();
  const [totalNAV, setTotalNAV] = useState<any>();
  const [sumsByStartegy, setSumsByStartegy] = useState<any>();
  const [tvpiArray, setTvpiArray] = useState<any>();
  const [tvpiCountArray, setTvpiCountArray] = useState<any>();

  useEffect(() => {
    if (!totalCommitted) {
      const sumCommitment = sumIterable(data.port_data["Commitment "]);
      setTotalCommitted(sumCommitment);
    }
    if (!totalNAV) {
      const sumNav = sumIterable(data.port_data["NAV"]);
      setTotalNAV(sumNav);
    }
    getExposureData();
    getTvpiData();
  }, [currentExposure, totalCommitted, totalNAV]);

  // this method controls exposure metric change
  function handleMetricChange(e: any) {
    if (e.target.value) {
      setCurrentExposure(e.target.value);
    }
  }

  // this function sums iterable object by Strategy
  function sumIterableByStrategy(iterable: any, strategy: string) {
    if (iterable && strategy) {
      const strategySet = new Set();
      let iterableSum = 0;
      const strategyIterable = data.port_data["Strategy"];
      const strategyKeyArray = Object.keys(strategyIterable);
      const iterableKeyArray = Object.keys(iterable);
      strategyKeyArray.forEach((item: any) => {
        if (strategyIterable[item]) {
          const currentValue = strategyIterable[item];
          if (currentValue === strategy) {
            strategySet.add(item);
          }
        }
      });
      iterableKeyArray.forEach((item: any) => {
        if (iterable[item]) {
          if (strategySet.has(item)) {
            iterableSum = iterableSum + iterable[item];
          }
        }
      });
      return iterableSum;
    }
  }

  // this function sums all items in an iterable object
  function sumIterable(iterable: any) {
    if (iterable) {
      let iterableSum = 0;
      const iterableKeyArray = Object.keys(iterable);
      iterableKeyArray.forEach((item: any) => {
        if (iterable[item]) {
          iterableSum = iterableSum + iterable[item];
        }
      });
      return iterableSum;
    }
  }

  // get All sums by strategy
  function getExposureData() {
    let results: any = [];
    if (currentExposure) {
      // set Total Commited
      const iterable = data.port_data[currentExposure];
      // set Sum by Strategy Array
      taxonomy.forEach((item: string) => {
        const SIBS = sumIterableByStrategy(iterable, item);
        const newObject = { strategy: item, sum: SIBS };
        results.push(newObject);
      });
      setSumsByStartegy(results);
    }
  }

  // get all tvpi related data for distribution graph
  function getTvpiData() {
    const tvpi: any = {};
    let tvpiArray: any = [];
    let countArray: any = [];
    const distributed = data.port_data["Total distributed "];
    const nav = data.port_data["NAV"];
    const called = data.port_data["Total called"];
    for (let i = 0; i < fundLenght; i++) {
      const currentNav = nav[i];
      const currentCalled = called[i];
      const currentDistributed = distributed[i];
      const currentTvpi = (currentDistributed + currentNav) / currentCalled;
      const fixed = currentTvpi.toFixed(1);
      tvpi[i] = parseFloat(fixed);
    }
    const tvpiKeys = Object.keys(tvpi);
    tvpiKeys.forEach((item: any) => {
      tvpiArray.push(tvpi[item]);
    });
    const tvpiSet = new Set(tvpiArray);
    tvpiSet.forEach((item: any) => {
      let currentCount = 0;
      let currentItem = item;
      tvpiArray.forEach((value: any) => {
        if (value === currentItem) {
          currentCount = currentCount + 1;
        }
      });
      countArray.push(currentCount);
    });
    setTvpiArray(Array.from(tvpiSet));
    setTvpiCountArray(countArray);
  }

  return (
    <>
      {data && sumsByStartegy && (
        <Box sx={{ padding: "40px 40px" }}>
          <Grow in={true} timeout={500}>
            <Box>
              <PageHeader>{formattedName}</PageHeader>
              <small>
                {fundLenght} Funds with {strategyCount} Strategies Available
              </small>
            </Box>
          </Grow>
          <Grid sx={{ marginTop: "0px", padding: "0 0" }} container spacing={2}>
            <Grid item md={3}>
              <TopCard
                bg="bg-light-success text-success"
                title="Total Committed"
                subtitle="Total Committed"
                color={"#dc3545"}
                earning={`$${totalCommitted / 1000000} M`}
                acronym={"TC"}
              />
            </Grid>
            <Grid item md={3}>
              <TopCard
                bg="bg-light-success text-success"
                title="NAV"
                subtitle="NAV"
                earning={`$${totalNAV / 1000000} M`}
                color={"#198754"}
                acronym={"NAV"}
              />
            </Grid>
            <Grid item md={3}>
              <TopCard
                bg="bg-light-success text-success"
                title="Total Unfunded"
                subtitle="Total Unfunded"
                earning="$20 M"
                color={"#fd7e14"}
                acronym={"TU"}
              />
            </Grid>
            <Grid item md={3}>
              <TopCard
                bg="bg-light-success text-success"
                title="TVPI"
                subtitle="TVPI"
                earning="1.06x"
                color={"#6f42c1"}
                acronym={"Tvpi"}
              />
            </Grid>
          </Grid>
          <Grow in={true} timeout={1500}>
            <SectionHeader>Exposures</SectionHeader>
          </Grow>
          <Grow in={true} timeout={1000}>
            <Grid
              sx={{ marginTop: "5px", padding: "0 0" }}
              container
              spacing={2}
            >
              <Grid item md={7}>
                {/* <PieChart /> */}
                <Card>
                  <CardContent>
                    <PieChart2 sumsByStrategy={sumsByStartegy} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={5}>
                <Card>
                  <CardContent>
                    <Box>
                      <h5 className="mb-0 font-weight-bold">Exposures</h5>
                      <FormControl>
                        <small className="text-muted">Select Metric:</small>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={currentExposure}
                          onChange={handleMetricChange}
                        >
                          {exposures.map((item: any, key: number) => {
                            return (
                              <FormControlLabel
                                key={`item_${key}`}
                                value={item}
                                control={<Radio />}
                                label={<small>{item}</small>}
                              />
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grow>
          <SectionHeader>Distribution of Fund Performance</SectionHeader>
          <Grid container>
            <Grid item md={12}>
              <Card>
                <CardContent>
                  <BarChart
                    tvpiArray={tvpiArray}
                    tvpiCountArray={tvpiCountArray}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Portfolio;

const SectionHeader = styled("h4")(() => ({
  color: "#2478cb",
  paddingTop: "30px",
  paddingBottom: "15px",
  height: "auto",
  fontWeight: "bolder",
}));

const PageHeader = styled("h1")(() => ({
  color: "#000000",
  fontWeight: "bold",
}));
