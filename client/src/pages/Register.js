import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, Navigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSignUpEmailPassword } from "@nhost/react";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme();

export default function Register({ nhost }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpEmailPassword, isLoading, isSuccess, needsEmailVerification } =
    useSignUpEmailPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpEmailPassword(email, password);
  };

  const handleGoogleSignUp = () => {
    nhost.auth.signIn({
      provider: "google",
    });
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
            Sign up
          </Typography>
          <div className="google">
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleGoogleSignUp}
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
              Sign Up With Google
            </Button>
          </div>
          <span className="or">OR</span>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={disableForm}
              sx={{ mt: 3, mb: 2, height: "50px" }}
            >
              Sign Up
            </Button>

            <Grid container>
              <Grid item>
                <p className="txt">
                  Already have an account?
                  <Link to="/login">Sign In</Link>
                </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
