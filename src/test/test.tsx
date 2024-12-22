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
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Add from '@mui/icons-material/Add';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ErrorMessage } from '../components/styles/style';
import { Todo } from '../components/types/type';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { baseAPI } from '../utils/constants';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { SelectChangeEvent } from '@mui/material/Select'; 

const TYPES = ["products", "textils", "tables"];

export default function OrderTable() {
  const [type, setType] = useState<string>("products");
  const [formData, setFormData] = useState<any>({});
  const [fields, setFields] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [selectID, setSelectID] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>('');
  const [viewItem, setViewItem] = useState<any | null>(null);
  ///// pagenation
  const [todosPerPage] = useState(15);
  const totalPages = Math.ceil(data.length / todosPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const currentTodos = data.slice( (currentPage - 1) * todosPerPage,currentPage * todosPerPage );
  /// PDF 
  const [error, setError] = useState<string>('');
  const [selected, setSelected] = useState<string[]>([]);

  const handleView = (id: string) => {
   const selectedItem = data.find((item) => item._id === id);
   if (selectedItem) {
     setViewItem(selectedItem); 
   }
  };

  const handleTypeChange = (newType: string | null) => {
    if (newType) {
      setType(newType); // Update the type only if it's not null
    }
    setFormData({});
    setSelectID(null); // Clear selectID when the type is changed
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  useEffect(() => {
    fetchData();
  }, [type, search]); 
  const openModal = (image: string) => { // image modal
    setIsModalOpen(true);
    setModalImage(image);
  };
  const closeModal = (e: React.MouseEvent) => { // image modal
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setModalImage('');
      setViewItem(null);
    }
  };
  const fetchData = async () => {
    try {
      const res = await axios.get<any>(`${baseAPI}/product/${type}/all`, {
        params: { search }, // search parametrini yuborish
      });
      setData(res.data.data);

      if (res.data.data.length > 0) {
        const keys = Object.keys(res.data.data[0]).filter(
          (key) => key !== "_id" && key !== "sana" && key !== "yangilanish"
        );
        setFields(keys);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
    // getTodo();
  }, []);
  const handleSubmit = async () => { // add qilish
    const token = localStorage.getItem("token");
    console.log("Form ma'lumotlari yuborilmoqda:", formData);

    try {
      if (!selectID) {
        // Yangi element qo'shish
        const { data } = await axios.post<any>(
          `${baseAPI}/product/${type}/add`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          fetchData();
          setFormData({});
          toast.success("Item added successfully");
          console.log("Form ma'lumotlari muvaffaqiyatli yuborildi.");
        }
      } else {
        // Tahrirlash
        const { data } = await axios.put<any>(
          `${baseAPI}/product/${type}/edit/${selectID}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          fetchData();
          setFormData({});
          setSelectID(null); // Editdan keyin selectID ni tozalash
          toast.success("Item updated successfully");
          console.log("Form ma'lumotlari muvaffaqiyatli yangilandi.");
        }
      }
    } catch (error: any) {
      console.error("Xatolik yuz berdi:", error);
      toast.error(error.response?.data?.error?.msg || "Xatolik yuz berdi.");
    }
  };
  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.log(`${fieldName} fayli tanlanmagan.`);
      return;
    }

    const formData = new FormData();
    formData.append(fieldName, e.target.files[0]);

    const token = localStorage.getItem("token");
    try {
      console.log(`Yuklash jarayoni: ${fieldName} fayli yuborilmoqda...`);
      const { data } = await axios.post<any>(`${baseAPI}/upload/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Yuklash tugadi: ${fieldName}`);
      if (data.success) {
        setFormData((prev: any) => ({
          ...prev,
          [fieldName]: data.filePaths[0],
        }));
        toast.success(`${fieldName} uploaded successfully`);
      }
    } catch (error: any) {
      console.error(`${fieldName} fayl yuklashda xatolik:`, error);
      toast.error(error.response?.data?.error?.msg || "Fayl yuklashda xatolik yuz berdi.");
    }
  };
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.delete<any>(
        `${baseAPI}/product/${type}/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        fetchData();
        toast.success("Item deleted successfully");
        console.log("Element muvaffaqiyatli o'chirildi.");
      }
    } catch (error: any) {
      console.error("Xatolik yuz berdi:", error);
      toast.error(error.response?.data?.error?.msg || "Xatolik yuz berdi.");
    }
  };
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

      <Box sx={{ display: 'flex', alignItems: 'center',position:"fixed", top: 30 }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none"
            color="neutral"
            href="#some-link"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
            Dashboard
          </Typography>
        </Breadcrumbs>
      </Box>

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
       <div>
         <h2>{selectID ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}</h2>
         {fields.map((field) => (
          <div key={field}>
            {field === "image" || field === "image1" ? (
              <>
                <input
                  type="file"
                  onChange={(e) => uploadFile(e, field)}
                />
                <p>{field}: {formData[field]}</p>
              </>
            ) : (
              <input
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field] || ""}
                onChange={(e) => handleChange(e, field)}
              />
            )}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>
        {selectID ? "Update Item" : "Add Item"}
      </button>
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
          <div style={{display: "flex", gap: "20px"}}>
            <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />}  
            type="search"
            value={search}
            onChange={handleSearchChange}
            style={{width: '220px' }}
            />
            <Select
              placeholder="Select a pet…"
              indicator={<KeyboardArrowDown />}
              onChange={(event: any, value: string | null) => {
                handleTypeChange(value); 
              }} 
              value={type}
              sx={{
                width: 240,
                [`& .${selectClasses.indicator}`]: {
                  transition: '0.2s',
                  [`&.${selectClasses.expanded}`]: {
                    transform: 'rotate(-180deg)',
                  },
                },
              }}
            >
              {TYPES.map((t) => (
                  <Option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Option>
              ))}
            </Select>
          </div>

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
              <th style={{ width: 150, padding: '12px 6px' }}>date</th>
              <th style={{ width: 80, padding: '12px 6px' }}></th>
              <th style={{ width: 100, padding: '12px 6px' }}>info</th>
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
                              }}
                            >
                              Edit
                            </MenuItem>
                            <Divider />
                            <MenuItem color="danger" onClick={() => handleDelete(row._id)}>
                              Delete
                            </MenuItem>
                          </Menu>
                        </Dropdown>
                      </Box>
                    </td>
                    <td>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Link 
                          onClick={() => handleView(row._id)}
                          level="body-xs" 
                          component="button">
                          View
                        </Link>
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
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
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
                margin:"30px 20px",
                width:"100%",
                height:"100%",
                display:"block",
                maxWidth: '800px',
                maxHeight:"600px",
              }}
            />
          </div>
        )}

      {viewItem && (
        <div className="modal">
          <div className="modal-content">
            <h2>{viewItem.title}</h2>
            <p>{viewItem.desc}</p>
            <img
              src={viewItem.image?.replace("http://https://", "https://")}
              alt={viewItem.title}
              style={{ width: "200px", height: "auto" }}
            />
            <button onClick={closeModal}>Close</button>
          </div>
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
    </React.Fragment>
  )
}
