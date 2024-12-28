// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { baseAPI } from "../../utils/constants";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle } from 'react-icons/fa';
// import Button from '@mui/joy/Button';
// import ButtonGroup from '@mui/joy/ButtonGroup';
// import Tooltip from '@mui/joy/Tooltip';
// import { MainContent, UserContent, ProfileImage, Section, AddButton, Modal} from './style';
// import Add from '@mui/icons-material/Add';
// import Sheet from '@mui/joy/Sheet'
// import '../../scenes/Home/styles.css'

// const Profile = () => {
//   const [profile, setProfile] = useState<any>(null);
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [data, setData] = useState<any>({})

//   const handleClose = () => {
//     setOpen(false);
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return (window.location.href = "/login");
//         const { data } = await axios.get(`${baseAPI}/user/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(data);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get(`${baseAPI}/userFur/user-count`);
//         setData(data)
//       } catch (error) {
//         console.log('bu error :' + error);
//       }
//     };
//     fetchData()
//   })

//   const logaut = () => {
//     localStorage.clear();
//     navigate('/login');
//   }

//   return profile ? (
//     <div>
//       <MainContent>

//         <AddButton>
//             <Button 
//                variant="outlined"
//                startDecorator={<Add />}
//               style={{ width: '180px' }}> 
//               Add Admin
//             </Button>
//         </AddButton>

//           <Sheet
//            className="Sheet7"  
//            sx={{
//              border: '1px solid',
//              borderColor: 'divider',
//            }}>
//             <UserContent className="UserContent">
//                 <div className="Container">
//                <div className="bosh"><h4>Phone Number:</h4> <h5>{profile.data.phone_number}</h5></div>
//                <div className="bosh"><h4>Email:</h4> <h5>{profile.data.email}</h5></div>
//                <div className="bosh"><h4>Date:</h4> <h5>{new Date(profile.data.sana).toLocaleString()}</h5></div>
//                   <ButtonGroup sx={{marginTop:"20px"}} variant="soft" aria-label="tooltip button group">
//                     <Tooltip arrow title="logout" onClick={() => setOpen(!open)}>
//                       <Button>Logout</Button>
//                     </Tooltip>
//                   </ButtonGroup>

//                 {open && (
//                   <Modal onClick={() => handleClose()} className="buttonwrap">
//                       <Button onClick={() => {
//                       alert(logaut() + "Successfully logged out");
//                       handleClose();
//                     }}>Log Out</Button>
//                   </Modal>
//                 )}

//                </div>

//             <div style={{display:"flex",gap:"10px"}}>
//             <ProfileImage>
//               <FaUserCircle size={30} />
//             </ProfileImage>
//             <div>
//               <p>{profile.data.full_name}</p>
//               <small>Administrator</small>
//             </div>
//             </div>
//             </UserContent>
//           </Sheet>
        
//         <Section>
//           {Data.map((val, ind) => (
//            <Sheet
//            key={ind}
//            className="Sheet6"  
//            sx={{
//              border: '1px solid',
//              borderColor: 'divider',
//            }}>
//             <h2>{val.item}</h2>
//             <h5>{val.num}</h5>
//            </Sheet>
//           ))}
//         </Section>

//       </MainContent>
//     </div>
//   ) : (
//     <p>Ma'lumotlarni yuklayapmiz...</p>
//   );
// };

// export default Profile;


// const Data = [
//   { 
//     id: 1,
//     item: 'Total Users',
//     num: '5,430',
//     datas: {data[0].data}
//   },
//   { 
//     id: 2,
//     item: 'Active Sessions',
//     num: '1,230',
//     datas: ''
//   },
//   { 
//     id: 3,
//     item: 'Revenue',
//     num: '5,430',
//     datas: ''
//   },
// ]

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseAPI } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Tooltip from '@mui/joy/Tooltip';
import { MainContent, UserContent, ProfileImage, Section, AddButton, Modal} from './style';
import Add from '@mui/icons-material/Add';
import Sheet from '@mui/joy/Sheet';
import '../../scenes/Home/styles.css';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [usersData, setUsersData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);

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

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const { data } = await axios.get<any>(`${baseAPI}/userFur/user-count`);
        setUsersData(data.usersData); 
      } catch (error) {
        alert('Nomalumo hatolik ' + error)
      }
    };
    fetchUsersData();
  }, []);

  const logaut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const mockData = [
    {
      id: 1,
      item: 'Total Users',
      num: usersData.length, // usersData uzunligini ko‘rsatadi
    },
    {
      id: 2,
      item: 'Active Sessions',
      num: '1,230',
    },
    {
      id: 3,
      item: 'Revenue',
      num: '5,430',
    },
  ];

  return profile ? (
    <div>
      <MainContent>
        <AddButton>
          <Button 
            variant="outlined"
            startDecorator={<Add />}
            style={{ width: '180px' }}>
            Add Admin
          </Button>
        </AddButton>

        <Sheet className="Sheet7" sx={{ border: '1px solid', borderColor: 'divider' }}>
          <UserContent className="UserContent">
            <div className="Container">
              <div className="bosh"><h4>Phone Number:</h4> <h5>{profile.data.phone_number}</h5></div>
              <div className="bosh"><h4>Email:</h4> <h5>{profile.data.email}</h5></div>
              <div className="bosh"><h4>Date:</h4> <h5>{new Date(profile.data.sana).toLocaleString()}</h5></div>
              <ButtonGroup sx={{ marginTop: "20px" }} variant="soft" aria-label="tooltip button group">
                <Tooltip arrow title="logout" onClick={() => setOpen(!open)}>
                  <Button>Logout</Button>
                </Tooltip>
              </ButtonGroup>
              {open && (
                <Modal onClick={() => handleClose()} className="buttonwrap">
                  <Button onClick={() => {
                    alert(logaut() + "Successfully logged out");
                    handleClose();
                  }}>Log Out</Button>
                </Modal>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <ProfileImage>
                <FaUserCircle size={30} />
              </ProfileImage>
              <div>
                <p>{profile.data.full_name}</p>
                <small>Administrator</small>
              </div>
            </div>
          </UserContent>
        </Sheet>

        <Section>
          {mockData.map((val, ind) => (
            <Sheet key={ind} className="Sheet6" sx={{ border: '1px solid', borderColor: 'divider' }}>
              <h2>{val.item}</h2>
              <h5>{val.num}</h5>
            </Sheet>
          ))}
        </Section>
      </MainContent>
    </div>
  ) : (
    <p>Ma'lumotlarni yuklayapmiz...</p>
  );
};

export default Profile;