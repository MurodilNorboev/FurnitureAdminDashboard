import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

import AppTheme from "./theme/AppTheme";
import ColorModeSelect from "./theme/ColorModeSelect";
import { SitemarkIcon } from "./comp/CustomIcons";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseAPI } from "../../utils/constants";
import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from "react-hot-toast";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

interface LoginData {
  email: string;
  password: string;
}

interface Type {
  success: boolean;
  access_token: string;
}

const Login: React.FC = (props: { disableCustomTheme?: boolean }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post<Type>(
        baseAPI + "/user/login",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.access_token) {
        toast.success("Successfully logged in!");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
        localStorage.setItem("token", response.data.access_token);
      } else {
        setError("Token was not returned. Please try again.");
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error?.msg || "Noma’lum xato yuz berdi";
      setError("Incorrect login or password.");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Toaster position="top-right" reverseOrder={false} />
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">
                Email: dashboardadm11n@gmail.com
              </FormLabel>
              <TextField
                error={error !== null}
                helperText={error}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                id="email"
                autoComplete="email"
                autoFocus
                fullWidth
                variant="outlined"
                color={error ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password: Admin123!</FormLabel>
              <TextField
                error={error !== null}
                helperText={error}
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                id="password"
                autoComplete="current-password"
                autoFocus
                fullWidth
                variant="outlined"
                color={error ? "error" : "primary"}
              />
            </FormControl>

            <Divider>or</Divider>
            <Button
              onSubmit={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
            >
              {loading ? "Sending..." : "Sign in"}
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
};

export default Login;
