import React from "react";
import bg1 from "../../../Images/bg2.jpg"
import "./Home.css";
const Home = () => {

    return (

        <div className="landing-page">
            <div className="container">
                <div className="info">
                    <h1>Let's make project review easy</h1>
                    <h3>Portal for Student & Professors</h3>
                    <p>Get started with your project submission and reviews in few clicks.</p>
                    <button>Welcome</button>
                </div>
                <div className="image">
                    <img src={bg1} />
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
    );
};
export default Home;
