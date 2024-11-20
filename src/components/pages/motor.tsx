import '../test/styke.css';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import MotorDOWN from '../download/motorDOWN';

import { CampcarMoto } from '../types/data';
import { CampcarMotos } from '../mock/mockdatail';

const MotorComponent: React.FC = () => {
  const [data, setData] = useState<CampcarMoto[]>(CampcarMotos);
  const [selected, setSelected] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();




  const handleCheckboxChange = (id: number) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDownloadPDF = () => {
    if (selected.length === 0) {
      setError('No selected!');
      setTimeout(() => {
        setError(null);
      }, 1000);
      return;
    }

    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    doc.setFontSize(30);
    doc.text('Motor', 140, 20, { align: 'center' });

    const headers = ['Car Name', 'Year', 'Location', 'Brand', 'People', 'Rate'];
    const rows = selected.map((id) => {
      const row = data.find((item) => item.id === id);
      return row ? [
        row.CarName,
        row.Dates,
        row.company,
        row.BrandName,
        row.place,
        row.Viewed
      ] : [];
    }).filter(row => row.length > 0);

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 30,
      styles: {
        halign: 'center',
        cellPadding: 2,
        fontSize: 10,
        lineColor: [0, 0, 0],
        lineWidth: 0.2,
        fillColor: [255, 255, 255],
      },
      headStyles: {
        fillColor: [0, 109, 186],
        textColor: [255, 255, 255],
      },
      theme: 'grid',
      margin: { left: 10, right: 10 },
    });

    doc.save('selected_rows.pdf');
    setSelected([]);
    setError(null);
  };

  const deleteCar = (id: number) => {
    setData((prevData) => prevData.filter((car) => car.id !== id));
  };

  const handleRowClick = (motorId: number) => {
    navigate(`/omaterial/motor/${motorId}`);
  };

  return (
    <>
      <Box sx={{ alignItems: "center", display: 'flex', mb: 1, gap: 1, justifyContent: 'space-between' }}>
        <Typography level="h2">Motor</Typography>
        <Box sx={{ display: 'flex', gap: 1, py: 2 }}>
          {error && <Typography color="danger">{error}</Typography>}
          <div style={{ display: "flex", gap: "20px" }}>
            <Button onClick={handleDownloadPDF}>Download PDF</Button>
            <MotorDOWN onAdd={(newCar) => setData((prev) => [...prev, newCar])} /> {/* onAdd propini berish */}
          </div>
        </Box>
      </Box>

      <Sheet variant="outlined" sx={{ width: '100%', borderRadius: 'sm', overflow: 'auto' }}>
        <Table stickyHeader hoverRow>
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: 'center' }}>
                <Checkbox
                  size="sm"
                  indeterminate={selected.length > 0 && selected.length !== data.length}
                  checked={selected.length === data.length}
                  onChange={(event) => {
                    setSelected(event.target.checked ? data.map((row) => row.id) : []);
                  }}
                  color={selected.length > 0 ? 'primary' : undefined}
                />
              </th>
              <th>Car Name</th>
              <th>Year</th>
              <th>Location</th>
              <th>Brand</th>
              <th>People</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center' }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </td>
                <td><Typography level="body-xs">{row.CarName}</Typography></td>
                <td><Typography level="body-xs">{row.Dates}</Typography></td>
                <td><Typography level="body-xs">{row.company}</Typography></td>
                <td><Typography level="body-xs">{row.BrandName}</Typography></td>
                <td><Typography level="body-xs">{row.place}</Typography></td>
                <td><Typography level="body-xs">{row.Viewed}</Typography></td>
                <td onClick={() => handleRowClick(row.id)}><Typography level="body-xs"><IconButton>info</IconButton></Typography></td>
                <td>
                  <IconButton onClick={() => deleteCar(row.id)} color="danger">
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
};

export default MotorComponent;




