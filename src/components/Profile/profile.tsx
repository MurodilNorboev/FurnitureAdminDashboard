import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseAPI } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Tooltip from "@mui/joy/Tooltip";
import {
  MainContent,
  UserContent,
  ProfileImage,
  Section,
  AddButton,
  Modal,
} from "./style";
import Add from "@mui/icons-material/Add";
import Sheet from "@mui/joy/Sheet";
import "../../scenes/Home/styles.css";
import toast from "react-hot-toast";
import ScaleLoader from "react-spinners/ScaleLoader";

const Profile = () => {
  const [usersData, setUsersData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);
  const [profile, setProfile] = useState<any>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");
        const { data }: any = await axios.get(
          `${baseAPI}/user/user-Statistics`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data?.success && data?.data) {
          setUserCount(data.data.adminCount);
          toast.success("User found successfully.");
        } else {
          toast.error("No data found.");
        }
      } catch (error: any) {
        toast.error(`Error: ${error.message || "Something went wrong"}`);
      }
    };

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const { data }: any = await axios.get(`${baseAPI}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success && data.user.length > 0) {
          setProfile(data.user[0]); // Birinchi foydalanuvchini olish
        } else {
          toast.error("Foydalanuvchi topilmadi.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchUsersData = async () => {
      try {
        const { data } = await axios.get<any>(`${baseAPI}/userFur/user-count`);
        setUsersData(data.usersData);
      } catch (error) {
        alert("Nomalum xatolik " + error);
      }
    };

    fetchAdmin();
    fetchProfile();
    fetchUsersData();

    setLoading(true);
    setTimeout(() => setLoading(false), 5000);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const mockData = [
    { id: 1, item: "Total Users", num: usersData.length },
    { id: 2, item: "Total Admin", num: userCount },
  ];

  return profile ? (
    <div>
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
        <MainContent>
          <AddButton>
            <Button
              onClick={() => navigate("/register")}
              variant="outlined"
              startDecorator={<Add />}
              style={{ width: "180px" }}
            >
              Add Admin
            </Button>
          </AddButton>

          <Sheet
            className="Sheet7"
            sx={{ border: "1px solid", borderColor: "divider" }}
          >
            <UserContent className="UserContent">
              <div className="Container">
                <div className="bosh">
                  <h4>Phone Number:</h4> <h5>{profile?.phone_number}</h5>
                </div>
                <div className="bosh">
                  <h4>Email:</h4> <h5>{profile?.email}</h5>
                </div>
                <div className="bosh">
                  <h4>Date:</h4>{" "}
                  <h5>{new Date(profile?.sana).toLocaleString()}</h5>
                </div>
                <ButtonGroup sx={{ marginTop: "20px" }} variant="soft">
                  <Tooltip arrow title="logout" onClick={() => setOpen(!open)}>
                    <Button>Logout</Button>
                  </Tooltip>
                </ButtonGroup>
                {open && (
                  <Modal onClick={handleClose} className="buttonwrap">
                    <Button onClick={logout}>Log Out</Button>
                  </Modal>
                )}
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <ProfileImage>
                  <FaUserCircle size={30} />
                </ProfileImage>
                <div>
                  <p>{profile?.full_name}</p>
                  <small>Administrator</small>
                </div>
              </div>
            </UserContent>
          </Sheet>

          <Section>
            {mockData.map((val, ind) => (
              <Sheet
                key={ind}
                className="Sheet6"
                sx={{ border: "1px solid", borderColor: "divider" }}
                onClick={() => {
                  if (
                    profile?.role === "super_admin" &&
                    val.item === "Total Admin"
                  ) {
                    navigate("/admininfo");
                  } else if (profile?.role === "admin_plus" &&
                    val.item === "Total Admin") {
                    navigate("/admininfo");
                  } else {
                    navigate('/user')
                  }
                }}
              >
                <h2>{val.item}</h2>
                <h5>{val.num}</h5>
              </Sheet>
            ))}
          </Section>
        </MainContent>
      )}
    </div>
  ) : (
    <p>Ma'lumotlarni yuklayapmiz...</p>
  );
};

export default Profile;
