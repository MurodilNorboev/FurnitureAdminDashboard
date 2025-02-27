import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { baseAPI } from "./constants";
import ScaleLoader from "react-spinners/ScaleLoader";

interface VerifyTokenResponse {
  success: boolean;
  valid: boolean;
}

const ProtectedRoute = () => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const { data } = await axios.get<VerifyTokenResponse>(
          `${baseAPI}/user/verify-token`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIsValid(data.valid);
      } catch (error) {
        setIsValid(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isValid === null)
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ScaleLoader color={"#1976e8d7"} />
      </div>
    );

  return isValid ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
