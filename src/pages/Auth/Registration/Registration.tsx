import { Link } from "react-router-dom";
import RegistrationForm from "../../../components/RegistrationForm";
import classes from "./Registration.module.css"

export default function Registration() {
  return (
    <>
      <RegistrationForm />
      {/* <p><Link to='todo'>Go to Todo</Link></p>
      <p><Link to='auth'>Go to Auth</Link></p> */}
    </>
  )
}