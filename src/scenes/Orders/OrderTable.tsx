import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Add from "@mui/icons-material/Add";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ErrorMessage } from "../../components/styles/style";
import { baseAPI } from "../../utils/constants";
import {
  Buttonn,
  Container,
  ContainerWrapper,
  ImgCon,
  ModalCon,
  ModalConent,
  ModalContent,
  ModalWrap,
  OpenModalContainer,
} from "./orderStyle";
import ScaleLoader from "react-spinners/ScaleLoader";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import OrderList from "./OrderList";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const categories = [
  { label: "Furniture", value: "furniture" },
  { label: "Electronics", value: "electronics" },
];

const typecatalog = [
  { label: "Furniture", types: ["Sofa", "Table", "Chair"] },
  { label: "Electronics", types: ["TV", "Fridge", "Washing Machine"] },
];

const mockData: any = [
  "Popular",
  "Popular",
  "Sale",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
  "sadfs",
];

const datas1 = [
  { label: "Product Name", field: "types" },
  { label: "Cost", field: "cost" },
  { label: "Description", field: "description" },
  { label: "Weight", field: "Weight_KG" },
  { label: "Material", field: "Material" },
  { label: "Assembly", field: "Assembly" },
  { label: "Seat Dimensions", field: "SeatDimensions_HWD" },
  { label: "Width", field: "Width" },
  { label: "Height", field: "Height" },
  { label: "Color", field: "Color" },
  { label: "Style", field: "Styles" },
  { label: "Category", field: "categories" },
];

export default function OrderTable() {
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
  const [type, setType] = useState<string>("");
  const [formData, setFormData] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [fields, setFields] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [selectID, setSelectID] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [loading, setLoadig] = useState(false);
  const [viewItem, setViewItem] = useState<any | null>(null);
  ///// pagenation
  const [todosPerPage] = useState(15);
  const totalPages = Math.ceil(data.length / todosPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const currentTodos = data.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );
  /// PDF
  const [error, setError] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    setFormData({ ...formData, categories: selectedCategory, types: "" });
    setType("");
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    setFormData({ ...formData, types: newType });
  };

  useEffect(() => {
    if (selectedCategory) {
      const category = typecatalog.find(
        (cat) => cat.label.toLowerCase() === selectedCategory.toLowerCase()
      );
      if (category) {
        setFilteredTypes(category.types);
      } else {
        setFilteredTypes([]);
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    setLoadig(true);
    setTimeout(() => {
      setLoadig(false);
    }, 5000);
  }, []);

  const handleView = (id: string) => {
    const selectedItem = data.find((item) => item._id === id);
    if (selectedItem) {
      setViewItem(selectedItem);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;

    setFormData((prev: any) => ({
      ...prev,
      [field]: NUMBER_FIELDS.includes(field)
        ? value === ""
          ? ""
          : parseFloat(value)
        : value,
    }));
  };

  const openModal = (image: string) => {
    setIsModalOpen(true);
    setModalImage(image);
  };

  const closeModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setModalImage("");
      setViewItem(null);
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <div>Token mavjud emas!</div>;
    }
    try {
      const response = await axios.get<any>(`${baseAPI}/product/all`, {
        params: { search },
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!selectID) {
        const { data } = await axios.post<any>(
          `${baseAPI}/product/add`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          fetchData();
          setFormData({});
          toast.success("Item added successfully");
          alert("Item added successfully");
          setIsOpen(false);
        }
      } else {
        const { data } = await axios.put<any>(
          `${baseAPI}/product/edit/${selectID}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          fetchData();
          setFormData([]);
          setSelectID("");
          toast.success("Item updated successfully");
          alert("Item updated successfully");
          setIsOpen(false);
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error?.msg || "Xatolik yuz berdi.");
      alert(error.response?.data?.error?.msg || "Xatolik yuz berdi.");
    }
  };

  const uploadFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append(fieldName, e.target.files[0]);
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post<any>(`${baseAPI}/upload/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setFormData((prev: any) => ({
          ...prev,
          [fieldName]: data.filePaths[0],
        }));
        toast.success(`${fieldName} uploaded successfully`);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.error?.msg || "Fayl yuklashda xatolik yuz berdi."
      );
    }
  };

  const handlePagination = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  /// PDF
  const handleDownloadPDF = () => {
    if (selected.length === 0) {
      setError("No selected!");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(30);
    doc.text("Furniture", 140, 20, { align: "center" });

    const headers = ["Title", "Description", "Image URL", "Date", "ID"];

    const rows = selected
      .map((id, ind) => {
        const todo = data.find((item) => item._id === id);
        return todo
          ? [todo.title, todo.desc, todo.image, todo.sana, todo._id]
          : [];
      })
      .filter((row) => row.length > 0);

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 30,
      bodyStyles: {
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0],
        fillColor: "#FFF",
      },
      headStyles: {
        fillColor: "#395cf8",
        textColor: [255, 255, 255],
        fontSize: 12,
        halign: "center",
      },
      tableId: "#FFF",
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
    });

    doc.save("table.pdf");
    doc.save("todos.pdf");
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

  const NUMBER_FIELDS = ["Hight", "Width", "Weight_KG", "LegHeight_CM"];

  return (
    <Container>
      <React.Fragment>
        {loading ? (
          <div
            style={{
              width: "100vw",
              minHeight: "40rem",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ScaleLoader color={"#1976e8d7"} loading={loading} />
          </div>
        ) : (
          <ContainerWrapper>
            {isOpen && (
              <OpenModalContainer
                onClick={(e: any) => {
                  if (e.target === e.currentTarget) {
                    setIsOpen(false);
                  }
                }}
              >
                <ModalWrap>
                  <div
                    style={{
                      paddingLeft: "15px",
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2>
                      {selectID
                        ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`
                        : `Add:  ${
                            type.charAt(0).toUpperCase() + type.slice(1)
                          }`}
                    </h2>
                    <h2 onClick={() => setIsOpen(false)}>X</h2>
                  </div>

                  <ModalConent>
                    {/* // select inputs */}
                    <div className="items ad">

                      <div className="selectwrap">
                        <h4>Categories:</h4>
                        <select
                          className="Select"
                          value={formData.categories || ""}
                          onChange={handleCategoryChange}
                        >
                          <option value="">
                            <em>Select Category</em>
                          </option>
                          {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="selectwrap">
                        <h4>Type:</h4>
                        <select
                          className="Select"
                          value={formData.types || ""}
                          onChange={(e) => handleTypeChange(e.target.value)}
                        >
                          <option value="">Select Type</option>
                          {filteredTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* // product inputs */}
                    <div className="items c">
                      {fields.map(
                        (val, ind) =>
                          val !== "categories" &&
                          val !== "types" &&
                          val !== "image" &&
                          !val.startsWith("image") && (
                            <div key={ind}>
                              <h4 style={{ marginBottom: "5px" }}>
                                {mockData[ind]}
                              </h4>
                              {NUMBER_FIELDS.includes(val) ? (
                                <Input
                                  type="number"
                                  placeholder={
                                    val.charAt(0).toUpperCase() + val.slice(1)
                                  }
                                  value={formData[val] || ""}
                                  onChange={(e) => handleChange(e, val)}
                                />
                              ) : (
                                <Input
                                  type="text"
                                  placeholder={
                                    val.charAt(0).toUpperCase() + val.slice(1)
                                  }
                                  value={formData[val] || ""}
                                  onChange={(e) => handleChange(e, val)}
                                />
                              )}
                            </div>
                          )
                      )}
                    </div>

                    {/* // img inputs */}
                    <div className="image-container">
                      {fields
                        .filter(
                          (val) => val === "image" || val.startsWith("image")
                        )
                        .slice(0, 8)
                        .map((val, ind) => (
                          <div key={ind} className="item">
                            <div className="data1 aaa">
                              <Button
                                className="buttonimag"
                                component="label"
                                role={undefined}
                                tabIndex={-1}
                                variant="outlined"
                                color="neutral"
                                startDecorator={
                                  <SvgIcon>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                      />
                                    </svg>
                                  </SvgIcon>
                                }
                              >
                                Upload a file
                                <VisuallyHiddenInput
                                  type="file"
                                  onChange={(e) => uploadFile(e, val)}
                                />
                              </Button>
                              {formData[val] ? (
                                <img
                                  className="images"
                                  src={formData[val]}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className="images"
                                  src="https://us.123rf.com/450wm/avaicon/avaicon2202/avaicon220200138/181341773-ic%C3%B4ne-d-image-signe-et-symbole-de-la-galerie-de-photos-ic%C3%B4ne-d-image.jpg?ver=6"
                                  alt="Placeholder"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>

                    <Button
                      onClick={handleSubmit}
                      style={{ marginTop: "1rem" }}
                    >
                      {selectID ? "Update Item" : "Add Item"}
                    </Button>
                  </ModalConent>
                </ModalWrap>
              </OpenModalContainer>
            )}

            <Box
              className="SearchAndFilters-tabletUp"
              sx={{
                borderRadius: "sm",
                py: 2,
                display: { xs: "none", sm: "flex" },
                flexWrap: "wrap",
                gap: 1.5,
                "& > *": {
                  minWidth: { xs: "120px", md: "160px" },
                },
              }}
            >
              <FormControl sx={{ flex: 1 }} size="sm">
                <FormLabel>Search for order</FormLabel>

                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", gap: "20px" }}>
                    <Input
                      size="sm"
                      placeholder="Search"
                      startDecorator={<SearchIcon />}
                      type="search"
                      value={search}
                      onChange={handleSearchChange}
                      style={{ width: "220px" }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <div style={{ marginBottom: "-10px" }}>
                      {error && <ErrorMessage>{error}</ErrorMessage>}
                    </div>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                      <Button
                        onClick={handleDownloadPDF}
                        sx={{ width: "150px" }}
                      >
                        Download PDF
                      </Button>
                    </Box>
                    {user && (
                      <Button
                        variant="outlined"
                        startDecorator={<Add />}
                        onClick={() => {
                          setIsOpen(true);
                          setSelectID("");
                        }}
                        style={{ width: "150px" }}
                      >
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
                display: { xs: "none", sm: "initial" },
                width: "100%",
                borderRadius: "sm",
                flexShrink: 1,
                overflow: "scroll",
                minHeight: "490px",
                margin: "0 auto",
              }}
            >
              <Table
                aria-labelledby="tableTitle"
                stickyHeader
                hoverRow
                sx={{
                  width: "100%",
                  tableLayout: "fixed",
                  "--TableCell-headBackground":
                    "var(--joy-palette-background-level1)",
                  "--Table-headerUnderlineThickness": "1px",
                  "--TableRow-hoverBackground":
                    "var(--joy-palette-background-level1)",
                  "--TableCell-paddingY": "4px",
                  "--TableCell-paddingX": "8px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        width: 48,
                        textAlign: "center",
                        padding: "12px 6px",
                      }}
                    >
                      <Checkbox
                        onChange={handleSelectAll}
                        size="sm"
                        color="primary"
                        checked={currentTodos.every((todo) =>
                          selected.includes(todo._id)
                        )}
                        indeterminate={
                          currentTodos.some((todo) =>
                            selected.includes(todo._id)
                          ) &&
                          !currentTodos.every((todo) =>
                            selected.includes(todo._id)
                          )
                        }
                      />
                    </th>
                    <th style={{ width: 120, padding: "12px 6px" }}>
                      <Link underline="none" color="primary" component="button">
                        id
                      </Link>
                    </th>
                    <th style={{ width: 140, padding: "12px 6px" }}>
                      Categories
                    </th>
                    <th style={{ width: 140, padding: "12px 6px" }}>
                      Product Type
                    </th>
                    <th style={{ width: 140, padding: "12px 6px" }}>Image</th>
                    <th style={{ width: 150, padding: "12px 6px" }}>date</th>
                    <th style={{ width: 80, padding: "12px 6px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {currentTodos.length > 0 ? (
                    currentTodos.map((row, ind) => (
                      <tr key={ind}>
                        <td style={{ textAlign: "center" }}>
                          <Checkbox
                            size="sm"
                            onChange={() => handleCheckboxChange(row._id)}
                            checked={selected.includes(row._id)}
                          />
                        </td>
                        <td style={{ overflow: "scroll" }}>
                          <Typography level="body-xs">
                            {(currentPage - 1) * todosPerPage + ind + 1}
                          </Typography>
                        </td>
                        <td>
                          <Typography level="body-xs">
                            {row.categories}
                          </Typography>
                        </td>
                        <td>{row.types}</td>
                        <td>
                          <img
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "5px",
                              marginBottom: "-5px",
                            }}
                            onClick={() => openModal(row.image)}
                            src={row.image}
                            alt="image"
                          />
                        </td>
                        <td>{row.sana}</td>
                        <td>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <Link
                              onClick={() => handleView(row._id)}
                              level="body-xs"
                              component="button"
                            >
                              View
                            </Link>
                          </Box>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td
                      colSpan={7}
                      style={{
                        textAlign: "center",
                        width: "100%",
                        position: "absolute",
                        justifyContent: "center",
                        alignItems: "center",
                        left: 0,
                        bottom: "45%",
                      }}
                    >
                      No search results found
                    </td>
                  )}
                </tbody>
              </Table>
            </Sheet>

            {isModalOpen && (
              <div
                id="myModal"
                onClick={closeModal}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "fixed",
                  zIndex: 99999,
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "35px",
                    color: "#f1f1f1",
                    fontSize: "40px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={closeModal}
                >
                  &times;
                </span>
                <img
                  src={modalImage}
                  alt="Modal Tasvir"
                  style={{
                    borderRadius: "20px",
                    margin: "30px 20px",
                    width: "100%",
                    height: "100%",
                    display: "block",
                    maxWidth: "800px",
                    maxHeight: "600px",
                  }}
                />
              </div>
            )}

            {viewItem && (
              <ModalContent>
                <h2 style={{ paddingLeft: "20px" }}>{viewItem.categories}</h2>
                <ImgCon>
                  {[
                    viewItem.image,
                    viewItem.image1,
                    viewItem.image2,
                    viewItem.image3,
                    viewItem.image4,
                    viewItem.image5,
                    viewItem.image6,
                    viewItem.image7,
                  ]
                    .slice(0, 9)
                    .filter(Boolean) // Faqat mavjud rasmlarni oladi
                    .map((img, index) => (
                      <img
                        key={index}
                        src={img.replace("http://https://", "https://")}
                        alt={viewItem.title}
                      />
                    ))}
                </ImgCon>

                <ModalCon>
                  <div className="Content">
                    <div className="items">
                      {datas1.map((item, index) => (
                        <div key={index} className="item">
                          <h3>{item.label}:</h3>
                          <h4>{viewItem[item.field]}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                </ModalCon>

                <Buttonn onClick={closeModal}>X</Buttonn>
              </ModalContent>
            )}

            <Box
              className="Pagination-laptopUp"
              sx={{
                pt: 2,
                gap: 1,
                [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
                display: { xs: "none", sm: "flex" },
              }}
            >
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                startDecorator={<KeyboardArrowLeftIcon />}
                onClick={() => handlePagination(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <Box sx={{ flex: 1 }} />
              {["1"].map((page, ind) => (
                <React.Fragment key={ind}>
                  <IconButton
                    size="sm"
                    variant={Number(page) ? "outlined" : "plain"}
                    color="neutral"
                  >
                    {currentPage}
                  </IconButton>
                  <IconButton
                    size="sm"
                    variant={Number(page) ? "outlined" : "plain"}
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
                onClick={() => handlePagination(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </Box>
          </ContainerWrapper>
        )}
      </React.Fragment>
    </Container>
  );
}
