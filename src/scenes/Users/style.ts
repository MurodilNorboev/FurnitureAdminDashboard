import styled from "styled-components";

export const ContainerWrapper = styled.div`
display: flex;
flex-direction: column;
`;

export const Container = styled.div`
  width: 100%;
  border-radius: 20px;
  display: flex;
  min-width: 250px;

@media screen and (max-width: 1400px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
@media screen and (max-width: 620px) {
    grid-template-columns: 1fr;
}
`;
export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white; 
  z-index: 99999;
  overflow: scroll;
`;
export const UserContent = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: 15px;
  min-height: 400px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;

  @media only screen and (max-width: 900px) {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    .ImgCon {
      width: 100%;
    }
    .ModalCon {
      width: 100%;
    .info {
      h4 {
        display: flex;
        justify-content: end;
      }
    } 
    }
  }
`;
export const ImgCon = styled.div`
  background-color: white; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
  border-radius: 10px;
  img {
    border-radius: 10px;
    max-width: 250px;
    filter: drop-shadow(2px 2px 10px cual);
  }
`;
export const ModalCon = styled.div`
  min-height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    border-bottom: 1px solid black;
    h4 {
      display: flex;
      justify-content: start;
    }
  }
`;
export const Buttonn = styled.button`
display: flex;
position: absolute;
top: 0;
right: 0;
margin: 30px;
color: black;
background-color: transparent;
border: none;
font-size: 23px;
`;