import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/use-auth";
import { getUserData, logout } from '@/store/slices/authSlice';
import classes from "./Cabinet.module.css";
import { useNavigate } from "react-router-dom";

export default function Cabinet() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  async function handleLogout() {
    await dispatch(logout());
    navigate('/feature-ED-2_todo-list/auth');
  }


  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Личный кабинет</h2>
      {user ? (
        <>
          <div className={classes.userInfo}>
            <div className={classes.userRow}>
              <p className={classes.userDataKeys}>Имя:</p>
              <p className={classes.userDataInfo}>{user.username}</p>
              <button className={classes.editButton}>Изменить</button>
            </div>
            <div className={classes.userRow}>
              <p className={classes.userDataKeys}>Email:</p>
              <p className={classes.userDataInfo}>{user.email}</p>
              <button className={classes.editButton}>Изменить</button>
            </div>
            <div className={classes.userRow}>
              <p className={classes.userDataKeys}>Телефон:</p>
              <p className={classes.userDataInfo}>{user.phoneNumber}</p>
              <button className={classes.editButton}>Изменить</button>
            </div>
          </div>
          <button onClick={handleLogout} style={{ margin: 45 }}>LOGOUT</button>
        </>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
}
