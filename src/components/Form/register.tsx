import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseAPI } from "../../utils/constants";
import "react-toastify/dist/ReactToastify.css";
import { LoginCon, LoginWraps } from "./loginSyle";
import "react-toastify/dist/ReactToastify.css";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import toast, { Toaster } from "react-hot-toast";

interface SignupData {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  role: string;
}
interface Type {
  data: string;
  success: string;
}
const mockRoles = ["admin_plus", "admin", "basic_admin"];

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupData>({
    full_name: "",
    phone_number: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        baseAPI + "/user/add-user",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        toast.success('Successfully added admin.')
       setTimeout(() => {
        navigate("/profile");
       }, 3000)
      }
    } catch (error: any) {
      toast.error('Error occurred while adding admin.', error)
      setError('Error occurred while adding admin.');
      setTimeout(() => {
        setError('');  
      }, 2000);
    } finally {
      setLoading(false);
    }
  };
  const handleChanges = (event: any, value: string | null) => {
    setFormData({
      ...formData,
      role: value || "",
    });
  };

  return (
    <LoginCon>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <form onSubmit={handleSubmit}>
        <LoginWraps className="LoginWrap">
          <div className="aut">
            {" "}
            <h2>Registrate</h2> <h3 onClick={() => navigate("/profile")}>X</h3>
          </div>

          <div className="loginis1">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              placeholder="To'liq Ism"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="loginis1">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone_number"
              placeholder="Telefon Raqami"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="loginis1">
            <Select
              placeholder="Select Role"
              indicator={<KeyboardArrowDown />}
              onChange={handleChanges}
              value={formData.role}
              sx={{
                width: "59.5vmin",
                maxWidth: "434px",
                background: "rgba(55, 55, 55, 0.10)",
                borderRadius: "8px",
                padding: "10px 20px",
              }}
            >
              <Option key="all" value="">
                Select Role
              </Option>
              {mockRoles.map((role) => (
                <Option key={role} value={role}>
                  {role.replace("_", " ").toUpperCase()}
                </Option>
              ))}
            </Select>
          </div>

          {error && (
            <div style={{ color: "red", position: "relative", top: 5 }}>
              {error}
            </div>
          )}

          <div className="loginis7">
            <button type="submit" disabled={loading}>
              {loading ? "Yuborilmoqda..." : "REGISTRATE"}
            </button>
          </div>
        </LoginWraps>
      </form>
    </LoginCon>
  );
};

export default Register;
