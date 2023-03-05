import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/store";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [errors, setError] = useState({});
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();
  const validationSchema = yup.object().shape({
    password: yup.string().required("Password is required").min(8),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email adress"),
  });

  const validate = async () => {
    try {
      await validationSchema.validate(data);
      setError({});
    } catch (error) {
      setError({ [error.path]: error.message });
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(data).then((data) => {
      if (data.code && data.code !== 200) {
        if (data.message === "EMAIL_NOT_FOUND") {
          setError({ email: "Email not found" });
        }
        if (data.message === "INVALID_PASSWORD") {
          setError({ password: "Invalid password" });
        }
      } else if (data.localId) {
        setError({});
        navigate("/");
      }
    });
  };
  return (
    <>
      {" "}
      <Box
        sx={{
          // marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
        <Typography component="h1" variant="h5" color="#000">
          Sign in
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
      >
        <TextField
          name="email"
          // autoComplete="off"1
          id="outlined-email"
          error={!!errors.email}
          required
          label="Email"
          variant="outlined"
          value={data.email}
          helperText={errors.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          autoComplete="off"
          id="outlined-password"
          error={!!errors?.password}
          required
          label="Password"
          variant="outlined"
          value={data.password}
          helperText={errors?.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment sx={{ bgcolor: "inherit" }} position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />

        <Button disabled={!isValid} type="submit" variant="contained">
          Sign in
        </Button>
      </Box>
      <Typography variant="a">
        Do you not have account? <Link to="/register">Sign up</Link>
      </Typography>
    </>
  );
};
