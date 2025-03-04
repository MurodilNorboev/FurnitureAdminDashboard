import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import axios from "axios";
import { useState, useEffect } from "react";
import Add from "@mui/icons-material/Add";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ErrorMessage } from "../../components/styles/style";
import { baseAPI } from "../../utils/constants";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
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
} from "./style";
import ScaleLoader from "react-spinners/ScaleLoader";
import SvgIcon from "@mui/joy/SvgIcon";
import toast, { Toaster } from "react-hot-toast";
import {
  VisuallyHiddenInput,
  typecatalog,
  mockDatas,
  mockData,
  datas1,
  TYPES,
  NUMBER_FIELDS,
  Data2,
} from "./mock";
import { SET_CHANNEL_LOADING } from "@sendbird/uikit-react/types/modules/ChannelList/dux/actionTypes";

export default function OrderTable() {
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
  const [type, setType] = useState<string>("");
  const [formData, setFormData] = useState<any>({ ColorSet: [] });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [fields, setFields] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [selectID, setSelectID] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [loading, setLoadig] = useState(false);
  const [viewItem, setViewItem] = useState<any | null>(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState<string[]>(
    []
  );
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
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  /// selecte Color function
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  const handleSelect = (color: any) => {
    setFormData((prev: any) => ({
      ...prev,
      ColorSet: prev.ColorSet.includes(color)
        ? prev.ColorSet.filter((c: any) => c !== color)
        : [...prev.ColorSet, color],
    }));
  };
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // select categories
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    setFormData({
      ...formData,
      categories: selectedCategory,
      types: "",
      subCategories: "",
    }); // `subCategories` ni bo'sh qilish
    setFilteredSubCategories([]); // Subcategoriesni bo‘shatish
    setLoadig(true);
  };
  const handleTypeChange = (newType: string) => {
    setCurrentPage(1);
    setType(newType);
    setFormData({ ...formData, types: newType, subCategories: "" });
    setLoadig(true);
    fetchData();
    const selectedTypeData = Data2.find((item) => item.label === newType);
    if (selectedTypeData) {
      setFilteredSubCategories([
        selectedTypeData.value1,
        selectedTypeData.value2,
        selectedTypeData.value3,
      ]);
    } else {
      setFilteredSubCategories([]); // Yoki bo'sh ro'yxatni qaytarish
    }
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

  useEffect(() => {
    fetchData();
  }, [type, search]);

  const openModal = (image: string) => {
    // image modal
    setIsModalOpen(true);
    setModalImage(image);
  };

  const closeModal = (e: React.MouseEvent) => {
    // image modal
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setModalImage("");
      setViewItem(null);
    }
  };

  const fetchData = async () => {
    setLoadig(true);
    try {
      const res = await axios.get<any>(`${baseAPI}/product/all`, {
        params: { search },
      });
      const filteredData = type
        ? res.data.data.filter((item: any) => item.types === type)
        : res.data.data;
      setData(filteredData);
      if (filteredData.length > 0) {
        setTimeout(() => {
          setLoadig(false);
        }, 1000);
      }

      if (filteredData.length > 0 || []) {
        const keys = Object.keys(filteredData[0]).filter(
          (key) => key !== "_id" && key !== "sana" && key !== "yangilanish"
        );
        setFields(keys);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  useEffect(() => {
    // profile/ user login qilganini tekshirish
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${baseAPI}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getProfile();
  }, []);

  // jonatishda yangilanish
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
          setFormData({
            ColorSet: [],
            categories: "",
            types: "",
            subCategories: "",
          });
          setSelectID("");
          setIsOpen(true);

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
          setIsOpen(false);
        }
      }
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.delete<any>(
        `${baseAPI}/product/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        fetchData();
        toast.success("Item deleted successfully");
      }
    } catch (error: any) {
      console.error("Xatolik yuz berdi:", error);
      toast.error(error.response?.data?.error?.msg || "Xatolik yuz berdi.");
    }
  };

  const uploadFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    if (!e.target.files?.length) {
      alert("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append(fieldName, e.target.files[0]);

    try {
      const { data }: any = await axios.post(`${baseAPI}/upload`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (data.success) {
        if (
          fieldName === "image" ||
          fieldName === "image1" ||
          fieldName === "image2" ||
          fieldName === "image3" ||
          fieldName === "image4" ||
          fieldName === "videos1"
        ) {
          setFormData((prev: any) => ({
            ...prev,
            [fieldName]: data.filePaths[0],
          }));
        }
        toast.success(`${fieldName} uploaded successfully!`);
      } else {
        toast.error("File upload failed.");
      }
    } catch (error) {
      console.error("File upload error:", error);
      alert("File upload failed. Please try again.");
    }
  };

  const handlePagination = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  /// PDF
  const handleDownloadPDF = () => {};
  // Checkbox
  const handleCheckboxChange = (_id: string) => {};
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <Container>
      <Toaster position="top-right" />
      {/* <React.Fragment> */}
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
                <h2 style={{ color: "black" }}>
                  {selectID
                    ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`
                    : `Add:  ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                </h2>
                <h2
                  onClick={() => {
                    setFormData({});
                    setIsOpen(false);
                  }}
                >
                  X
                </h2>
              </div>

              <ModalConent>
                <div className="items ad">
                  {/* Categories Select */}
                  <div className="selectwrap">
                    <h4 style={{ color: "black" }}>Categories:</h4>
                    <select
                      style={{ background: "white" }}
                      className="Select"
                      value={formData.categories || ""}
                      onChange={handleCategoryChange}
                    >
                      <option value="">
                        <em>Select Category</em>
                      </option>
                      {typecatalog.map((cat) => (
                        <option key={cat.label} value={cat.label}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Types Select */}
                  <div className="selectwrap">
                    <h4 style={{ color: "black" }}>Type:</h4>
                    <select
                      style={{ background: "white" }}
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

                  {/* Sub Categories Select */}
                  <div className="selectwrap">
                    <h4 style={{ color: "black" }}>Sub Categories:</h4>
                    <select
                      style={{ background: "white" }}
                      className="Select"
                      value={formData.SubCategories || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          SubCategories: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Sub Category</option>
                      {filteredSubCategories.map((SubCategory) => (
                        <option key={SubCategory} value={SubCategory}>
                          {SubCategory}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Special Offers Select */}
                  <div className="selectwrap">
                    <h4 style={{ color: "black" }}>Special Offers:</h4>
                    <select
                      style={{ background: "white" }}
                      className="Select"
                      value={formData.SpecialOffers || ""}
                      onChange={(e: any) => handleChange(e, "SpecialOffers")}
                    >
                      <option value="">
                        <em>Select Offer</em>
                      </option>
                      <option value="Hot">Hot</option>
                      <option value="Popular">Popular</option>
                      <option value="New">New</option>
                      <option value="All">All</option>
                    </select>
                  </div>

                  {/* Color Select */}
                  <div className="selectwrap">
                    <h4 style={{ color: "black" }}>Color:</h4>
                    <select
                      style={{ background: "white" }}
                      className="Select"
                      value={formData.Color || ""}
                      onChange={(e: any) => handleChange(e, "Color")}
                    >
                      <option value="">
                        <em>Select Color</em>
                      </option>
                      {mockDatas.colors.map((color) => (
                        <option key={color.value} value={color.value}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Styles Select */}
                  <div className="selectwrap">
                    <h4 style={{ color: "black" }}>Styles:</h4>
                    <select
                      style={{ background: "white" }}
                      className="Select"
                      value={formData.Styles || ""}
                      onChange={(e: any) => handleChange(e, "Styles")}
                    >
                      <option value="">
                        <em>Select Style</em>
                      </option>
                      {mockDatas.styles.map((style) => (
                        <option key={style.value} value={style.value}>
                          {style.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Material Select */}
                  <div className="selectwrap">
                    <h4 style={{ color: "black" }}>Material:</h4>
                    <select
                      style={{ background: "white" }}
                      className="Select"
                      value={formData.material || ""}
                      onChange={(e: any) => handleChange(e, "material")}
                    >
                      <option value="">
                        <em>Select Material</em>
                      </option>
                      {mockDatas.materials.map((material) => (
                        <option key={material.value} value={material.value}>
                          {material.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ColorSet Select */}
                  <div
                    className="selectwrap"
                    ref={dropdownRef}
                    style={{ position: "relative", width: "100%" }}
                  >
                    <h4 style={{ color: "black" }}>Color Set:</h4>
                    <div
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                      style={{
                        border: "1px solid #ccc",
                        padding: "6px",
                        width: "100%",
                        borderRadius: "5px",
                        cursor: "pointer",
                        background: "#fff",
                      }}
                    >
                      {formData.ColorSet.length > 0
                        ? formData.ColorSet.map((color: any) => (
                            <span
                              key={color}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(color);
                              }}
                              style={{
                                display: "inline-block",
                                background: "#eee",
                                padding: "4px 10px",
                                margin: "2px",
                                borderRadius: "15px",
                                fontSize: "14px",
                                cursor: "pointer",
                              }}
                            >
                              {color} ✖
                            </span>
                          ))
                        : "Select colors"}
                    </div>

                    {isSelectOpen && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          width: "100%",
                          background: "#fff",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                          borderRadius: "5px",
                          marginTop: "5px",
                          zIndex: 10,
                        }}
                      >
                        {mockDatas.colorSet.map((color) => (
                          <div
                            key={color.value}
                            onClick={() => handleSelect(color.value)}
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              background: formData.ColorSet.includes(
                                color.value
                              )
                                ? "#ddd"
                                : "#fff",
                            }}
                          >
                            {color.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="items c">
                  {fields
                    .filter(
                      (val) =>
                        val !== "categories" &&
                        val !== "types" &&
                        val !== "SpecialOffers" &&
                        val !== "Color" &&
                        val !== "Styles" &&
                        val !== "material" &&
                        val !== "image" &&
                        val !== "videos1" &&
                        val !== "ColorSet" &&
                        val !== "SubCategories" &&
                        !val.startsWith("image") &&
                        Number(val) !== -1 && (
                          <Input
                            type="text"
                            style={{
                              background: "white",
                              color: "black",
                            }}
                            placeholder={
                              val.charAt(0).toUpperCase() + val.slice(1)
                            }
                            value={formData[val] || ""}
                            onChange={(e) => handleChange(e, val)}
                          />
                        )
                    )
                    .map((val, ind) => (
                      <div key={ind}>
                        <h4 style={{ marginBottom: "5px", color: "black" }}>
                          {mockData[ind]}
                        </h4>
                        {NUMBER_FIELDS.includes(val) ? (
                          <Input
                            type="number"
                            style={{
                              background: "white",
                              color: "black",
                            }}
                            placeholder={
                              val.charAt(0).toUpperCase() + val.slice(1)
                            }
                            value={formData[val] || ""}
                            onChange={(e) => handleChange(e, val)}
                          />
                        ) : (
                          <Input
                            type="text"
                            style={{
                              background: "white",
                              color: "black",
                            }}
                            placeholder={
                              val.charAt(0).toUpperCase() + val.slice(1)
                            }
                            value={formData[val] || ""}
                            onChange={(e) => handleChange(e, val)}
                          />
                        )}
                      </div>
                    ))}
                </div>

                <div className="image-container">
                  {fields
                    .filter(
                      (val) =>
                        val === "image" ||
                        val.startsWith("image") ||
                        val === "videos1"
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
                            {val.startsWith("image")
                              ? "Upload a image"
                              : "Upload a video"}
                            <VisuallyHiddenInput
                              type="file"
                              onChange={(e) => uploadFile(e, val)}
                            />
                          </Button>
                          {formData[val] ? (
                            formData[val].endsWith(".mp4") ||
                            formData[val].includes("videos1") ? (
                              <video
                                className="images"
                                style={{ border: "1px solid red" }}
                                src={formData[val]}
                                controls
                              />
                            ) : (
                              <img
                                className="images"
                                src={formData[val]}
                                alt="Uploaded content"
                              />
                            )
                          ) : (
                            <img
                              className="images"
                              src="https://us.123rf.com/450wm/avaicon/avaicon2202/avaicon220200138/181341773-ic%C3%B4ne-d-image-signe-et-symbole-de-la-galerie-de-photos-ic%C3%B4ne-d-image.jpg?ver=6"
                              alt="Default placeholder"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                <Button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
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
          <Box sx={{ flex: 1 }}>
            <FormLabel>Search for order</FormLabel>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* // search and filters */}
              <div style={{ display: "flex", gap: "20px" }}>
                {/* / search */}
                <Input
                  size="sm"
                  placeholder="Search"
                  startDecorator={<SearchIcon />}
                  type="search"
                  value={search}
                  onChange={handleSearchChange}
                  style={{ width: "220px" }}
                />
                {/* / select types */}
                <Select
                  placeholder="Select a Type"
                  indicator={<KeyboardArrowDown />}
                  onChange={(event: any, value: string | null) => {
                    handleTypeChange(value || "");
                  }}
                  value={type}
                  sx={{
                    width: 240,
                    [`& .${selectClasses.indicator}`]: {
                      transition: "0.2s",
                      [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                      },
                    },
                  }}
                >
                  <Option key="all" value="">
                    All Types
                  </Option>
                  {TYPES.map((t) => (
                    <Option key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* // buttons */}
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
                  <Button onClick={handleDownloadPDF} sx={{ width: "150px" }}>
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
          </Box>
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
            maxHeight: "490px",
            margin: "0 auto",
          }}
        >
          <Table
            // aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
              // width: "100%",
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
                      !currentTodos.every((todo) => selected.includes(todo._id))
                    }
                  />
                </th>
                <th style={{ width: 120, padding: "12px 6px" }}>
                  <Link underline="none" color="primary" component="button">
                    id
                  </Link>
                </th>
                <th style={{ width: 140, padding: "12px 6px" }}>Categories</th>
                <th style={{ width: 140, padding: "12px 6px" }}>
                  Product Type
                </th>
                <th style={{ width: 140, padding: "12px 6px" }}>Image</th>
                <th style={{ width: 150, padding: "12px 6px" }}>date</th>
                <th style={{ width: 80, padding: "12px 6px" }}></th>
                <th style={{ width: 100, padding: "12px 6px" }}>info</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr style={{ position: "relative", height: "30vw" }}>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      width: "100%",
                      height: "100hv",
                      position: "absolute",
                      justifyContent: "center",
                      alignItems: "center",
                      left: 0,
                      bottom: "45%",
                    }}
                  >
                    <ScaleLoader color={"#1976e8d7"} loading={loading} />
                  </td>
                </tr>
              ) : selectClasses && currentTodos.length > 0 ? (
                currentTodos.map((row, ind: number) => (
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
                      <Typography level="body-xs">{row.categories}</Typography>
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
                        <Dropdown>
                          <MenuButton
                            slots={{ root: IconButton }}
                            slotProps={{
                              root: {
                                variant: "plain",
                                color: "neutral",
                                size: "sm",
                              },
                            }}
                          >
                            <MoreHorizRoundedIcon />
                          </MenuButton>
                          <Menu size="sm" sx={{ minWidth: 140 }}>
                            <MenuItem
                              // onClick={() => {
                              //   const selectedItem = data.find(
                              //     (item) => item._id === row._id
                              //   );
                              //   setSelectID(row._id);
                              //   setFormData(selectedItem || {});
                              //   setIsOpen(true);
                              // }}
                              onClick={() => {
                                const selectedItem = data.find(
                                  (item) => item._id === row._id
                                );
                                if (selectedItem) {
                                  setSelectID(row._id);
                                  setFormData({ ...selectedItem }); // To'g'ri ma'lumot yuklash
                                  setIsOpen(true);
                                }
                              }}
                            >
                              Edit
                            </MenuItem>
                            <Divider />
                            <MenuItem
                              color="danger"
                              onClick={() => handleDelete(row._id)}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </Dropdown>
                      </Box>
                    </td>
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
                <tr style={{ position: "relative", height: "30vw" }}>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      width: "100%",
                      height: "100hv",
                      position: "absolute",
                      justifyContent: "center",
                      alignItems: "center",
                      left: 0,
                      bottom: "45%",
                    }}
                  >
                    {loading === false
                      ? "No search results found"
                      : "Loading..."}
                  </td>
                </tr>
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
          <ModalContent style={{ color: "black" }}>
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
                .filter(Boolean)
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
      {/* </React.Fragment> */}
    </Container>
  );
}
