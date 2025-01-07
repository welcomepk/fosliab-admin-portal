
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import errorImg from "../assets/images/404-error.jpg";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import SessionTimeOut from "./SessionTimeOut";

function Error() {
  return (
    <>
      <div className="error">
        <div className="container">
          <img className="error-img" src={errorImg} alt="404 Error Page" />
          <p className="error-message">
            Oops! The page you were looking for couldn't be found.
          </p>
          <Button
            type="submit"
            className="bg-pink"
            variant="contained"
            size="large"
          >
            <Link to="/login">Back To Login Page </Link>
          </Button>
        </div>
      </div>
      <SessionTimeOut></SessionTimeOut>
    </>
  );
}

export default Error;
