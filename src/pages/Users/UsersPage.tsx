import { deleteUser, getUsers } from "@/store/slices/userSlice"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { User, UserRequest } from "@/types/usersTypes";
import { useAppDispatch, useAppSelector } from "@/hooks/use-auth";
import classes from "./UserPage.module.css";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users)
  const error = useAppSelector((state) => state.users.error)
  const loading = useAppSelector((state) => state.users.loading)
  const meta = useAppSelector((state) => state.users.meta);

  const [search, setSearch] = useState("");
  const [isBlocked, setIsBlocked] = useState<null | boolean>(null);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;


  useEffect(() => {
    const params: UserRequest = {
      search,
      sortBy,
      sortOrder,
      ...(isBlocked !== null && { isBlocked }),
      limit,
      offset: (currentPage - 1),
    };
    dispatch(getUsers(params))
  }, [dispatch, search, isBlocked, sortBy, sortOrder, currentPage])

  function handleDeleteUser(userId: number) {
    confirm(`хотите удалить пользователя: ${userId}?`)
      &&
      dispatch(deleteUser(userId))
  }

  function handleFilterChange(value: string) {
    setIsBlocked(value === "" ? null : value === "true");
  };

  function handleSortByChange(value: string) {
    setSortBy(value);
  };

  function handleSortOrderChange(value: string) {
    setSortOrder(value);
  };

  function handlePageChange(page: number) {
    setCurrentPage(page);
  };

  function handleSearchUserChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  };


  return (
    <div>
      {loading && <h2>Loading...</h2>}
      {error && <h2>Ошибка: {error}</h2>}
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearchUserChange}
      />
      <div className={classes.filters} style={{ marginTop: '20px' }}>
        <select
          value={isBlocked === null ? "" : isBlocked.toString()}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="">All users</option>
          <option value="true">Забаненые</option>
          <option value="false">Не забаненые</option>
        </select>
        <select value={sortBy} onChange={(e) => handleSortByChange(e.target.value)}>
          <option value="id">ID</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
        </select>
        <select value={sortOrder} onChange={(e) => handleSortOrderChange(e.target.value)}>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
      <table className={classes.table}>
        <thead>
          <tr className={classes.tr}>
            <th className={classes.th}>Id</th>
            <th className={classes.th}>Name</th>
            <th className={classes.th}>Email</th>
            <th className={classes.th}>Reg Date</th>
            <th className={classes.th}>Is Banned?</th>
            <th className={classes.th}>Role</th>
            <th className={classes.th}>Phone</th>
            <th className={classes.th}>Profile</th>
            <th className={classes.th}>Actions</th>
          </tr>
        </thead>
      </table>
      <table className={classes.table}>
        <tbody className={classes.tbody}>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className={classes.tr}>
                <td className={classes.td}>{user.id}</td>
                <td className={classes.td}>{user.username}</td>
                <td className={classes.td}>{user.email}</td>
                <td className={classes.td}>{user.date}</td>
                <td className={classes.td}>{user.isBlocked ? "Yes" : "No"}</td>
                <td className={classes.td}>{user.isAdmin ? "Admin" : "User"}</td>
                <td className={classes.td}>{user.phoneNumber}</td>
                <td className={classes.td}><Link to={`${user.id}`}>профиль</Link></td>
                <td className={classes.td}>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>Пользователи не найдены</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={classes.pagination}>
        {Array.from({ length: Math.ceil(meta.totalAmount / limit) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            className={currentPage === index + 1 ? classes.active : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button onClick={() => handlePageChange(currentPage - 1)}>Назад</button>
      <button onClick={() => handlePageChange(currentPage + 1)}>Вперёд</button>
    </div>
  )
}