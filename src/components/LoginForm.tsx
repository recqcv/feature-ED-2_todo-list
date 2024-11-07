import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid2, ListItem, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../hooks/use-auth";
import { signin } from "../store/slices/authSlice";
import { AuthData } from "../types/authTypes"


export default function AuthForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = Object.fromEntries(formData.entries());
    setLoading(true);
    const userData: AuthData = {
      login: data.login.trim(),
      password: data.password.trim()
    }
    if (!userData.login || !userData.password) {
      alert("Заполните все обязательные поля");
      return;
    }
    try {
      await dispatch(signin(userData)).unwrap();
      setLoading(false);
      alert("Успешная авторизация");
      navigate('/feature-ED-2_todo-list/todo');
    } catch (error) {
      setLoading(false);
      alert("Неуспешная авторизация, проверьте введенные данные")
    }
  }

  return (
    <>
      <Container maxWidth="xs"  >
        <h2>Login to your Account</h2>
        {loading && <p style={{ color: "yellow" }}>Идёт авторизация...</p>}
        <Paper elevation={7} sx={{ marginTop: 10, padding: 2 }}>
          <Box component="form" sx={{ mt: 1 }} noValidate onSubmit={handleLogin}>
            <TextField
              name="login"
              placeholder="Login"
              id="login"
              fullWidth
              required
              autoComplete="login"
              autoFocus
              sx={{ mb: 2 }}
            />
            <TextField
              name="password"
              placeholder="Password"
              id="password-input"
              type="password"
              fullWidth
              required
              autoComplete="current-password"
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" name="remember" />}
              label="Remember Me"
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2 }} >
              Login
            </Button>
          </Box>
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <ListItem><Link to="/feature-ED-2_todo-list/forgot">Forgot Password?</Link></ListItem>
            </Grid2>
            <Grid2 size={6}>
              <ListItem><Link to="/feature-ED-2_todo-list/registration">Not Registred Yet?</Link></ListItem>
            </Grid2>
          </Grid2>


        </Paper>
      </Container>
    </>
  );
}