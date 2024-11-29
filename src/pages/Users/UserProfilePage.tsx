import { useAppDispatch, useAppSelector } from "@/hooks/use-auth"
import { blockUserById, getUserProfile, unlockUserById, updateUserData, updateUserRights } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./UserProfilePage.module.css"


export default function UserProfilePage() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.users.user);
  const error = useAppSelector((state) => state.users.error);
  const loading = useAppSelector((state) => state.users.loading);
  const userId = +window.location.pathname.split("/")[3];
  const [isEditing, setIsEditing] = useState(false);
  const [newUserData, setNewUserData] = useState({ ...user });


  useEffect(() => {
    dispatch(getUserProfile(userId)).unwrap();
    setNewUserData({ ...user });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  function handleEditUserdataButtonPress() {
    setNewUserData({ ...user });
    setIsEditing(true);
  }
  function handleSaveButtonPress() {
    setIsEditing(false);
    dispatch(updateUserData({ id: userId, userData: newUserData })).unwrap();
  }
  function handleCancelButtonPress() {
    setIsEditing(false);
    setNewUserData({ ...user });
  }
  function selectedInputForUpdateUserData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  }

  function handleBanUser() {
    dispatch(blockUserById(userId)).unwrap();
  }

  function handleUnbanUser() {
    dispatch(unlockUserById(userId)).unwrap();
  }

  function handleSetAdminRights() {
    dispatch(updateUserRights({
      id: userId,
      userData:
      {
        field: "isAdmin",
        value: true
      }
    })).unwrap();
  }
  function handleDeleteAdminRights() {
    dispatch(updateUserRights({
      id: userId,
      userData:
      {
        field: "isAdmin",
        value: false
      }
    })).unwrap();
  }

  return (
    <>
      {user && (
        <div>
          <h1 style={{ marginBottom: "30px" }}>Карточка юзера</h1>
          <div className={classes.userProfileGrid}>
            <div className={classes.gridRow}>
              {isEditing ? (
                <>
                  <p>Username</p>
                  <input
                    name="username"
                    type="text"
                    value={newUserData.username || ""}
                    placeholder={user.username}
                    onChange={selectedInputForUpdateUserData}
                  />
                  <p></p>
                </>
              ) : (
                (
                  <>
                    <p>Username</p>
                    <p>{user.username}</p>
                    <p></p>
                  </>
                )
              )
              }
            </div>
            <div className={classes.gridRow}>
              {isEditing ? (
                <>
                  <p>Email</p>
                  <input
                    name="email"
                    type="text"
                    value={newUserData.email || ""}
                    placeholder={user.email}
                    onChange={selectedInputForUpdateUserData}
                  />
                  <p></p>
                </>
              ) : (
                (
                  <>
                    <p>Email</p>
                    <p>{user.email}</p>
                    <p></p>
                  </>
                )
              )}
            </div>
            <div className={classes.gridRow}>
              {isEditing ? (
                <>
                  <p>Phone</p>
                  <input
                    name="phoneNumber"
                    type="text"
                    value={newUserData.phoneNumber || ""}
                    placeholder={user.phoneNumber}
                    onChange={selectedInputForUpdateUserData}
                  />
                  <p></p>
                </>
              ) : (
                (
                  <>
                    <p>Phone</p>
                    <p>{user.phoneNumber}</p>
                    <p></p>
                  </>
                )
              )
              }
            </div>
            <div className={classes.gridRow}>
              <p>Reg Date</p>
              <p>{user.date}</p>
              <div></div>
            </div>
            <div className={classes.gridRow}>
              <p>Is Banned?</p>
              <p>{user.isBlocked ? "Yes" : "No"}</p>
              {user.isBlocked
                ? <button onClick={handleUnbanUser}>Unban</button>
                : <button onClick={handleBanUser}>Ban</button>
              }
            </div>
            <div className={classes.gridRow}>
              <p>Is Admin?</p>
              <p>{user.isAdmin ? "Yes" : "No"}</p>
              {user.isAdmin
                ? <button onClick={handleDeleteAdminRights}>Delete Admin</button>
                : <button onClick={handleSetAdminRights}>Set Admin</button>
              }
            </div>
          </div>
        </div>
      )}
      <Link to="/feature-ED-2_todo-list/users" className={classes.backButton}>
        Назад
      </Link>
      {isEditing
        ? <button onClick={handleCancelButtonPress}>Cancel</button>
        : <button onClick={handleEditUserdataButtonPress}>Edit</button>
      }
      <button onClick={handleSaveButtonPress}>Save</button>

    </>
  );
}