import styled from "styled-components";

export const ContainerWrapper = styled.div`
display: flex;
flex-direction: column;
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

export const Container = styled.div`
  padding: 30px 0px;
  gap: 20px;
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
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white; 
  z-index: 99999;
  padding: 50px 30px 100px 30px;
  gap: 30px;
  overflow: scroll;
`;
export const ImgCon = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  gap: 30px;
  padding: 20px;

  img {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 10px;
    aspect-ratio: 19/21;
    width: 100%;
    resize: both;
  }
`;
export const ModalCon = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: start;

  .Content {
    box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    min-width: 50%;
    max-width: 100%;
    gap: 15px;
    .item {
      width: 100%;
      display: flex;
      h4, h3 {
        border-bottom: 0.1px solid rgba(9, 30, 66, 0.25);
        display: flex;
        width: 100%;
      }
    }
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

export const OpenModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999;
  display: flex; 
  justify-content: center;
  align-items: center;
`;
export const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;
export const ModalConent = styled.div`
  display: grid;
  gap: 50px;
  padding: 10px;
  height: 700px;
  width: 100vw;
  max-width: 1400px;
  overflow: scroll;
  
  .ad {
    display: flex;
    justify-content: space-between;
    width: 50%;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
    border-radius: 10px;
    padding: 20px;
    .selectwrap {
      display: flex;
      flex-direction: column;
      width: 47%;
      gap: 5px;
    }
    select {
      width: 100%;
      border: 0px;
      border-radius: 5px;
      padding: 8px 10px;
      box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1.5px;
      color: gray;
      font-size: 16px;
    }
  } 
  .c {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
    padding: 20px;
    gap: 40px;
    border-radius: 10px;
    h5 {
      font: bold;
      font-size: medium;
    }
  }
  .aaa {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  .images {
    width: 140px;
    height: 120px;
    border-radius: 10px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1.5px;
    object-position: center;
    offset: inherit;
    object-fit: fill;
  }
  .image-container {
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 29px;
    padding: 20px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 0px 1px, rgba(9, 30, 66, 0.13) 0px 0px 0px 1px;
  }

  @media only screen and (max-width: 1040px) {
    .ad {
      gap: 40px;
      .selectwrap {
      width: 100%;
      }
      width: 100%;
    }
  }
  @media only screen and (max-width: 700px) {
    .ad {
      display: flex;
      flex-direction: column;
      gap: 20px;
      select {
        width: 100%;
      }
      .selectwrap {
        width: 100%;
      }
    }
  }
`;