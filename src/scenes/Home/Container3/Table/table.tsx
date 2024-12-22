import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Table from '@mui/joy/Table';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Container3 } from '../../all.Styles';
import Tooltip from '@mui/joy/Tooltip';

export const rows = [
  {
    id: 'INV-1234',
    date: 'Dec 22, 2024',
    status: 'Paid',
    customer: {
      initial: 'J',
      name: 'John Doe',
      email: 'john.doe@email.com',
    },
    eventCount: 50,
    dailyData: [
      { day: '2024-12-01', value: 12 },
      { day: '2024-12-02', value: 20 },
      { day: '2024-12-03', value: 30 },
      { day: '2024-12-04', value: 40 },
      { day: '2024-12-05', value: 35 },
      { day: '2024-12-06', value: 50 },
      { day: '2024-12-07', value: 60 },
      { day: '2024-12-08', value: 20 },
      { day: '2024-12-09', value: 10 },
      { day: '2024-12-10', value: 5 },
      { day: '2024-12-11', value: 15 },
      { day: '2024-12-12', value: 25 },
      { day: '2024-12-13', value: 30 },
      { day: '2024-12-14', value: 35 },
      { day: '2024-12-15', value: 40 },
      { day: '2024-12-16', value: 45 },
      { day: '2024-12-17', value: 50 },
      { day: '2024-12-18', value: 60 },
      { day: '2024-12-19', value: 70 },
      { day: '2024-12-20', value: 80 },
      { day: '2024-12-21', value: 85 },
      { day: '2024-12-22', value: 90 }, // today
    ]
  },
  {
    id: 'INV-1235',
    date: 'Dec 21, 2024',
    status: 'Refunded',
    customer: {
      initial: 'A',
      name: 'Alice Smith',
      email: 'alice.smith@email.com',
    },
    eventCount: 60,
    dailyData: [
      { day: '2024-12-01', value: 20 },
      { day: '2024-12-02', value: 15 },
      { day: '2024-12-03', value: 35 },
      { day: '2024-12-04', value: 25 },
      { day: '2024-12-05', value: 30 },
      { day: '2024-12-06', value: 40 },
      { day: '2024-12-07', value: 50 },
      { day: '2024-12-08', value: 60 },
      { day: '2024-12-09', value: 40 },
      { day: '2024-12-10', value: 45 },
      { day: '2024-12-11', value: 35 },
      { day: '2024-12-12', value: 30 },
      { day: '2024-12-13', value: 20 },
      { day: '2024-12-14', value: 25 },
      { day: '2024-12-15', value: 40 },
      { day: '2024-12-16', value: 50 },
      { day: '2024-12-17', value: 60 },
      { day: '2024-12-18', value: 30 },
      { day: '2024-12-19', value: 35 },
      { day: '2024-12-20', value: 45 },
      { day: '2024-12-21', value: 50 }, // yesterday
    ]
  },
  {
    id: 'INV-1236',
    date: 'Dec 20, 2024',
    status: 'Paid',
    customer: {
      initial: 'M',
      name: 'Mark Johnson',
      email: 'mark.johnson@email.com',
    },
    eventCount: 70,
    dailyData: [
      { day: '2024-12-01', value: 5 },
      { day: '2024-12-02', value: 10 },
      { day: '2024-12-03', value: 15 },
      { day: '2024-12-04', value: 20 },
      { day: '2024-12-05', value: 30 },
      { day: '2024-12-06', value: 35 },
      { day: '2024-12-07', value: 40 },
      { day: '2024-12-08', value: 50 },
      { day: '2024-12-09', value: 55 },
      { day: '2024-12-10', value: 60 },
      { day: '2024-12-11', value: 45 },
      { day: '2024-12-12', value: 35 },
      { day: '2024-12-13', value: 40 },
      { day: '2024-12-14', value: 45 },
      { day: '2024-12-15', value: 50 },
      { day: '2024-12-16', value: 55 },
      { day: '2024-12-17', value: 60 },
      { day: '2024-12-18', value: 65 },
      { day: '2024-12-19', value: 70 },
      { day: '2024-12-20', value: 75 }, // yesterday
    ]
  },
  {
    id: 'INV-1237',
    date: 'Dec 19, 2024',
    status: 'Cancelled',
    customer: {
      initial: 'E',
      name: 'Emma Watson',
      email: 'emma.watson@email.com',
    },
    eventCount: 80,
    dailyData: [
      { day: '2024-12-01', value: 12 },
      { day: '2024-12-02', value: 14 },
      { day: '2024-12-03', value: 16 },
      { day: '2024-12-04', value: 20 },
      { day: '2024-12-05', value: 18 },
      { day: '2024-12-06', value: 22 },
      { day: '2024-12-07', value: 25 },
      { day: '2024-12-08', value: 30 },
      { day: '2024-12-09', value: 33 },
      { day: '2024-12-10', value: 40 },
      { day: '2024-12-11', value: 45 },
      { day: '2024-12-12', value: 50 },
      { day: '2024-12-13', value: 55 },
      { day: '2024-12-14', value: 60 },
      { day: '2024-12-15', value: 65 },
      { day: '2024-12-16', value: 70 },
      { day: '2024-12-17', value: 75 },
      { day: '2024-12-18', value: 80 },
      { day: '2024-12-19', value: 85 }, // yesterday
    ]
  },
  {
    id: 'INV-1238',
    date: 'Dec 18, 2024',
    status: 'Paid',
    customer: {
      initial: 'P',
      name: 'Paul Brown',
      email: 'paul.brown@email.com',
    },
    eventCount: 90,
    dailyData: [
      { day: '2024-12-01', value: 20 },
      { day: '2024-12-02', value: 25 },
      { day: '2024-12-03', value: 30 },
      { day: '2024-12-04', value: 35 },
      { day: '2024-12-05', value: 40 },
      { day: '2024-12-06', value: 45 },
      { day: '2024-12-07', value: 50 },
      { day: '2024-12-08', value: 55 },
      { day: '2024-12-09', value: 60 },
      { day: '2024-12-10', value: 65 },
      { day: '2024-12-11', value: 70 },
      { day: '2024-12-12', value: 75 },
      { day: '2024-12-13', value: 80 },
      { day: '2024-12-14', value: 85 },
      { day: '2024-12-15', value: 90 },
      { day: '2024-12-16', value: 95 },
      { day: '2024-12-17', value: 100 },
      { day: '2024-12-18', value: 110 }, // today
    ]
  },
  {
    id: 'INV-1239',
    date: 'Dec 17, 2024',
    status: 'Paid',
    customer: {
      initial: 'L',
      name: 'Liam Green',
      email: 'liam.green@email.com',
    },
    eventCount: 100,
    dailyData: [
      { day: '2024-12-01', value: 5 },
      { day: '2024-12-02', value: 10 },
      { day: '2024-12-03', value: 15 },
      { day: '2024-12-04', value: 20 },
      { day: '2024-12-05', value: 25 },
      { day: '2024-12-06', value: 30 },
      { day: '2024-12-07', value: 35 },
      { day: '2024-12-08', value: 40 },
      { day: '2024-12-09', value: 45 },
      { day: '2024-12-10', value: 50 },
      { day: '2024-12-11', value: 55 },
      { day: '2024-12-12', value: 60 },
      { day: '2024-12-13', value: 65 },
      { day: '2024-12-14', value: 70 },
      { day: '2024-12-15', value: 75 },
      { day: '2024-12-16', value: 80 },
      { day: '2024-12-17', value: 85 }, // today
    ]
  },
  {
    id: 'INV-1240',
    date: 'Dec 16, 2024',
    status: 'Refunded',
    customer: {
      initial: 'K',
      name: 'Kara West',
      email: 'kara.west@email.com',
    },
    eventCount: 110,
    dailyData: [
      { day: '2024-12-01', value: 10 },
      { day: '2024-12-02', value: 15 },
      { day: '2024-12-03', value: 20 },
      { day: '2024-12-04', value: 25 },
      { day: '2024-12-05', value: 30 },
      { day: '2024-12-06', value: 35 },
      { day: '2024-12-07', value: 40 },
      { day: '2024-12-08', value: 45 },
      { day: '2024-12-09', value: 50 },
      { day: '2024-12-10', value: 55 },
      { day: '2024-12-11', value: 60 },
      { day: '2024-12-12', value: 65 },
      { day: '2024-12-13', value: 70 },
      { day: '2024-12-14', value: 75 },
      { day: '2024-12-15', value: 80 },
      { day: '2024-12-16', value: 85 }, // today
    ]
  },
  {
    id: 'INV-1241',
    date: 'Dec 15, 2024',
    status: 'Paid',
    customer: {
      initial: 'T',
      name: 'Tina Brown',
      email: 'tina.brown@email.com',
    },
    eventCount: 120,
    dailyData: [
      { day: '2024-12-01', value: 5 },
      { day: '2024-12-02', value: 10 },
      { day: '2024-12-03', value: 15 },
      { day: '2024-12-04', value: 20 },
      { day: '2024-12-05', value: 25 },
      { day: '2024-12-06', value: 30 },
      { day: '2024-12-07', value: 35 },
      { day: '2024-12-08', value: 40 },
      { day: '2024-12-09', value: 45 },
      { day: '2024-12-10', value: 50 },
      { day: '2024-12-11', value: 55 },
      { day: '2024-12-12', value: 60 },
      { day: '2024-12-13', value: 65 },
      { day: '2024-12-14', value: 70 },
      { day: '2024-12-15', value: 75 }, // today
    ]
  },
  {
    id: 'INV-1242',
    date: 'Dec 14, 2024',
    status: 'Cancelled',
    customer: {
      initial: 'R',
      name: 'Rachel Green',
      email: 'rachel.green@email.com',
    },
    eventCount: 130,
    dailyData: [
      { day: '2024-12-01', value: 12 },
      { day: '2024-12-02', value: 14 },
      { day: '2024-12-03', value: 16 },
      { day: '2024-12-04', value: 18 },
      { day: '2024-12-05', value: 20 },
      { day: '2024-12-06', value: 22 },
      { day: '2024-12-07', value: 24 },
      { day: '2024-12-08', value: 26 },
      { day: '2024-12-09', value: 28 },
      { day: '2024-12-10', value: 30 },
      { day: '2024-12-11', value: 32 },
      { day: '2024-12-12', value: 34 },
      { day: '2024-12-13', value: 36 },
      { day: '2024-12-14', value: 38 }, // today
    ]
  },
  {
    id: 'INV-1243',
    date: 'Dec 13, 2024',
    status: 'Refunded',
    customer: {
      initial: 'S',
      name: 'Sam White',
      email: 'sam.white@email.com',
    },
    eventCount: 140,
    dailyData: [
      { day: '2024-12-01', value: 20 },
      { day: '2024-12-02', value: 25 },
      { day: '2024-12-03', value: 30 },
      { day: '2024-12-04', value: 35 },
      { day: '2024-12-05', value: 40 },
      { day: '2024-12-06', value: 45 },
      { day: '2024-12-07', value: 50 },
      { day: '2024-12-08', value: 55 },
      { day: '2024-12-09', value: 60 },
      { day: '2024-12-10', value: 65 },
      { day: '2024-12-11', value: 70 },
      { day: '2024-12-12', value: 75 },
      { day: '2024-12-13', value: 80 }, // today
    ]
  },
  {
    id: 'INV-1244',
    date: 'Dec 12, 2024',
    status: 'Paid',
    customer: {
      initial: 'D',
      name: 'David Black',
      email: 'david.black@email.com',
    },
    eventCount: 150,
    dailyData: [
      { day: '2024-12-01', value: 30 },
      { day: '2024-12-02', value: 35 },
      { day: '2024-12-03', value: 40 },
      { day: '2024-12-04', value: 45 },
      { day: '2024-12-05', value: 50 },
      { day: '2024-12-06', value: 55 },
      { day: '2024-12-07', value: 60 },
      { day: '2024-12-08', value: 65 },
      { day: '2024-12-09', value: 70 },
      { day: '2024-12-10', value: 75 },
      { day: '2024-12-11', value: 80 },
      { day: '2024-12-12', value: 85 }, // today
    ]
  },
  {
    id: 'INV-1245',
    date: 'Dec 11, 2024',
    status: 'Paid',
    customer: {
      initial: 'B',
      name: 'Ben Clark',
      email: 'ben.clark@email.com',
    },
    eventCount: 160,
    dailyData: [
      { day: '2024-12-01', value: 40 },
      { day: '2024-12-02', value: 45 },
      { day: '2024-12-03', value: 50 },
      { day: '2024-12-04', value: 55 },
      { day: '2024-12-05', value: 60 },
      { day: '2024-12-06', value: 65 },
      { day: '2024-12-07', value: 70 },
      { day: '2024-12-08', value: 75 },
      { day: '2024-12-09', value: 80 },
      { day: '2024-12-10', value: 85 },
      { day: '2024-12-11', value: 90 }, // today
    ]
  },
  {
    id: 'INV-1246',
    date: 'Dec 10, 2024',
    status: 'Cancelled',
    customer: {
      initial: 'J',
      name: 'Jessica Lee',
      email: 'jessica.lee@email.com',
    },
    eventCount: 170,
    dailyData: [
      { day: '2024-12-01', value: 10 },
      { day: '2024-12-02', value: 15 },
      { day: '2024-12-03', value: 20 },
      { day: '2024-12-04', value: 25 },
      { day: '2024-12-05', value: 30 },
      { day: '2024-12-06', value: 35 },
      { day: '2024-12-07', value: 40 },
      { day: '2024-12-08', value: 45 },
      { day: '2024-12-09', value: 50 },
      { day: '2024-12-10', value: 55 }, // today
    ]
  }
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
type Order = 'asc' | 'desc';
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function OrderTable() {
  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 17;

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedRows = [...rows].sort(getComparator(order, 'id')).slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <Container3>
      <div style={{overflowY: "hidden",height:"100%"}}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            width: "100%",
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                <Checkbox
                  size="sm"
                  indeterminate={selected.length > 0 && selected.length !== rows.length}
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : [],
                    );
                  }}
                  color={selected.length > 0 || selected.length === rows.length ? 'primary' : undefined}
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th style={{ width: 120, padding: '12px 6px' }}>Page Title</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Status</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Users</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Event Counts</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Views per User</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Average Time</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Daily Conversions</th>
              <th style={{ width: 120, padding: '12px 6px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? 'primary' : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id),
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Paid: <CheckRoundedIcon />,
                        Refunded: <AutorenewRoundedIcon />,
                        Cancelled: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        Paid: 'success',
                        Refunded: 'neutral',
                        Cancelled: 'danger',
                      }[row.status] as ColorPaletteProp
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Typography level="body-xs">{row.customer.name}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.eventCount}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">50</Typography>
                </td>
                <td>
                  <Typography level="body-xs">30 mins</Typography>
                </td>
                <td>
                  <Typography level="body-xs">10</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex',justifyContent:"end", flexDirection: 'row', gap: 0.10, alignItems: 'flex-end', height: '100%', width: 'auto' }}>
                    {row.dailyData.map((data, index) => (
                      <Tooltip key={index} title={`Date: ${data.day}, ${data.value}%`} arrow>
                        <Box
                          sx={{
                            height: '100%',
                            maxWidth: "4px",
                            width: "100vw",
                            backgroundColor: 'darkblue',
                            borderRadius: '0px',
                            flex: 1,
                            maxHeight: `${data.value}%`,
                            transition: 'all 0.3s ease-in-out',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
                            '&:hover': {
                              backgroundColor: 'lightblue', 
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)', 
                            },
                          }}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </div>

      <Box
        className="Pagination-laptopUp"
        sx={{
          position: "relative",
          justifyContent: "center",
          bottom: 60,
          left: 0,
          right: 0,
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <div style={{ display: "flex", alignContent: 'center', gap: "10px" }}>
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            startDecorator={<KeyboardArrowLeftIcon />}
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            sx={{ width: "100px" }}
          >
            Previous
          </Button>
          <Box sx={{ flex: 1 }} />
          {[...Array(Math.ceil(rows.length / rowsPerPage))].map((_, index) => (
            <IconButton
              key={index}
              size="sm"
              variant={currentPage === index + 1 ? 'outlined' : 'plain'}
              color="neutral"
              onClick={() => handleChangePage(index + 1)}
            >
              {index + 1}
            </IconButton>
          ))}
          <Box sx={{ flex: 1 }} />
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            endDecorator={<KeyboardArrowRightIcon />}
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === Math.ceil(rows.length / rowsPerPage)}
            sx={{ width: "100px" }}
          >
            Next
          </Button>
        </div>
      </Box>
    </Container3>
  );
}
