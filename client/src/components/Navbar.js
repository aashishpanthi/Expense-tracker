import { Button } from "@mui/material";
import { useCallback } from "react";
import { useSignOut } from "@nhost/react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationStatus } from "@nhost/react";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import Logo from "./logo192.png";
import "./styles/navbar.css";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


const Navbar = ({ nhost }) => {
  const { isAuthenticated } = useAuthenticationStatus();

  const navigate = useNavigate();
  const { signOut } = useSignOut();

  const logout = useCallback(() => {
    signOut();
    navigate("/");
  }, [navigate]);

  const handleGoogleSignIn = () => {
    nhost.auth.signIn({
      provider: "google",
    });
  };
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
          <img src={Logo} height="50px" width="50px"></img>
        </Link>
      </div>
      <div className="login_section">
        {isAuthenticated ? (
          <section>
            <div>
              <div
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="logout"
              >
                AP
              </div>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ mt: 1 }}
              >
                <MenuItem><Link to="/app" className="dash">Dashboard</Link></MenuItem>
                <MenuItem onClick={logout}><div className="dash">Logout</div></MenuItem>
              </Menu>
            </div>
          </section>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon
              sx={{
                mr: 1,
              }}
            />{" "}
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
