import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  Avatar,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSignInEmailPassword } from "@nhost/react";
import GoogleIcon from "@mui/icons-material/Google";
const theme = createTheme();

export default function Login({ nhost }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword();

  const handleGoogleSignIn = () => {
    nhost.auth.signIn({
      provider: "google",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInEmailPassword(email, password);
  };

  if (isSuccess) {
    return <Navigate to="/" replace={true} />;
  }

  const disableForm = isLoading || needsEmailVerification;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <div className="google">
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleGoogleSignIn}
              disabled={disableForm}
              sx={{
                mt: 3,
                mb: 1,
                height: "50px",
              }}
            >
              <GoogleIcon
                sx={{
                  mr: 3,
                }}
              />{" "}
              Sign in With Google
            </Button>
          </div>
          <span className="or">or</span>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              disabled={disableForm}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              disabled={disableForm}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isError ? (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  marginTop: "10px",
                  fontSize: "14px",
                }}
              >
                {error?.message}
              </p>
            ) : null}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={disableForm}
              sx={{ mt: 3, mb: 2, height: "50px" }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <p className="txt">
                  Don't have an account?
                  <Link to="/register">Sign Up</Link>
                </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
