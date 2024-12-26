import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseAPI } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { MainContent, UserContent, ProfileContainer, ProfileImage, Section, Card, AddButton} from './style';
import Add from '@mui/icons-material/Add';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
    navigate('/login');
  }

  return profile ? (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center',position:"fixed", top: 30 }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none"
            color="neutral"
            href="#some-link"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
            Profile
          </Typography>
        </Breadcrumbs>
      </Box>
      <MainContent>
        <AddButton>
            <Button 
               variant="outlined"
               startDecorator={<Add />}
              style={{ width: '180px' }}> 
              Add Admin
            </Button>
        </AddButton>
        <ProfileContainer>
            <UserContent className="UserContent">
                <div className="Container">
               <div className="bosh"><h4>Phone Number:</h4> <h5>{profile.data.phone_number}</h5></div>
               <div className="bosh"><h4>Email:</h4> <h5>{profile.data.email}</h5></div>
               <div className="bosh"><h4>Date:</h4> <h5>{new Date(profile.data.sana).toLocaleString()}</h5></div>
                  <ButtonGroup sx={{marginTop:"20px"}} variant="soft" aria-label="tooltip button group">
                    <Tooltip arrow title="logout" onClick={() => setOpen(!open)}>
                      <Button>Logout</Button>
                    </Tooltip>
                  </ButtonGroup>
               <div className="Container">
                {open && (
                  <div onClick={() => handleClose()} className="buttonwrap">
                      <Button onClick={() => {
                      alert(logaut() + "Successfully logged out");
                      handleClose();
                    }}>Log Out</Button>
                  </div>
                )}
               </div>
               </div>

            <div style={{display:"flex",gap:"10px"}}>
            <ProfileImage>
              <FaUserCircle size={30} />
            </ProfileImage>
            <div>
              <p>{profile.data.full_name}</p>
              <small>Administrator</small>
            </div>
            </div>
            </UserContent>
        </ProfileContainer>

        <Section>
          <Card>
            <h2>Total Users</h2>
            <p>5,430</p>
          </Card>
          <Card>
            <h2>Active Sessions</h2>
            <p>1,230</p>
          </Card>
          <Card>
            <h2>Revenue</h2>
            <p>$34,200</p>
          </Card>
        </Section>
      </MainContent>
    </div>
  ) : (
    <p>Ma'lumotlarni yuklayapmiz...</p>
  );
};

export default Profile;


