import styled from "styled-components";

export const MainContent = styled.div`
  flex: 1;
  max-height: 670px;
  .bosh {
    display: flex;
    h4 {
      max-width: 140px;
      width: 100%;
      display: flex;
      font-size: 20;
      font-stretch: condensed;
      box-lines: single;
      font-weight: 600;
    }
    h5 {
      display: flex;
      font-size: 18;
      font-stretch: condensed;
      box-lines: single;
      font-weight: 400;
    }
  }
  .buttons {
    transform: translate(3sm) outline;
    :hover {
      background-color: #FFF;
    }
    :active {
      transform: scale(0.98);
    }
  }
  .buttonwrap {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      width: 100px;

    }
  }
`;

export const Section = styled.div`
  margin-top: 30px;
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;