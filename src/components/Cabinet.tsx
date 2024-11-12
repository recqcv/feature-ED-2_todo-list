import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/use-auth";
import {  getUserData } from '@/store/slices/authSlice';
import classes from "./Cabinet.module.css";

export default function Cabinet() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Личный кабинет</h2>
      {user ? (
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
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
}
