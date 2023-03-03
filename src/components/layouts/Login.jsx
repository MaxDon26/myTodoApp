import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import { Route, Routes, useParams } from "react-router-dom";
import { LoginForm } from "../ui/LoginForm";
import { RegisterForm } from "../ui/RegisterForm";

export const Login = () => {
  const { type } = useParams();

  console.log(type);
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4 }}>
        {type === "register" ? <RegisterForm /> : <LoginForm />}
      </Paper>
    </Container>
  );
};
