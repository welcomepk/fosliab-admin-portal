
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import errorImg from "../assets/images/imageserrorpage.jpg";

// import SessionTimeOut from "./SessionTimeOut";

function DuplicateTabErrorPage() {
  return (
    <>
      <div
        className="error"
        style={{ background: "#b9dfde", width: "100%", height: "100vh" }}
      >
        <div className="container">
          <img
            className="error-img"
            src={errorImg}
            alt="404 Error Page"
            style={{ width: "500px" }}
          />
          <p className="error-message">
            Oops! The page you were looking for couldn&apos;t be found.
          </p>
          {/* <Button
            type="submit"
            className="bg-pink"
            variant="contained"
            size="large"
          >
            <Link to="/login">Back To Login Page </Link>
          </Button> */}
        </div>
      </div>
      {/* <SessionTimeOut></SessionTimeOut> */}
    </>
  );
}

export default DuplicateTabErrorPage;
