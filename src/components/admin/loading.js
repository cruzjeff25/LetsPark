import React from 'react';
import logo from "../../img/logo.png";
import ReactLoading from 'react-loading';

const LoadingComponent = () => {
    return (
        <div className='loadingContainer' style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
                <img src={logo} alt="logo" width="100px" />
                <p style={{ fontSize: "14px", fontStyle: "italic" }}>Loading now...</p>
                <div className='loadingContainer' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ReactLoading type={"bars"} color={"#0096FF"} height={"50px"} width={"50px"} />
                </div>
            </div>
        </div>
    );
}

export default LoadingComponent;