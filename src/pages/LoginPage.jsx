import "./diana.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import { useAuth } from "../contexts/AuthContext";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";

export default function Registerpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  return (
    <>
      <div className="bodyRegister">
        <div className="containerDi">

          <Link to="/">
            <label
              for="show"
              className="close-btn fas fa-times"
              title="close"
            ></label>
          </Link>

          <div className="text">Login Form</div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (!email || !password) {

              }
              setIsSubmitting(true);
              login(email, password)
                .then((response) => {
                  navigate('/')
                })
                .catch((error) => {
                  console.log(error.message);
                  Toastify({
                    text: error.message,
                    className: "error",
                    style: {
                      background:
                        "linear-gradient(to right, rgb(71, 22, 22), red)",
                    },
                  }).showToast();
                })
                .finally(() => setIsSubmitting(false));
            }}
          >
            <div className="data">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
              />
            </div>
            <div className="data">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                autoComplete="password"
              />
            </div>
            <div className="forgot-pass">
              <Link to="/forgot">
                <a href="#">Forgot password?</a>
              </Link>
            </div>
            <div className="btn">
              <div className="inner"></div>
              <button type="submit">Loge In</button>
            </div>
            <div className="signup-link">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}
