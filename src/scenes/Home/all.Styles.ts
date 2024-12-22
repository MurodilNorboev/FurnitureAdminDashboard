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
  min-width: 250px;
  width: 100%;
  .users {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    h2 {
      font-size: 16px;
      font: bold;
    }
  }
`;
export const Container2 = styled.div<ContainerProps>`
  box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
  border-radius: 8px;
  width: 100%;
  min-height: 400px;
  padding: 15px;
`;
export const Container3 = styled.div<ContainerProps>`
  box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
  border-radius: 8px;
  width: 100%;
  min-height: 800px;
  overflow-y: hidden;
`;
export const Container4 = styled.div<ContainerProps>`
  box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
  border-radius: 8px;
  width: 100%;
  min-height: 200px;
  padding: 20px;
`;
export const Container5 = styled.div<ContainerProps>`
  box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
  border-radius: 8px;
  width: 100%;
  max-width: 280px;
  height: 510px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .tops {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .charts {
      max-width: 240px;
    }
  }
  .countryCon {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    .bottoms {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }

  @media screen and (max-width: 1400px) {
    width: 100%;
    max-width: 100%;
    height: 400px;
    .countryCon {
      display: grid;
      grid-template-areas: "a a ";
      .bottoms {
        display: grid;
        max-width: 270px;
        width: 100vw;
      }
    }
  }
  @media screen and (max-width: 600px) {
    height: auto;
    .countryCon {
      display: grid;
      grid-template-areas: "a";
    }
  }
`;
export const LinePositio = styled.div<ContainerProps>`
  /* background-color: ${(props) => (props.theme.mode === "dark" ? "#444" : "#f9f9f9")}; */
  width: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;


//////////////////////   event 
export const ContainerEvent = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
export const ConversionNumber = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin: 8px 0;
`;
export const ChangeText = styled.div<{ change: number }>`
  font-size: 14px;
  color: ${(props) => (props.change < 0 ? "red" : "green")};
  margin-bottom: 16px;
`;
export const Chart = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100px;
  position: relative;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

  .point {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    position: relative;
    margin: 0 10px;
    background-color: #ccc;
  }

  .point:hover > div {
    display: block;
  }
`;
export const Tooltip = styled.div`
  display: none;
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid #ddd;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;

  span {
    display: block;
  }
`;
//////////// sessions


//////////// downloads