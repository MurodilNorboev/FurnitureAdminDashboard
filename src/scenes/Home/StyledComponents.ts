import styled, { keyframes } from "styled-components";

/* Animations */
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

/* Styled Components */
export const Container = styled.div`
  /* background-color: #f8f9fc; */
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

export const Headers = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  /* background: #fff; */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-in-out;

  .welcome h2 {
    color: #4caf50;
  }

  .header-icons {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const StatisticsSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const StatisticsCards = styled.div`
  flex: 1;
  background: #fff;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${scaleUp} 0.8s ease-in-out;

  h3 {
    font-size: 28px;
    margin: 0;
  }

  p {
    margin: 10px 0 0;
    color: #777;
  }

  &.green {
    border-top: 5px solid #4caf50;
  }

  &.orange {
    border-top: 5px solid #ff9800;
  }

  &.red {
    border-top: 5px solid #f44336;
  }

  &.blue {
    border-top: 5px solid #2196f3;
  }
`;

export const ChartSection = styled.div`
  flex: 2;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-right: 20px;
`;

export const WorkListSection = styled.div`
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 10px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: 1px solid #f1f1f1;

    .priority {
      font-size: 12px;
      padding: 3px 10px;
      border-radius: 5px;
    }

    .high {
      background-color: #f44336;
      color: white;
    }

    .medium {
      background-color: #ff9800;
      color: white;
    }

    .low {
      background-color: #4caf50;
      color: white;
    }
  }
`;

export const ActivityLogSection = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;
