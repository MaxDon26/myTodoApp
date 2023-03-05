import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/store";

export const RegisterForm = () => {
  const [errors, setError] = useState({});
  const [data, setData] = useState({ emeil: "", password: "" });
  const { register } = useAuth();

  const navigate = useNavigate();

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

  const isValid = Object.keys(errors).length === 0;

  const handleChange = ({ target }) => {
    console.log(target.name);
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    register(data).then(() => navigate("/"));
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
          Sign up
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
      >
        <TextField
          name="email"
          id="outlined-email"
          error={!!errors?.email}
          required
          label="Email"
          variant="outlined"
          value={data.login}
          helperText={errors?.email}
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
          type="password"
          helperText={errors?.password}
          onChange={handleChange}
        />

        <Button type="submit" disabled={!isValid} variant="contained">
          Sign up
        </Button>
      </Box>
      <Typography variant="a">
        Do you have account? <Link to="/login">Sign in</Link>{" "}
      </Typography>
    </>
  );
};
