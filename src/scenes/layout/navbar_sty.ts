import Calendar from "react-calendar";
import styled from "styled-components";

export const StyledCalendar = styled(Calendar)`
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 380px;
  padding: 0px 10px;

  .react-calendar__navigation__arrow, .react-calendar__navigation__arrow .react-calendar__navigation__label, .react-calendar__navigation__arrow, .react-calendar__navigation__arrow:hover {
    border-radius: 10px;
  }

  .react-calendar {
    border-radius: 10px;
    overflow: hidden;
    background-color: #ffffff;
    color: #000000;
  }

  .react-calendar__tile {
    border-radius: 10px;
    padding: 15px 10px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    background-color: #ffffff;
    color: #000000;
  }

  .react-calendar__tile:hover {
    background-color: #6594d2;
    color: #ffffff;
  }

  /* Hozirgi sana */
  .react-calendar__tile--now {
    background-color: #d4f0ff; /* Hozirgi sana fon rangi */
    color: #005580; /* Hozirgi sana matn rangi */
  }

  /* Tanlangan sana */
  .react-calendar__tile--active {
    background-color: #000000; /* Qora fon */
    color: #ffffff; /* Oq matn */
  }
`;
export const Dashboard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 100px;
`;
export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const Avatars = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
`;

export const NewAdmin = styled.div`
  position: absolute;
  width: 100%;
  left: 400px;
`;
export const Item = styled.div`
  color: black;
`;