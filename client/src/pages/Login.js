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
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import GoogleIcon from "@mui/icons-material/Google";

const theme = createTheme();

export default function Login({ nhost }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = () => {
    nhost.auth.signIn({
      provider: "google",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    nhost.auth.login({ email, password });
  };

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
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
