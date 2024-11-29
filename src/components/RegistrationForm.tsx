import { Link } from "react-router-dom";
import { Box, Button, Container, Grid2, ListItem, Paper, TextField } from "@mui/material";
import { registerUser } from "../store/slices/authSlice";
import { UserRegistration } from "../types/authTypes";
import { useAppDispatch } from "../hooks/use-auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  async function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = Object.fromEntries(formData.entries());
    setLoading(true);

    const userData: UserRegistration = {
      login: data.login.trim(),
      username: data.username.trim(),
      password: data.password.trim(),
      email: data.email.trim(),
      phoneNumber: data.phoneNumber.trim()
    }
    if (
      !data.password
      || !data.repeat_password
    ) {
      alert("Заполните все обязательные поля");
      return;
    }

    if (!data.login || data.login.length < 2 || data.login.length > 60 || !/^[a-zA-Z]+$/.test(data.login)) {
      alert("Логин должен быть от 2 до 60 символов и состоять только из латинских букв");
      return;
    }
    if (!data.username || data.username.length < 1 || data.username.length > 60) {
      alert("Имя пользователя должно содержать от 1 до 60 символов");
      return;
    }
    if (!data.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      alert("Некоректный email");
      return;
    }

    if (data.password.length < 8) {
      alert("Пароль должен содержать не менее 8 символов");
      return;
    }
    if (data.password !== data.repeat_password) {
      alert("Пароли не совпадают");
      return;
    }
    try {
      await dispatch(registerUser(userData)).unwrap();
      setLoading(false);
      alert("перейти на страницу авторизации для входа в систему!");
      navigate('/feature-ED-2_todo-list/auth');
    } catch (error) {
      setLoading(false);
      alert('Ошибка регистрации, данные неверны или уже заняты');
    }
  }


  return (
    <>
      <Container maxWidth="xs"  >
        <>
          <h2>Register a new acc</h2>

          {loading && <p style={{ color: "yellow" }}>Загрузка...</p>}

          <Paper elevation={7} sx={{ marginTop: 10, padding: 2 }}>
            <Box component="form" sx={{ mt: 1 }} noValidate onSubmit={handleSubmitForm}>
              <TextField
                name="username"
                placeholder="Your name"
                id="user-name"
                type="name"
                fullWidth
                required
                autoComplete="given-name"
                sx={{ mb: 2 }}
                autoFocus
              />
              <TextField
                name="login"
                placeholder="Login"
                id="user-login"
                type="login"
                fullWidth
                required
                autoComplete="nickname"
                sx={{ mb: 2 }}
              />
              <TextField
                name="password"
                placeholder="Password"
                id="user-password"
                type="password"
                fullWidth
                required
                autoComplete="off"
                sx={{ mb: 2 }}
              />
              <TextField
                name="repeat_password"
                placeholder="Repeat Password"
                id="user-password-repeat"
                type="password"
                fullWidth
                required
                autoComplete="off"
                sx={{ mb: 2 }}
              />
              <TextField
                name="email"
                placeholder="Email"
                id="user-email"
                type="email"
                fullWidth
                required
                autoComplete="email"
                sx={{ mb: 2 }}
              />
              <TextField
                name="phoneNumber"
                placeholder="Phone Number"
                id="user-phone"
                type="phone"
                fullWidth
                autoComplete="phone"
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2 }} >
                register
              </Button>
            </Box>
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <ListItem><Link to="/feature-ED-2_todo-list/forgot">Forgot Password?</Link></ListItem>
              </Grid2>
              <Grid2 size={6}>
                <ListItem><Link to="/feature-ED-2_todo-list/auth">Already Registred?</Link></ListItem>
              </Grid2>
            </Grid2>

          </Paper>
        </>
      </Container >
    </>
  )
}