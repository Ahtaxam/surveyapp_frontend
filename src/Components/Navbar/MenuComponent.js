import React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import { styled } from "@mui/material";
import { toast } from "react-toastify";

import PATH from "../../Constants/Path";

function MenuComponent() {
  const { name, email } = JSON.parse(localStorage.getItem("loggedUser"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem("token");
    toast.success("Successfully Logout !");
    navigate(PATH.HOME);
  };

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
        <MenuItem disabled>{name && name}</MenuItem>
        <MenuItem disabled>{email && email}</MenuItem>
        <MenuItem>
          <Link
            to={PATH.DASHBOARD}
            style={{ textDecoration: "none", color: "black" }}
          >
            Dashboard
          </Link>
        </MenuItem>

        <Divider />

        <MenuItem onClick={logoutUser}>
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
