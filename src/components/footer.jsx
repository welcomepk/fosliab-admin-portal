import { useEffect } from "react";

export default function Footer() {
    useEffect(() => {
        const preventClickjacking = () => {
            if (window !== window.top) {
                window.top.location.href = window.location.href;
            }
        };

        preventClickjacking();

        window.addEventListener("message", preventClickjacking);

        return () => {
            window.removeEventListener("message", preventClickjacking);
        };
    }, []);

    return (
        <div className="mainFooter">
            <div> </div>
            <div className="footer-text">
                Copyright © 2024 CredenTek Software & Consultancy Pvt Ltd.{" "}
                <a href="https://www.credentek.com" target="_blank">
                    www.credentek.com
                </a>
            </div>
            <div className="footer-text me-3">V24 1.1.5 22-10-2024</div>
            {/* <div className="footer-text me-3">V24 06-05-2024</div> */}
        </div>
    );
}
