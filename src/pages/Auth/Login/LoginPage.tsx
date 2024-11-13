import { Link, useNavigate } from "react-router-dom";
import { Container, Grid2, ListItem, Paper } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/use-auth";
import { signin } from "@/store/slices/authSlice";
import { AuthData } from "@/types/authTypes";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginFormOnly from "@/components/LoginFormOnly";

interface FormValues {
  login: string;
  password: string;
}

const schema = yup.object().shape({
  login: yup.string()
    .required("Обязательное поле")
    .min(2, "Мин. длина - 2 символа")
    .max(60, "Макс. длина - 60 символов")
    .matches(/^[a-zA-Z]+$/, "Только латинские буквы"),
  password: yup.string()
    .required("Обязательное поле")
    .min(8, "Мин. длина пароля - 8 символов"),
});

export default function LoginPage(): JSX.Element {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (data: FormValues) => {
    setLoading(true);

    const userData: AuthData = {
      login: data.login.trim(),
      password: data.password.trim(),
    };

    try {
      await dispatch(signin(userData)).unwrap();
      setLoading(false);
      navigate('/feature-ED-2_todo-list/todo');
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <h2>Login to your Account</h2>
      {loading && <p style={{ color: "yellow" }}>Идёт авторизация...</p>}
      <Paper elevation={7} sx={{ marginTop: 10, padding: 2 }}>
        <LoginFormOnly control={control} handleSubmit={handleSubmit} handleLogin={handleLogin} />
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <ListItem><Link to="/feature-ED-2_todo-list/auth/forgot">Forgot Password?</Link></ListItem>
          </Grid2>
          <Grid2 size={6}>
            <ListItem><Link to="/feature-ED-2_todo-list/auth/registration">Not Registred Yet?</Link></ListItem>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
}
