import { useCallback } from "react";
import { useSignOut } from "@nhost/react";
import { useAuthenticationStatus } from "@nhost/react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

import Button from "@mui/material/Button";

function Navbar({ nhost }) {
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

  return (
    <div>
      {isAuthenticated ? (
        <Button variant="outlined" color="warning" onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button variant="outlined" color="primary" onClick={handleGoogleSignIn}>
          <GoogleIcon
            sx={{
              mr: 1,
            }}
          />{" "}
          Login
        </Button>
      )}
    </div>
  );
}

export default Navbar;
