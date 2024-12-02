import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseAPI } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return (window.location.href = "/login");
        const { data } = await axios.get(`${baseAPI}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const logaut = () => {
    localStorage.clear();
    navigate('login');
  }

  return profile ? (
    <div>
      <h1>PROFILE</h1>
      <p><strong>Ism:</strong> {profile.data.full_name}</p>
      <p><strong>Email:</strong> {profile.data.email}</p>
      <p><strong>Telefon:</strong> {profile.data.phone_number}</p>
      <p><strong>Sana:</strong> {new Date(profile.data.sana).toLocaleString()}</p>

      <button onClick={logaut}>logaut</button>
    </div>
  ) : (
    <p>Ma'lumotlarni yuklayapmiz...</p>
  );
};

export default Profile;
