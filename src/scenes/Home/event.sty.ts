import styled, { DefaultTheme } from "styled-components";

interface ContainerProps {
  theme: DefaultTheme; 
}

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const Container = styled.div<ContainerProps>`
flex: 1;
  padding: 20px;
  max-height: 180px;
  height: 100vw;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
  border-radius: 8px;
  background-color: ${(props) => (props.theme.mode === "dark" ? "#333" : "#fff")};
  border: none;
  .users {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
  min-width: 250px;
  width: 100%;
`;

export const LinePositio = styled.div<ContainerProps>`
  width: 100%;
  /* background-color: ${(props) => (props.theme.mode === "dark" ? "#444" : "#f9f9f9")}; */
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;