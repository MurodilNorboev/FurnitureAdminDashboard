import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Avatars,
  Container,
  Item,
  NewAdmin,
  StyledCalendar,
  Wrapper,
} from "./navbar_sty";
import { useNavigate, useLocation } from "react-router-dom";
import Skeleton from "@mui/joy/Skeleton";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import "../../scenes/Home/styles.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { baseAPI } from "../../utils/constants";

const MyCalendar = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();
  const defaultTitle = "";
  const title = location.state?.title || defaultTitle;
  const [usersData, setUsersData] = useState<any>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data }: any = await axios.get(`${baseAPI}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) {
          setUsersData(data.user);
        }
      } catch (error) {
        toast.error("User Not fount");
      }
    };

    fetchUser();
  }, []);

  const handleClose = () => {
    setData(false);
  };
  const handleClickInsideCalendar = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
  };
  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setData(false);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  return (
    <Container>
      <Toaster position="top-right" />
      {loading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Skeleton variant="rectangular" width={105} height="1em" />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "end",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div>
              <Skeleton variant="rectangular" width={170} height="2em" />
            </div>
            <Skeleton variant="circular" width={35} height={35} />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* / location */}
          <Box>
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
              <Typography
                color="primary"
                sx={{ fontWeight: 500, fontSize: 12 }}
              >
                {title}
              </Typography>
            </Breadcrumbs>
          </Box>
          
          {/* / User */}
          <NewAdmin>
            {usersData.length > 0 ? (
              usersData.map((val: any, ind: number) => (
                <Item key={ind}>Hello, {val.full_name}</Item>
              ))
            ) : (
              <div>not users</div>
            )}
          </NewAdmin>

          {/* / kalendar */}
          <Wrapper>
            <Sheet
              onClick={() => setData(true)}
              className="Sheet5"
              sx={{
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CalendarTodayIcon className="icons" />{" "}
              {new Date().toDateString()}
            </Sheet>
            {data && (
              <Sheet
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  position: "fixed",
                  zIndex: 99999,
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  all: "black",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
                onClick={handleClose}
              >
                <div onClick={handleClickInsideCalendar}>
                  <StyledCalendar value={date} onClickDay={handleDateChange} />
                </div>
              </Sheet>
            )}
            <Avatars
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
              alt="imag🌌"
              onClick={() => navigate("/profile")}
            />
          </Wrapper>
        </div>
      )}
    </Container>
  );
};

export default MyCalendar;
