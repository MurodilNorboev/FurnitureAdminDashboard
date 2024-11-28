import styled from "styled-components";
export const Container = styled.div` 
 padding: 20px; 
`;
export const AddToCartButton = styled.button`
  border: 1px solid black;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  &:hover { background-color: gray; }
`;
export const Modal = styled.div`
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex; 
  justify-content: center; 
  align-items: center;
`;
export const ModalContent = styled.div`
  background-color: white; 
  padding: 20px; 
  border-radius: 5px; 
  width: 400px; 
  position: relative;
`;
export const CloseButton = styled.div`
  position: absolute; 
  top: 10px; 
  right: 10px; 
  font-size: 24px; cursor: pointer;
`;
export const Input = styled.input`
  width: 100%; 
  padding: 10px; 
  margin: 10px 0; 
  border: 1px solid #ccc; 
  border-radius: 5px;
`;
export const SubmitButton = styled.button`
  background-color: #4CAF50; 
  color: white; 
  padding: 10px 20px; 
  font-size: 16px; 
  border-radius: 5px;
  &:hover { background-color: #45a049; }
`;
export const ErrorMessage = styled.div` 
  color: red; 
  font-size: 14px; 
  margin-bottom: 10px; 
`;
export const Table = styled.table`
  width: 100%; 
  margin-top: 20px; 
  border-collapse: collapse; 
  border: 1px solid black;
`;
export const TableRow = styled.tr`
 &:hover { 
    background-color: #f4f4f4; 
    cursor: pointer; 
    }
`;
export const TableData = styled.td`
  padding: 10px; 
  text-align: left; 
  border: 1px solid black;
`;
export const DeleteButton = styled.button`
  background-color: #f44336; 
  color: white; 
  padding: 5px 10px; 
  border: none; 
  cursor: pointer;
  border-radius: 5px; 
  &:hover { 
    background-color: #d32f2f; 
    }
`;