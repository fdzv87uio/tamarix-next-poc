import { Box, Grid, Card, CardContent } from "@mui/material";
import React from "react";
import CustomAccordion from "../components/CustomAccordion";
import StackedBarChart from "../components/StackedBarChart";

function Projection() {
  return (
    <Box sx={{ padding: "40px 40px" }}>
      <h1>Projections</h1>
      <CustomAccordion />
      <Grid container spacing={5}>
        <Grid item md={6}>
          <Card>
            <CardContent>
              <StackedBarChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card>
            <CardContent>
              <StackedBarChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Projection;
