import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
    const [userData, setUserData] = useState(null);
    const getUserInfo = () => {
        const isCookieEnabled = navigator.cookieEnabled;

        const userLanguage =
            navigator.languages && navigator.languages.length
                ? navigator.languages[0]
                : navigator.language;

        function userDevice() {
            let device;
            if (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                )
            ) {
                device = "mobile";
            } else {
                device = "desktop";
            }
            return device;
        }

        function browserDetector() {
            let userAgent = navigator.userAgent;
            let browserName;

            if (userAgent.match(/chrome|chromium|crios/i)) {
                browserName = "chrome";
            } else if (userAgent.match(/firefox|fxios/i)) {
                browserName = "firefox";
            } else if (userAgent.match(/safari/i)) {
                browserName = "safari";
            } else if (userAgent.match(/opr\//i)) {
                browserName = "opera";
            } else if (userAgent.match(/edg/i)) {
                browserName = "edge";
            } else {
                browserName = "No browser detection";
            }
            return browserName;
        }

        function browserDimension() {
            const browserWidth = window.innerWidth;
            const browserHeight = window.innerHeight;
            return `${browserWidth}x${browserHeight} pixels`;
        }

        return {
            cookies: isCookieEnabled,
            language: userLanguage,
            device: userDevice(),
            browserName: browserDetector(),
            browserDimension: browserDimension(),
        };
    };

    useEffect(() => {
        axios
            .get("/ip-address")
            .then(function (response) {
                console.log(response);
                const data = {
                    ipAddress: response.data.ipAddress,
                    ...getUserInfo(),
                };
                setUserData(data);
            })
            .catch(function (error) {
                console.log("Failed to get Ip Address");
            });

        axios
            .post("/tracking", getUserInfo())
            .then(function (response) {
                console.log("Tracked successfully");
            })
            .catch(function (error) {
                console.log("Tracking Failed");
            });
    }, []);

    return (
        <div>
            <h1 className="">CRYPTO SHOPE</h1>
            <div>
                <img
                    alt="Product"
                    className=""
                    height="180px"
                    width="300px"
                    src="https://c7.alamy.com/zooms/9/0bada0e5df6b461897c71da68d79897f/r8wet2.jpg"
                />
                <p className="product">Ethereum Coffee</p>
                <button className="buy">Buy</button>
            </div>

            <div>
                <h1>User Data</h1>
                <p>IP Address: {userData ? userData.ipAddress : null}</p>
                <p>
                    Cookies Enabled:{" "}
                    {userData ? userData.cookies.toString() : null}
                </p>
                <p>Browser Language: {userData ? userData.language : null}</p>
                <p>Device Type: {userData ? userData.device : null}</p>
                <p>Browser Name: {userData ? userData.browserName : null}</p>
                <p>
                    Browser Dimension:{" "}
                    {userData ? userData.browserDimension : null}
                </p>
            </div>
        </div>
    );
}
