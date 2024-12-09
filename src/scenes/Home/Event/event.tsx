import React from 'react'
import { Container } from '../event.sty';


const CreateEvent = () => {
  return (
    <Container>CreateEvent</Container>
  )
}

export default CreateEvent;



// import React, { useState, useEffect } from "react";
// import { Button, Modal, Box, Chip, Avatar } from "@mui/material";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Filler } from "chart.js";
// import { baseAPI } from "../../../utils/constants";
// import moment from "moment";
// import axios from "axios";

// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Filler);

// interface Event {
//   name: string;
//   date: string;
//   location: string;
//   description: string;
//   usersParticipated: number;
//   revenue: number;
//   success: string;
//   events: string;
//   data: any;
// }

// const CreateEvent: React.FC = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
//   const [openModal, setOpenModal] = useState<boolean>(false);

//   // Chart Data for selected event
//   const [chartData, setChartData] = useState<any>(null);

//   useEffect(() => {
//     // Fetch events from backend
//     const fetchEvents = async () => {
//       try {
//         // const response = await axios.get<any>(`${baseAPI}/event/events`);
//         const token = localStorage.getItem("token");
//         console.log(token);
        
//         const { data } = await axios.get<any>(`${baseAPI}/event/events`);
//         console.log(data);
//         if (data.success) {
//           setEvents(data.name);
//         }
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   // useEffect(() => {
//   //   const fetchEvents = async () => {
//   //     try {
//   //       const response = await axios.get<any>("http://localhost:8081/event/events");
//   //       // const data = await response.json();
//   //       if (response.data) {
//   //         // setEvents(response);
//   //       }
//   //     } catch (error) {
//   //       console.error("API chaqirig'ida xato:", error);
//   //     }
//   //   };
    

//   //   fetchEvents();
//   // }, []);

//   const handleOpenModal = (event: Event) => {
//     setSelectedEvent(event);
//     setOpenModal(true);
//     // Generate chart data for the selected event
//     const eventData = {
//       labels: ["January", "February", "March", "April", "May", "June", "July"], // Example months
//       datasets: [
//         {
//           label: "Revenue",
//           data: [12, 19, 3, 5, 2, 3, 10], // Example revenue data, replace with actual data
//           fill: true,
//           backgroundColor: "rgba(75,192,192,0.2)",
//           borderColor: "rgba(75,192,192,1)",
//           borderWidth: 1,
//         },
//         {
//           label: "Users Participated",
//           data: [5, 7, 4, 8, 2, 6, 9], // Example user participation data, replace with actual data
//           fill: false,
//           borderColor: "rgba(153,102,255,1)",
//           borderWidth: 1,
//         },
//       ],
//     };
//     setChartData(eventData);
//   };

//   const handleCloseModal = () => setOpenModal(false);

//   return (
//     <div>
//      <div>

//       <button onClick={() => openModal}>event create</button>
//      </div>
//       {events.map((event, index) => (
//         <Button
//           key={index}
//           onClick={() => handleOpenModal(event)}
//           variant="contained"
//           color="primary"
//           style={{ margin: "10px", display: "block" }}
//         >
//           {event.name}
//         </Button>
//       ))}


//       <Modal open={openModal} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 500,
//             height: 400,
//             bgcolor: "background.paper",
//             borderRadius: 1,
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           {selectedEvent && (
//             <>
//               <h2>{selectedEvent.name}</h2>
//               <p><strong>Date:</strong> {moment(selectedEvent.date).format("YYYY-MM-DD")}</p>
//               <p><strong>Location:</strong> {selectedEvent.location}</p>
//               <p><strong>Description:</strong> {selectedEvent.description}</p>
//               <Chip label={`Users Participated: ${selectedEvent.usersParticipated}`} color="primary" />
//               <Chip label={`Revenue: ${selectedEvent.revenue}`} color="secondary" />
              
//               {/* Chart */}
//               {chartData && <Line data={chartData} />}
//             </>
//           )}
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default CreateEvent

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify"; // Xabarlar ko'rsatish uchun
// import "react-toastify/dist/ReactToastify.css"; // Toastni styling qilish uchun
// import { baseAPI } from "../../../utils/constants";

// interface EventType {
//   name: string;
//   date: string;
//   eventLocation: string;
//   description: string;
//   email: string;
// }

// const CreateEvent: React.FC = () => {
//   const [name, setName] = useState<string>('');
//   const [date, setDate] = useState<string>('');
//   const [eventLocation, setEventLocation] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [email, setEmail] = useState<string>(''); 
//   const [data, setData] = useState<EventType | null>(null);

//   const AddEvent = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token"); // Tokenni olish
//     if (!token) {
//       toast.error("Tizimga kirish kerak!");
//       return;
//     }

//     // Kiritilgan ma'lumotlarni tekshirish
//     if (!name || !date || !eventLocation || !description || !email) {
//       toast.error("Iltimos, barcha maydonlarni to'ldiring!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${baseAPI}/event/create`,
//         {
//           name,
//           date,
//           eventLocation,
//           description,
//           email, 
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Tokenni yuborish
//           },
//         }
//       );

//       // setData(response.data.event); // Store the created event data
//       toast.success("Event muvaffaqiyatli yaratildi!");
//       setName('');
//       setDate('');
//       setEventLocation('');
//       setDescription('');
//       setEmail(''); // Reset the email field after submission
//     } catch (error: any) {
//       if (error.response && error.response.data.error.msg) {
//         toast.error(`Xatolik: ${error.response.data.error.msg}`);
//       } else {
//         toast.error("Serverda xatolik yuz berdi!");
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Create Event</h1>
//       <form onSubmit={AddEvent}>
//         <div>
//           <label htmlFor="name">Event Name</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="date">Event Date</label>
//           <input
//             type="date"
//             id="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="eventLocation">Location</label>
//           <input
//             type="text"
//             id="eventLocation"
//             value={eventLocation}
//             onChange={(e) => setEventLocation(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Create Event</button>
//       </form>

//       {data && (
//         <div>
//           <h2>Event Created Successfully</h2>
//           <p><strong>Name:</strong> {data.name}</p>
//           <p><strong>Date:</strong> {new Date(data.date).toLocaleDateString()}</p>
//           <p><strong>Location:</strong> {data.eventLocation}</p>
//           <p><strong>Description:</strong> {data.description}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateEvent;





