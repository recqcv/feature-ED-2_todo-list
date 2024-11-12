import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";


function App(): JSX.Element {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
