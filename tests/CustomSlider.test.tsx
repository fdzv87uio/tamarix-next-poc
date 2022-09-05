import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { roundUpNumber } from "../ui/components/CustomSlider";

describe("Test Custom Slider", () => {
  test("should display a blank login form, with remember me checked by default", async () => {
    const result = roundUpNumber(4.1111111111);
    expect(result).toBe(4.1);
  });
});
