import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Grid,
  Grow,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CardTitle } from "reactstrap";
import CustomMenu from "../components/CustomMenu";
import CustomSlider from "../components/CustomSlider";

function Scenario({
  currentScenario,
  currentScenarioData,
  scenarios,
  setCurrentScenario,
}: {
  currentScenario: any;
  currentScenarioData: any;
  scenarios: any;
  setCurrentScenario: any;
}) {
  const overrides = currentScenarioData.scenario_data.overrides;
  const overridesKeyArray = Object.keys(overrides);
  const initialCallSpeed =
    currentScenarioData.scenario_data.rates["call speed"];
  console.log(initialCallSpeed);
  const initialDistSpeed =
    currentScenarioData.scenario_data.rates["distribution speed"];
  console.log(initialDistSpeed);
  const [callSpeed, setCallSpeed] = useState<any>();
  const [distSpeed, setDistSpeed] = useState<any>();

  function handleCallSpeedChange(value: any) {
    setCallSpeed(value);
  }

  function handleDistSpeedChange(value: any) {
    setDistSpeed(value);
  }
  return (
    <Box sx={{ padding: "40px 40px" }}>
      <Grow in={true} timeout={500}>
        <PageHeader>SCENARIOS</PageHeader>
      </Grow>
      <Grid container spacing={5}>
        <Grow in={true} timeout={500}>
          <Grid item md={3}>
            <Card>
              <CardContent>
                <CustomMenu
                  setCurrentOption={setCurrentScenario}
                  currentOption={currentScenario}
                  options={scenarios}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grow>
      </Grid>
      <Grow in={true} timeout={1000}>
        <SectionHeader>Speed Parameters</SectionHeader>
      </Grow>
      <Grid container spacing={5}>
        <Grow in={true} timeout={1200}>
          <Grid item md={6}>
            <Card>
              <CardContent>
                <Box>
                  <h5 className="mb-0 font-weight-bold">Call Speed</h5>
                  <FormControl>
                    <small className="text-muted">Select speed:</small>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                    >
                      {currentScenarioData.scenario_settings.options[
                        "call speed"
                      ].map((item: any, key: number) => {
                        return (
                          <FormControlLabel
                            key={`item_${key}`}
                            value={item}
                            control={<Radio />}
                            label={<small>{item}</small>}
                            checked={
                              callSpeed
                                ? callSpeed === item
                                : initialCallSpeed === item
                            }
                            onClick={() => {
                              handleCallSpeedChange(item);
                            }}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grow>
        <Grow in={true} timeout={1200}>
          <Grid item md={6}>
            <Card>
              <CardContent>
                <Box>
                  <h5 className="mb-0 font-weight-bold">Distribution Speed</h5>
                  <FormControl>
                    <small className="text-muted">Select speed:</small>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                    >
                      {currentScenarioData.scenario_settings.options[
                        "distribution speed"
                      ].map((item: any, key: number) => {
                        return (
                          <FormControlLabel
                            key={`item_${key}`}
                            value={item}
                            control={<Radio />}
                            label={<small>{item}</small>}
                            checked={
                              distSpeed
                                ? distSpeed === item
                                : initialDistSpeed === item
                            }
                            onClick={() => {
                              handleDistSpeedChange(item);
                            }}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grow>
      </Grid>
      <SectionHeader>CMAS</SectionHeader>
      <Grid container spacing={5}>
        <Grid item md={6}>
          <Card>
            <CardContent>
              {currentScenarioData.scenario_settings.taxonomy.map(
                (item: any, key: number) => {
                  return (
                    <>
                      <h5>{item}</h5>
                      <div
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          paddingLeft: "50px",
                        }}
                      >
                        <CustomSlider />
                      </div>
                    </>
                  );
                }
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <SectionHeader>Overrides</SectionHeader>
      <Grid container spacing={5}>
        <Grid item md={6}>
          <Card>
            <CardContent>
              {overridesKeyArray.map((item: any, key: number) => {
                return (
                  <div key={`item_${key}`}>
                    <h5>{item}</h5>
                    <div
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        paddingLeft: "50px",
                      }}
                    >
                      <CustomSlider />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Scenario;

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
  paddingTop: "0px",
  paddingBottom: "15px",
}));
