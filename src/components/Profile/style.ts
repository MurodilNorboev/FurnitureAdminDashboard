import styled from "styled-components";


export const MainContent = styled.div`
  flex: 1;
  padding-top: 50px;
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

export const AddButton = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: end;
   margin-bottom: 30px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
  border-radius: 10px;
  padding: 20px;

  @media only screen and (max-width: 1000px) {
    .UserContent {
      gap: 30px;
      display: grid;
      grid-template-areas: " a ";
      .Container {
        width: 100%;
        display: flex;
      }
    }
}
`;

export const UserContent = styled.div`
  width: 50%;
  border-radius: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  .Container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 320px;
    .bosh {
      display: flex;
      align-items: center;
    }
  }
`;

export const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #3b3d62;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const Section = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;