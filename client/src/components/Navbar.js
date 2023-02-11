import { useCallback } from "react";
import { useSignOut } from "@nhost/react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationStatus, useUserEmail } from "@nhost/react";
import { Link } from "react-router-dom";
import "./styles/style.css";
import * as React from "react";
import { Menu, MenuItem, Button, Box } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const { isAuthenticated } = useAuthenticationStatus();
  const userEmail = useUserEmail();

  const navigate = useNavigate();
  const { signOut } = useSignOut();

  const logout = useCallback(() => {
    signOut();
    navigate("/");
  }, [navigate]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <img src="/logo192.png" height="50px" width="50px" />
        </Link>
      </div>
      <div className="login_section">
        {isAuthenticated ? (
          <section>
            <div>
              <img
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                src={`https://ui-avatars.com/api/?size=128&background=random&rounded=true&name=${userEmail}`}
                alt="avatar"
                className="avatar"
              />
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ mt: 1 }}
              >
                <Box
                  sx={{
                    mx: 2,
                    my: 1,
                    fontSize: ".75rem",
                  }}
                >
                  {
                    // show the user's email address
                    userEmail
                  }
                </Box>
                <MenuItem onClick={logout}>
                  <div className="dash">
                    <span>Logout</span>
                    <LogoutIcon />
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </section>
        ) : (
          <Link
            to={"/login"}
            style={{
              textDecoration: "none",
            }}
          >
            <Button variant="outlined" color="primary">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
