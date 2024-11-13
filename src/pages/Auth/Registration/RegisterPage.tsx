import { Link } from "react-router-dom";
import { Container, Grid2, ListItem, Paper } from "@mui/material";
import { registerUser } from "@/store/slices/authSlice";
import { UserRegistration } from "@/types/authTypes";
import { useAppDispatch } from "@/hooks/use-auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegForm from "@/components/RegForm";

export default function RegisterPage(): JSX.Element {
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
            <RegForm handleSubmitForm={handleSubmitForm} />
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

