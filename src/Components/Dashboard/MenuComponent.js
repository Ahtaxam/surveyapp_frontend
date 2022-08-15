import React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Tooltip from "@mui/material/Tooltip";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import { styled } from "@mui/material";

function MenuComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="menuDiv">
      <Tooltip title="Profile">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar>
            <Person fontSize="small" />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          style: {
            width: "300px",
          },
        }}
      >
        <MenuItem>Ahtasham Ali</MenuItem>
        <MenuItem>ahtashamali2727@gmail.com</MenuItem>
        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default MenuComponent;

const MenuItem = styled(MuiMenuItem)`
  justify-content: center;
`;
