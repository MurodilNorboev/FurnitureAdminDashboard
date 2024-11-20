import React, { useState } from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
display: flex;
  background-color: #333;
  overflow: scroll;
  position: relative;
  width: 100%;
`;

const NavItem = styled.div`
  float: left;
  font-size: 16px;
  color: white;
  padding: 14px;
  text-align: center;
  cursor: pointer;
`;

const DropdownContent = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  width: 100%;
  border-radius: 20px;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.img`
width: 250px;
height: 150px;
border-radius: 20px;
border: none;
  margin: 10px;
  object-fit: cover;
  transition: transform 0.2s; 
  
  &:hover {
    transform: translateX(10px);
    background-color: #ddd;
  }
`;

const imglar = [
  {
    img:"https://static.vecteezy.com/system/resources/previews/029/633/465/non_2x/family-camping-car-go-on-holiday-in-a-campervan-parked-next-to-the-river-with-the-mountains-behind-the-sunset-free-photo.jpeg"
  },
  {
    img: "https://media.istockphoto.com/id/892770978/photo/i-dont-need-therapy-i-just-need-camping.jpg?s=612x612&w=0&k=20&c=u8VCgT3yRS7XFE169ADk6gwQXysU9P9SCr61RQE-3_o="
  },
  {
    img: "https://media.istockphoto.com/id/892770978/photo/i-dont-need-therapy-i-just-need-camping.jpg?s=612x612&w=0&k=20&c=u8VCgT3yRS7XFE169ADk6gwQXysU9P9SCr61RQE-3_o="
  },
  {
    img:"https://static.vecteezy.com/system/resources/previews/029/633/465/non_2x/family-camping-car-go-on-holiday-in-a-campervan-parked-next-to-the-river-with-the-mountains-behind-the-sunset-free-photo.jpeg"
  },
  {
    img: "https://media.istockphoto.com/id/892770978/photo/i-dont-need-therapy-i-just-need-camping.jpg?s=612x612&w=0&k=20&c=u8VCgT3yRS7XFE169ADk6gwQXysU9P9SCr61RQE-3_o="
  },
  {
    img: "https://media.istockphoto.com/id/892770978/photo/i-dont-need-therapy-i-just-need-camping.jpg?s=612x612&w=0&k=20&c=u8VCgT3yRS7XFE169ADk6gwQXysU9P9SCr61RQE-3_o="
  },
  {
    img:"https://static.vecteezy.com/system/resources/previews/029/633/465/non_2x/family-camping-car-go-on-holiday-in-a-campervan-parked-next-to-the-river-with-the-mountains-behind-the-sunset-free-photo.jpeg"
  },
  {
    img: "https://media.istockphoto.com/id/892770978/photo/i-dont-need-therapy-i-just-need-camping.jpg?s=612x612&w=0&k=20&c=u8VCgT3yRS7XFE169ADk6gwQXysU9P9SCr61RQE-3_o="
  },
  {
    img: "https://media.istockphoto.com/id/892770978/photo/i-dont-need-therapy-i-just-need-camping.jpg?s=612x612&w=0&k=20&c=u8VCgT3yRS7XFE169ADk6gwQXysU9P9SCr61RQE-3_o="
  },
]

const TestComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
          <Navbar  >

      <NavItem     
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)} >Navbar </NavItem>

    </Navbar>

    <DropdownContent   
         isVisible={isVisible}>

        <div style={{display:"flex",overflow:"scroll"}}>
        {imglar.map((value) => (
          <div 
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}>
            <DropdownItem src={value.img} alt=''/>
          </div>
        ))}
        </div>
        </DropdownContent>
    </div>
  );
};

export default TestComponent



 

















