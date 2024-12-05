// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { baseAPI } from "../utils/constants";

// // Ma'lumotlar uchun interfeys yaratish
// interface Todo {
//   title: string;
//   [key: string]: any; // Agar boshqa qo'shimcha maydonlar ham bo'lsa
// }

// const Test = () => {
//   const [datas, setDatas] = useState<Todo[]>([]); // Aniq typeni belgilang

//   const getTodo = async () => {
//     try {
//       const { data } = await axios.get<{ data: Todo[] }>(`${baseAPI}/todo/get-all`);
//       setDatas(data.data); // To'g'ri struktura
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getTodo();
//   }, []);

//   return (
//     <div>
//       {datas.map((val: Todo, ind: number) => (
//         <div key={ind}>
//           <h5>{val.title} ~ {val.title}</h5>
//           </div>
//       ))}
//     </div>
//   );
// };

// export default Test;

import React, { useState } from "react";
import styled from "styled-components";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface DataRow {
  id: number;
  name: string;
  age: number;
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }
`;

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #395cf8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2c49d8;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const App: React.FC = () => {
  const initialData: DataRow[] = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
    { id: 3, name: "Alice Brown", age: 28 },
  ];

  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(data.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const isAllSelected = selectedRows.length === data.length;

  const handleDownloadPDF = () => {
    if (selectedRows.length === 0) {
      setError("No rows selected!");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    doc.setFontSize(20);
    doc.text("Selected Data Table", 140, 20, { align: "center" });

    const headers = ["ID", "Name", "Age"];
    const rows = selectedRows.map(id => {
      const row = data.find(item => item.id === id);
      return row ? [row.id, row.name, row.age] : [];
    });

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 30,
      headStyles: {
        fillColor: "#395cf8",
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        fillColor: "#FFF",
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
    });

    doc.save("table.pdf");
    setSelectedRows([]);
  };

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleSelectRow(row.id)}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.age}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      <StyledButton onClick={handleDownloadPDF}>Download PDF</StyledButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default App;