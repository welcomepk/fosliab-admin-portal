import React from "react";
import "./login.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react";
import credentek_logo from "../assets/images/CredentekLogo.png";

// import EncryptionPublicKey from "../encryption/EncryptionPublicKey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { baseUrl } from "../Config";
import Swal from "sweetalert2";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useAuth } from "../context/authProvider";

const initialState = {
    username: "",
    password: "",
    clearLastLogin: "Y"
}
export default function Login() {
    const [inputs, setInputs] = useState(initialState);
    const navigate = useNavigate();
    const { login } = useAuth()
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    // Simulating an asynchronous task
    useEffect(() => {
        setTimeout(() => {
            // Once your task is completed, you can hide the backdrop here
            handleClose();
        }, 1000);
    }, []); // The empty dependency array ensures this effect runs once

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));

        if (event.target.type === "checkbox") {
            setInputs((values) => ({ ...values, [name]: event.target.checked }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputs.username) {
            Swal.fire({
                icon: "warning",
                text: "Please Enter User Name",
            });
            return;
        }
        if (!inputs.password) {
            Swal.fire({
                icon: "warning",
                text: "Please Enter Password",
            });
            return;
        }
        handleToggle();

        // let usernameencode = await EncryptionPublicKey(inputs.username);
        // let passwordencode = await EncryptionPublicKey(inputs.password);
        // let clearLastLoginencode = inputs.clearLastLogin;

        const logindata = {
            username: inputs.username,
            password: inputs.password,
            clearLastLogin: inputs.clearLastLogin
        };

        try {
            const res = await axios.post(baseUrl + "/login", logindata)
            const data = res.data;
            if (data.errorMessage === "Error") {
                // setInputs(pre => )
                Swal.fire({
                    icon: "error",
                    text: data.message,
                });
                return;
            }
            login(data.jwtToken, data) // login(jwtToken, userData)
            localStorage.setItem("disable_K", true);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                text: "Something Went wrong, \n Please Try again",
            });
        } finally {
            handleClose();
        }
    };

    const handleKeyPress = (event) => {
        // console.log(event);
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    };

    //-----------------------------------------------------------//

    const [seconds, setSeconds] = useState(60); // Initial timer value in seconds

    useEffect(() => {
        // Exit the timer when it reaches 0
        if (seconds === 0) return;

        const timerInterval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000); // Update every 1 second

        // Clear the interval when the component unmounts
        return () => clearInterval(timerInterval);
    }, [seconds]);


    useEffect(() => {
        sessionStorage.removeItem("isAppOpen");
        console.log("clearing storage");

        sessionStorage.clear();
    }, []);

    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === "a") {
            e.preventDefault();
        }
    };

    return (
        <>
            <div className="hero-img  login-page">
                <div className="login-content">
                    <div className="row h-100 ">
                        <div className=" d-flex justify-content-center align-items-center">
                            <div
                                className={`cards cards-style`}
                            >
                                {/* <div className={`${isFlipped ? "flipped" : ""} `}> */}
                                <div className="loginlogo my-2">
                                    <img
                                        className="w-75"
                                        draggable="false"
                                        src={credentek_logo}
                                        alt="credentek logo"
                                    />
                                </div>
                                <div className="card-content">
                                    {/* Card front */}
                                    <div className="login-side card-front flex-column-list">
                                        <form
                                            action="login"
                                            className="form"
                                            onSubmit={handleSubmit}
                                            autoComplete="off"
                                        >

                                            <div className="input-div one mt-3">
                                                <div className="i">
                                                    <FontAwesomeIcon icon={faUser} />
                                                </div>
                                                <div className="div my-2">
                                                    <input
                                                        type="text"
                                                        className="form-control "
                                                        name="username"
                                                        autoComplete="off"
                                                        autoFocus
                                                        // maxLength="30"
                                                        placeholder="User Name"
                                                        value={inputs.username || ""}
                                                        onChange={handleChange}
                                                        onKeyPress={handleKeyPress}
                                                    />
                                                </div>
                                            </div>
                                            <div className="input-div pass mb-2">
                                                <div className="i">
                                                    <FontAwesomeIcon icon={faLock} />
                                                </div>
                                                <div className="div my-2  sftp">
                                                    <input
                                                        type={"text"}
                                                        className="form-control "
                                                        id="password"
                                                        name="password"
                                                        autoComplete="off"
                                                        maxLength="30"
                                                        placeholder="Password"
                                                        value={inputs.password || ""}
                                                        onChange={handleChange}
                                                        onKeyDown={handleKeyDown}
                                                        onKeyPress={handleKeyPress}
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                className="col-md-12"
                                                style={{ paddingLeft: "10px" }}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={inputs.clearLastLogin}
                                                            // disabled={disableForm}
                                                            size="small"
                                                        />
                                                    }
                                                    label="Clear Last Login"
                                                    name="clearLastLogin"
                                                    onChange={handleChange}
                                                    className="clear-last-login"
                                                />
                                            </div>

                                            <input
                                                type="submit"
                                                value="Login"
                                                className="btn text-center my-2"
                                                id="loginSubmit"
                                                // onClick={handleSubmit}
                                                onKeyPress={handleKeyPress}
                                            ></input>
                                        </form>
                                    </div>

                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                        {/* <div className="containerFooter">
                            <Footer />
                        </div> */}
                    </div>
                </div>
            </div>

            <Backdrop
                sx={{ color: "blue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

