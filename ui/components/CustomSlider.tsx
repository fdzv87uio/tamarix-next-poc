import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 100,
    label: "100%",
  },
];

// We use this method for aour testing example
export function roundUpNumber(value: number) {
  const fixed = value.toFixed(1);
  return parseFloat(fixed);
}

export default function CustomSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Always visible"
        defaultValue={50}
        step={10}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
}
