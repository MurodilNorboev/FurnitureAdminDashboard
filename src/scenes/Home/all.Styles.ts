import styled, { DefaultTheme } from "styled-components";

interface ContainerProps {
  theme: DefaultTheme; 
}
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const LinePositio = styled.div<ContainerProps>`
  background-color: transparent;
  width: 100%;
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