import styled from "styled-components";

export const ContainerWrapper = styled.div`
display: flex;
flex-direction: column;
`;

export const Container = styled.div`
  padding: 30px 0px;
  gap: 20px;
  width: 100%;
  border-radius: 20px;
  display: flex;
  /* flex-direction: column; */
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
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white; 
  z-index: 99999;
  padding: 20px;
`;
export const ImgCon = styled.div`
  background-color: white; 
  display: flex;
  gap: 20px;
  margin-top: 30px;
  img {
    border-radius: 10px;
  }
`;
export const ModalCon = styled.div`
  background-color: white; 
  margin-top: 20px;
  .info {
    display: flex;
    gap: 10px;
  }
`;
export const Buttonn = styled.button`
display: flex;
position: absolute;
top: 0;
right: 0;
margin: 20px;
color: black;
background-color: transparent;
border: none;
font-size: 23px;
`;
