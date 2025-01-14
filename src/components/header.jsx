import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUser,
    faCalendarDays,
    faRightFromBracket,
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/images/CredentekLogo.png";
import { useNavigate } from "react-router";
import { baseUrl } from "../Config"
import { useAuth } from "../context/authProvider";
import axios from "axios";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const { logout, authToken, user } = useAuth();
    const onHandleHome = () => {
        navigate("/dashboard");
    };
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {

        let body = { username: user.username };
        let headers = {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
        };
        try {
            const res = await axios.post(baseUrl + "/logOut", body, { headers })
            if (res.status === 200) {
                logout()
            }
        } catch (error) {
            console.log(error);
        } finally {
            logout()
        }
    };

    return (
        <>
            <div className="mb-0">
                <div className="mainheader">
                    <span className="logoDiv">
                        <img src={Logo} />
                    </span>
                    <span className="d-flex align-items-center ms-3">
                        <FontAwesomeIcon
                            icon={faHome}
                            className="Homebtn"
                            onClick={onHandleHome}
                        />
                    </span>

                    <div className="globleSearch d-flex">

                    </div>
                    <div className="marqueeDiv">
                        <marquee
                            width="100%"
                            direction="left"
                            height="100%"
                        // scrollamount="10"
                        ></marquee>
                    </div>
                    <div className="BtnDiv">
                        <Button
                            className="btnusenamemassage"
                            id=""
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
                            <span className="ms-2">
                                Hello {user.username}
                            </span>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "",
                            }}
                        >
                            <MenuItem>
                                <div className="d-flex justify-content-between gap-3 w-100">
                                    <div>
                                        <FontAwesomeIcon icon={faCalendarDays} />{" "}
                                        <span>
                                            Current Login :
                                        </span>
                                    </div>
                                    <span>
                                        {user.currentLoginDt}
                                    </span>
                                </div>
                            </MenuItem>
                            <hr />
                            <MenuItem>
                                <div className="d-flex justify-content-between gap-3 w-100">
                                    <div>
                                        <FontAwesomeIcon icon={faCalendarDays} />{" "}
                                        <span>
                                            Last Login :
                                        </span>
                                    </div>
                                    <span>
                                        {user.lastLoginDt}
                                    </span>
                                </div>
                            </MenuItem>
                            <hr />
                            <MenuItem
                                sx={{ justifyContent: "center", padding: "10px 15px" }}
                                onClick={handleLogout}
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span className="mx-2">Logout</span>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    );
}
