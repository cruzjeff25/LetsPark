import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/admin/login.css";
import logo from "../../img/logo.png";
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import ReactLoading from "react-loading";
import { UserContext } from "../..";

const adminCollection = collection(firestore, "admin");

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [complete, setComplete] = useState(true);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.loggedIn == true) {
      navigate("/admin/dashboard");
    }
  }, []);

  const login = async () => {
    setLoading(true);

    let result = {};
    const snapshot = await getDocs(adminCollection);

    for (const doc of snapshot.docs) {
      if (doc.data()["username"] === username && doc.data()["password"] === password) {
        result = doc.data();
        break;
      }
    }

    setLoading(false);
    return result;
  };

  const handleLogin = async () => {
    if (username === null || username.length === 0) {
      setComplete(false);
      setError("Please enter username");
      return;
    }

    if (password === null || password.length === 0) {
      setComplete(false);
      setError("Please enter password");
      return;
    }

    setComplete(true);

    let result = await login();

    if (JSON.stringify(result) !== "{}") {
      user.loggedIn = true;
      user.data = result;
      localStorage.setItem("loggedIn", true);

      localStorage.setItem("data", JSON.stringify(result));
      navigate("/admin/dashboard", { state: result });
    } else {
      setComplete(false);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="loginContainer">
      <div class="split leftside">
        <div class="centered">
          <img src={logo} alt="logo" width="100%" />
          <h1>Let's Park!</h1>
        </div>
      </div>
      <div class="split rightside">
        <div class="">
          <div class="logincard">
            <div class="cardbody" style={{ textAlign: "center" }}>
              <img src={logo} alt="logo" width="100%" />
              {!complete ? (
                <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
              ) : null}
              <div class="form-group">
                <label> User Name</label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  class="form-control mt-0"
                  placeholder="Enter your user name"
                  name="user_name"
                  type="text"
                  readOnly={loading ? true : false}
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  class="form-control mt-0"
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                  readOnly={loading ? true : false}
                />
              </div>
            </div>
            <div class="card-footer justify-content-center">
              <button
                onClick={loading ? null : handleLogin}
                type="submit"
                class="btn delirush-admin-btn-primary btn-lg btn-block"
                style={{ pointerEvents: loading ? "none" : "auto" }}
              >
                {loading ? (
                  <div
                    className="loadingContainer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ReactLoading
                      type={"bars"}
                      color={"#FFF"}
                      height={"19px"}
                      width={"19px"}
                    />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
