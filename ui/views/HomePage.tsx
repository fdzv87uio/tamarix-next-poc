import { Box, Grow } from "@mui/material";
import React from "react";

function HomePage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "150px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grow in={true} timeout={500}>
          <h1>Welcome</h1>
        </Grow>
        <Grow in={true} timeout={1000}>
          <h5>
            {" "}
            The following is a Code Challenge / Proof of Concept for the Tamarix
            web App
          </h5>
        </Grow>
        <Grow in={true} timeout={1000}>
          <small>2022 Tamarix Technologies Ltd. All Right Reserved</small>
        </Grow>
      </Box>
    </Box>
  );
}

export default HomePage;
