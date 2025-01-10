
import credentek_logo from "../assets/images/CredentekLogo.png";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import { Link } from "react-router";

export default function WelcomePage() {

    return (
        <>
            <div className="welcome-home">
                <div className="box">
                    <div className="sec1 text-center">
                        <img src={credentek_logo} alt="credentek_logo" />
                    </div>
                    <div className="sec3 sec text-center">
                        <Link to="/login" className="link">
                            <Button
                                variant="outlined"
                                startIcon={<LoginIcon />}
                                sx={{
                                    fontWeight: "bold",
                                    color: "#d8107b",
                                    border: "1px solid #d8107b"
                                }}
                            >
                                Click To Continue For Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <div className="containerFooter">
                    <Footer />
                </div> */}
        </>
    );
};
