import { Outlet } from "react-router-dom";

function AuthLayout(): JSX.Element {


  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthLayout;