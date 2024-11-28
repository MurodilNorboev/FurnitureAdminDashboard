// import React, { useEffect, useState } from 'react'
// import ScaleLoader from "react-spinners/ScaleLoader";
// import { FaBell, FaMoon, FaSearch } from "react-icons/fa";
// import Header from '../../components/Admin/Header';
// import StatisticsCard from './StatisticsCard';
// import ProjectChart from './ProjectChart';
// import WorkList from './WorkList';
// import ActivityLog from './ActivityLog';
// import './app.css'
// import {
//   Container,
//   Headers,
//   StatisticsSection,
//   StatisticsCards,
//   ChartSection,
//   WorkListSection,
//   ActivityLogSection,
// } from "./StyledComponents";
// import Home_navbar from './home.navbar';

// const HomeComponent = () => {
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     setLoading(true)
//     setTimeout(() => {
//       setLoading(false)
//     }, 1000);
//   }, [])
//   return (
//     <div >
//       {
//         loading ? (
//           <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
//           <ScaleLoader
//           color='#4072f0'
//           loading={loading}
//         />
//         </div>
//         ) 
//         : 
//         (
//           <Container>

//             <Home_navbar />

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Statistics Section */}
//         <StatisticsSection>
//           <StatisticsCards className="green">
//             <h3>1,523</h3>
//             <p>Total Projects</p>
//           </StatisticsCards>
//           <StatisticsCards className="orange">
//             <h3>836</h3>
//             <p>In Progress</p>
//           </StatisticsCards>
//           <StatisticsCards className="red">
//             <h3>475</h3>
//             <p>Completed</p>
//           </StatisticsCards>
//           <StatisticsCards className="blue">
//             <h3>189</h3>
//             <p>Upcoming</p>
//           </StatisticsCards>
//         </StatisticsSection>

//         {/* Chart and Work Section */}
//         <div className="middle-section">
//           <ChartSection>
//             <h3>Project Statistics</h3>
//             <p>Graph placeholder</p>
//           </ChartSection>
//           <WorkListSection>
//             <h3>Today Work</h3>
//             <ul>
//               <li>
//                 <span>App Design - NFT</span>
//                 <span className="priority high">High</span>
//               </li>
//               <li>
//                 <span>Web Design - Apron's 3D</span>
//                 <span className="priority medium">Medium</span>
//               </li>
//               <li>
//                 <span>Desktop App - Rental Car</span>
//                 <span className="priority low">Low</span>
//               </li>
//             </ul>
//           </WorkListSection>
//         </div>

//         {/* Activity Log */}
//         <ActivityLogSection>
//           <h3>Activity Log</h3>
//           <p>Activity placeholder</p>
//         </ActivityLogSection>
//       </div>
//     </Container>
//         )
//       }
//     </div>
//   )
// }

// export default HomeComponent
 
import React from 'react'

function HomeComponent() {
  return (
    <div>HomeComponent</div>
  )
}

export default HomeComponent

