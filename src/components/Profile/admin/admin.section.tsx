import { useEffect, useState } from "react";
import { baseAPI } from "../../../utils/constants";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { MainContent, Section } from "./style";
import Sheet from "@mui/joy/Sheet";
import "../../../scenes/Home/styles.css";
import Button from "@mui/joy/Button";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function AdminSections() {
  const [user, setUser] = useState<any[]>([]);
  const [loading, setLoadig] = useState(false);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data }: any = await axios.get(`${baseAPI}/user/user-Statistics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.data.allAdmins);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      const { data }: any = await axios.delete(
        `${baseAPI}/user/delete-admin/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Admin successfully deleted", {
          style: {
            backgroundColor: "#333",
            color: "white",
          },
        });
        fetchUser();
      }
    } catch {
      toast.error("Error occurred while connecting to the server");
    }
  };

  useEffect(() => {
    fetchUser();
    setLoadig(true);
    setTimeout(() => {
      setLoadig(false);
    }, 5000);
  }, []);

  if (user && user.length > 0 && user[0].role === "super_admin") {
    return (
      <>
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ScaleLoader color={"#1976e8d7"} loading={loading} />
          </div>
        ) : (
          <MainContent style={{ overflow: "scroll" }}>
            <Toaster position="top-right" />
            {user.length > 0 ? (
              user.map((val, ind) => (
                <Section key={ind}>
                  <Sheet
                    className="Sheet6"
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="left">
                        <h2>
                          user: {val.full_name} / {val.role}
                        </h2>
                        <h5>phone number: {val.phone_number}</h5>
                        <h5>created at: {val.sana}</h5>
                        <h5>email: {val.email}</h5>
                      </div>

                      <div className="right">
                        <Button
                          variant="outlined"
                          onClick={() => handleDelete(val._id)}
                        >
                          Delete Admin
                        </Button>
                      </div>
                    </div>
                  </Sheet>
                </Section>
              ))
            ) : (
              <div>user not found</div>
            )}
          </MainContent>
        )}
      </>
    );
  }

  // Agar foydalanuvchi super_admin bo‘lmasa yoki user yo‘q bo‘lsa, bu qaytariladi
  return <div>Access Denied</div>;
}
