import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseAPI } from "../../utils/constants";
import "react-toastify/dist/ReactToastify.css";
import { LoginCon, LoginWrap } from "./loginSyle";
import toast, { Toaster } from "react-hot-toast";

interface LoginData {
  email: string;
  password: string;
}

interface Type {
  success: boolean;
  access_token: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post<Type>(
        baseAPI + "/user/login",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(token, response.data.access_token);

      if (response.data.access_token) {
        toast.success("Successfully logged in!");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
        localStorage.setItem("token", response.data.access_token);
      } else {
        setError("Token was not returned. Please try again.");
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error?.msg || "Noma’lum xato yuz berdi";
      setError("Incorrect login or password.");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginCon>
      <Toaster position="top-right" reverseOrder={false} />
      <LoginWrap className="LoginWrap">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="loginis1">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loginis1">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Parol"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="loginis3"
            style={{ marginTop: "10px", height: "20px" }}
          >
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>

          <div className="loginis4">
            <button type="submit" disabled={loading} onClick={handleSubmit}>
              {loading ? "Yuborilmoqda..." : "SIGN IN"}
            </button>
          </div>
        </form>
      </LoginWrap>
    </LoginCon>
  );
};

export default Login;
