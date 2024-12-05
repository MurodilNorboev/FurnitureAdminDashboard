import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import axios from 'axios';
import { baseAPI } from '../../utils/constants';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Add from '@mui/icons-material/Add';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ErrorMessage } from '../../components/styles/style';
import { Todo } from '../../components/types/type';
import OrderList from './OrderList';

export default function OrderTable() {
  const [data, setData] = useState<Todo[]>([]);
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectID, setSelectID] = useState('');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>('');
  ///// pagenation
  const [todosPerPage] = useState(15);
  const totalPages = Math.ceil(data.length / todosPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const currentTodos = data.slice( (currentPage - 1) * todosPerPage,currentPage * todosPerPage );
  /// PDF 
  const [error, setError] = useState<string>('');
  const [selected, setSelected] = useState<string[]>([]);
  

  const openModal = (image: string) => { // image modal
    setIsModalOpen(true);
    setModalImage(image);
  };
  const closeModal = (e: React.MouseEvent) => { // image modal
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setModalImage('');
    }
  };
  const getTodo = async () => { // barcha todolar
    try {
      const response = await axios.get<{ data: Todo[] }>(`${baseAPI}/todo/get-all`);
      setData(response.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error?.msg || 'Ma\'lumotlarni olishda xatolik yuz berdi.');
    }
  };
  const getSearch = async () => { // todo search
    try {
      const { data } = await axios.get<{ success: boolean; data: Todo[] }>(
        `${baseAPI}/todo/get-all`,
        { params: { search } }
      );
      if (data.success) {
        setData(data.data); // Natijalarni holatda saqlaymiz
      } else {
        toast.error('Qidiruv bo‘yicha hech narsa topilmadi.');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error?.msg || 'Xatolik yuz berdi.');
    }
  };
  useEffect(() => { // profile/ user login qilganini tekshirish 
    const getProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${baseAPI}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    getProfile();
    getTodo();
  }, []);
  const addTodo = async (e: React.FormEvent) => { // todo add qilish
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const todoData = { title, desc, image };

      if (!selectID) {
        const { data } = await axios.post<any>(
          `${baseAPI}/todo/add`,
          todoData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          setIsOpen(false);
          getTodo();
          setTitle('');
          setDesc('');
          setImage('');
        }
      } else {
        const { data } = await axios.put<any>(
          `${baseAPI}/todo/edit/${selectID}`,
          todoData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          setIsOpen(false);
          getTodo();
          setTitle('');
          setDesc('');
          setSelectID('');
          setImage('');
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error?.msg || 'Xatolik yuz berdi.');
    }
  };
  const DeleteTodo = async (id: string) => { // todo ni delet qilish
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.delete<any>(`${baseAPI}/todo/delete/` + id, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        getTodo();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error?.msg || 'Xatolik yuz berdi.');
    }
  };
  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => { // imagni yuklash
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.post<any>(`${baseAPI}/upload/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setImage(data.file_path);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error?.msg || 'Fayl yuklashda xatolik yuz berdi.');
    }
  };
  useEffect(() => {
    if (search.trim()) {
      getSearch();
    } else {
      getTodo();
    }
  }, [search]);

  ///// pagenation functon
  const handlePagination = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
    /// PDF 
  const handleDownloadPDF = () => {
      if (selected.length === 0) {
        setError('No selected!');
        setTimeout(() => {
          setError('')
        }, 2000);
        return;
      }
  
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  
      doc.setFontSize(30);
      doc.text('Furniture', 140, 20, { align: 'center' });
  
      const headers = ['Title', 'Description', 'Image URL', 'Date', 'ID'];
  
      const rows = selected
        .map((id, ind) => {
          const todo = data.find((item) => item._id === id);
          return todo ? [todo.title, todo.desc, todo.image, todo.sana, todo._id] : [];
        })
        .filter((row) => row.length > 0);
  
      autoTable(doc,{
        head: [headers], 
        body: rows, 
        startY: 30, 
        bodyStyles: {
          lineWidth: 0.1, 
          lineColor: [0, 0, 0], 
          textColor: [0, 0, 0], 
          fillColor: '#FFF',
        },
        headStyles: {
          fillColor: '#395cf8', 
          textColor: [255, 255, 255],
          fontSize: 12, 
          halign: 'center',
        },
        tableId: '#FFF',
        tableLineColor: [0, 0, 0], 
        tableLineWidth: 0.1,
      });
      
      doc.save('table.pdf'); 
      doc.save('todos.pdf');
      setSelected([]);
  };
  // Checkbox
  const handleCheckboxChange = (_id: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(_id)
        ? prevSelected.filter((selectedId) => selectedId !== _id)
        : [...prevSelected, _id]
    );
  };
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = data.map((todo) => todo._id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };
  
  return (
    <React.Fragment>

      {isOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
          style={{
            position: "fixed",
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'center',  
            alignItems: 'center',     
          }}
        >
          <form
            onSubmit={addTodo}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '300px', 
            }}
          >
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="title"
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
              }}
            />
            <input
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              type="text"
              placeholder="desc"
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
              }}
            />
            <input
              type="file"
              onChange={uploadFile}
              style={{
                width: '100%',
                marginBottom: '10px',
              }}
            />
            <div
            >
              <Button 
                type="submit" 
                variant="soft" 
                disabled={!image} 
                style={{
                  width: "100%", 
                  color: !image ? "#e4e4e4f8" : "white", 
                  backgroundColor: !image ? "#4984e3f8" : "#0051d3e7"  
                }}
              >
                {selectID ? "Edit" : "Add"}
              </Button>
            </div>

          </form>
        </div>
      )}
    
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          
          <div style={{display:"flex",width:"100%",justifyContent:"space-between",alignItems:"center"}}>
            <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />}  
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{width: '220px' }}
            />
            <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
            <div style={{marginBottom:"-10px"}}>
               {error && <ErrorMessage>{error}</ErrorMessage>}
            </div>
             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
               <Button onClick={handleDownloadPDF} sx={{width:"150px"}}>Download PDF</Button>
             </Box>
            {user && (
               <Button 
               variant="outlined"
               startDecorator={<Add />}
               onClick={() => {
                setIsOpen(true);
                setSelectID('');
                setTitle('');
                setDesc('');
                setImage('');
              }}
              style={{ width: '150px' }}> 
              Add Cart
                </Button>
            )}
            </div>

          </div>
        </FormControl>
      </Box>

      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
          height:"100vw",
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
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
                  onChange={handleSelectAll}
                  size="sm"
                  color="primary"
                  checked={currentTodos.every((todo) => selected.includes(todo._id))} 
                  indeterminate={
                    currentTodos.some((todo) => selected.includes(todo._id)) &&
                    !currentTodos.every((todo) => selected.includes(todo._id))
                  } 
                />
              </th>
              <th style={{ width: 120, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                >
                  id
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>title</th>
              <th style={{ width: 140, padding: '12px 6px' }}>desc</th>
              <th style={{ width: 140, padding: '12px 6px' }}>img</th>
              <th style={{ width: 140, padding: '12px 6px' }}>date</th>
              <th style={{ width: 140, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
              {currentTodos.length > 0 ? (
                currentTodos.map((row, ind) => (
                  <tr key={ind}>
                    <td style={{ textAlign: 'center' }}>
                      <Checkbox
                        size="sm"
                        onChange={() => handleCheckboxChange(row._id)}
                        checked={selected.includes(row._id)}
                      />
                    </td>
                    <td style={{ overflow: 'scroll' }}>
                      <Typography level="body-xs">{(currentPage - 1) * todosPerPage + ind + 1}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.title}</Typography>
                    </td>
                    <td>{row.desc}</td>
                    <td>
                      <img
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '5px',
                          marginBottom: '-5px',
                        }}
                        onClick={() => openModal(row.image)}
                        src={row.image}
                        alt="image"
                      />
                    </td>
                    <td>{row.sana}</td>
                    <td>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Dropdown>
                          <MenuButton
                            slots={{ root: IconButton }}
                            slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                          >
                            <MoreHorizRoundedIcon />
                          </MenuButton>
                          <Menu size="sm" sx={{ minWidth: 140 }}>
                            <MenuItem
                              onClick={() => {
                                setSelectID(row._id);
                                setIsOpen(true);
                                setTitle(row.title);
                                setDesc(row.desc);
                                setImage(row.image);
                              }}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem>Move</MenuItem>
                            <Divider />
                            <MenuItem color="danger" onClick={() => DeleteTodo(row._id)}>
                              Delete
                            </MenuItem>
                          </Menu>
                        </Dropdown>
                      </Box>
                    </td>
                  </tr>
                ))
              ) 
                : 
              (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                    <Typography>No search results found</Typography>
                  </td>
                </tr>
              )
              }
          </tbody>

        </Table>
      </Sheet>

        {isModalOpen && (
          <div
            id="myModal"
            onClick={closeModal}
            style={{
              position: 'fixed',
              zIndex: 99999,
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}
            >
            <span
              style={{
                position: 'absolute',
                top: '15px',
                right: '35px',
                color: '#f1f1f1',
                fontSize: '40px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={closeModal}
            >
              &times;
            </span>
            <img
              src={modalImage}
              alt="Modal Tasvir"
              style={{
                borderRadius:"20px",
                margin:"30% 20% 30% 20%",
                display:"block",
                maxWidth: '800px',
                maxHeight:"600px",
                width: '100vw',
                height:"100vw",
              }}
            />
          </div>
        )}

         <Box
          className="Pagination-laptopUp"
          sx={{
            pt: 2,
            gap: 1,
            [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            startDecorator={<KeyboardArrowLeftIcon />}
            onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}
          >
            Previous
          </Button>
  
          <Box sx={{ flex: 1 }} />
            {['1'].map((page, ind) => (
              <React.Fragment key={ind}> 
                <IconButton
                    size="sm"
                    variant={Number(page) ? 'outlined' : 'plain'}
                    color="neutral"
                  >
                    {currentPage}
                  </IconButton>
                  <IconButton
                    size="sm"
                    variant={Number(page) ? 'outlined' : 'plain'}
                    color="neutral"
                  >
                    {totalPages}
                </IconButton>
              </React.Fragment>
            ))}
          <Box sx={{ flex: 1 }} />
  
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            endDecorator={<KeyboardArrowRightIcon />}
            onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Box>
        <OrderList />
    </React.Fragment>
  )
}