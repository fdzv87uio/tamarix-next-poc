import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function CustomMenu({
  options,
  currentOption,
  setCurrentOption,
}: {
  options: any;
  currentOption: any;
  setCurrentOption: any;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value: string) => {
    setCurrentOption(value);
    setAnchorEl(null);
  };

  return (
    <div>
      <CustomButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {currentOption}
      </CustomButton>
      <MenuContainer
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((item: any, key: any) => {
          return (
            <MenuItem
              key={`ìtem_${key}`}
              onClick={() => {
                handleClose(item);
              }}
            >
              {item}
            </MenuItem>
          );
        })}
      </MenuContainer>
    </div>
  );
}

const CustomButton = styled(Button)(() => ({
  width: "100%",
  backgroundColor: "#fff",
}));

const MenuContainer = styled(Menu)(() => ({
  width: "500px",
}));
