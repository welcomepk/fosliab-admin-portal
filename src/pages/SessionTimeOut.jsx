import { useEffect } from "react";
import { useNavigate } from "react-router";
import { baseUrl } from "../Config";
import { decode as base64_decode } from "base-64";


const baseURL = baseUrl;
const logOutURL = "/logout";

export default function SessionTimeOut() {
  const navigate = useNavigate();
  const sessionTimeoutDuration = 180000000; // 1 minute in milliseconds 1 min = 60000  30 min *60000 = 1800000

  const userName = localStorage.getItem("loginID");

  const onHandleLogOut = () => {
    let usernameencode = base64_decode(userName);

    const requestOptionssearch = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        loginId: usernameencode,
      }),
    };

    fetch(baseURL + logOutURL, requestOptionssearch)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    let sessionTimeout;
    const resetTimeout = () => {
      clearTimeout(sessionTimeout);
      sessionTimeout = setTimeout(logout, sessionTimeoutDuration);
    };
    const logout = () => {
      onHandleLogOut();
    };
    const handleUserActivity = () => {
      resetTimeout();
    };
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    resetTimeout();

    return () => {
      clearTimeout(sessionTimeout);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, []);

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel("logoutChannel");
    const handleUnload = () => {
      broadcastChannel.postMessage("logout");
      onHandleLogOut();
    };

    const handleLogoutMessage = (event) => {
      onHandleLogOut();
      broadcastChannel.postMessage("logout");
    };

    window.addEventListener("unload", handleUnload);
    broadcastChannel.addEventListener("message", handleLogoutMessage);

    return () => {
      window.removeEventListener("unload", handleUnload);
      broadcastChannel.removeEventListener("message", handleLogoutMessage);
    };
  }, []);

  return <></>;
}
