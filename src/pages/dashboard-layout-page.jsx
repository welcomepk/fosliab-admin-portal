
import Footer from "../components/footer";

import MenuBar from "../components/menu-bar";
import { useEffect } from "react";
import { useAuth } from "../context/authProvider"
import { Navigate } from "react-router";

function DashboardLayout() {

    const { isAuthenticated } = useAuth()

    useEffect(() => {
        let sessionTimeout;
        let sessionTimeout1;

        const resetTimeout = () => {
            clearTimeout(sessionTimeout);
            clearTimeout(sessionTimeout1);
        };

        const handleMouseMove = () => {
            resetTimeout();
        };

        const wrapperElement = document.getElementById("app-wrapper");
        if (wrapperElement) {
            wrapperElement.addEventListener("mousemove", handleMouseMove);
            wrapperElement.addEventListener("keydown", handleMouseMove);
            resetTimeout();
        }

        return () => {
            clearTimeout(sessionTimeout);

            if (wrapperElement) {
                wrapperElement.removeEventListener("mousemove", handleMouseMove);
                wrapperElement.removeEventListener("keydown", handleMouseMove);
            }
        };
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }


    // useEffect(() => {
    //     const userAgent = window.navigator.userAgent;
    //     if (userAgent.includes("Chrome")) {
    //         setBrowser("Chrome");
    //     } else if (userAgent.includes("Firefox")) {
    //         setBrowser("Firefox");
    //     } else if (userAgent.includes("Edge")) {
    //         setBrowser("Edge");
    //     } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    //         setBrowser("Safari");
    //     } else {
    //         setBrowser("Unknown");
    //     }
    // }, []);


    document.addEventListener("contextmenu", (event) => event.preventDefault());
    window.addEventListener("devtoolschange", (event) => {
        if (event.detail.isOpen) {
            alert("Developer tools detected!");
        }
    });

    return (
        <div className="App" id="app-wrapper">
            <div className="sidebarcontainer">
                <MenuBar />
            </div>
            <div className="containerFooter">
                <Footer />
            </div>
        </div>
    );
}

export default DashboardLayout;
