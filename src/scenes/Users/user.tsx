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
  ModalContent,
  UserContent,
} from "./style";
import ScaleLoader from "react-spinners/ScaleLoader";
import DeleteIcon from "@mui/icons-material/Delete";

const useDebouncedSearch = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function OrderTable() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoadig] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
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
  const debouncedSearch = useDebouncedSearch(search, 10);
  const [user, setUser] = useState<any>(null);

  // admin
  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data }: any = await axios.get(`${baseAPI}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    // loading
    setLoadig(true);
    setTimeout(() => {
      setLoadig(false);
    }, 5000);
  }, []);

  const handleView = (id: string) => {
    const selectedItem = data.find((item) => item._id === id);

    // user ning role ni tekshirish
    if (user && user[0] && (user[0].role === "super_admin" || user[0].role === "admin_plus")) {
      if (selectedItem) {
        setViewItem(selectedItem);
      }
    } else {
      alert("Role is incorrect or user is empty");
    }
  };

  const closeModal = (e: React.MouseEvent) => {
    // image modal
    if (e.target === e.currentTarget) {
      setViewItem(null);
    }
  };

  const fetchData = async () => {
    try {
      const params = debouncedSearch ? { query: debouncedSearch } : {};
      const res = await axios.get<any>(`${baseAPI}/userFur/user-count`, {
        params,
      });

      const datas: any = res.data;
      const data2 = datas.usersData;
      setData(data2);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.delete<any>(
        `${baseAPI}/userFur/delet/${id}`,
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

    const headers = ["Name", "LastName", "Email", "Date", "Phone"];

    const rows = selected
      .map((id, ind) => {
        const todo = data.find((item) => item._id === id);
        return todo
          ? [
              todo.full_name,
              todo.lastName,
              todo.email,
              todo.sana,
              todo.phone_number,
            ]
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

  return (
    <Container>
      <ContainerWrapper>
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
              <Input
                size="sm"
                placeholder="Search"
                startDecorator={<SearchIcon />}
                type="search"
                value={search}
                onChange={handleSearchChange}
                style={{ width: "220px" }}
              />

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
            overflow: "auto",
            minHeight: 0,
            height: "100vw",
            maxHeight: "490px",
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
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
                <th style={{ width: 40, padding: "12px 6px" }}>
                  <Link underline="none" color="primary" component="button">
                    id
                  </Link>
                </th>
                <th
                  style={{
                    width: "100vw",
                    maxWidth: 100,
                    padding: "12px 6px",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    width: "100vw",
                    maxWidth: 100,
                    padding: "12px 6px",
                  }}
                >
                  LastName
                </th>
                <th
                  style={{
                    width: "100vw",
                    maxWidth: 200,
                    padding: "12px 6px",
                  }}
                >
                  email
                </th>
                <th
                  style={{
                    width: "100vw",
                    maxWidth: 160,
                    padding: "12px 6px",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    width: "100vw",
                    maxWidth: 70,
                    padding: "12px 6px",
                  }}
                ></th>
                <th
                  style={{
                    width: "100vw",
                    maxWidth: 70,
                    padding: "12px 6px",
                  }}
                >
                  info
                </th>
              </tr>
            </thead>
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
            ) : (
              <tbody>
                {currentTodos.length > 0 ? (
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
                        {" "}
                        <Typography level="body-xs">{row.full_name}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.lastName}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.email}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.sana}</Typography>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(row._id)}
                          style={{ border: "none", background: "none" }}
                        >
                          <DeleteIcon
                            style={{
                              width: "40px",
                              height: "25px",
                              color: "gray",
                            }}
                          />
                        </button>
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
            )}
          </Table>
        </Sheet>

        {viewItem && (
          <ModalContent>
            <UserContent>
              <ImgCon className="ImgCon">
                <img
                  src="https://t3.ftcdn.net/jpg/10/58/16/08/240_F_1058160846_MxdSa2GeeVAF5A7Zt9X7Bp0dq0mlzeDe.jpg"
                  alt=""
                />
                <h2>
                  {viewItem.full_name} {viewItem.lastName}
                </h2>
              </ImgCon>

              <ModalCon className="ModalCon">
                <div className="info">
                  <h3>Country:</h3>
                  <h4>{viewItem.address.country}</h4>
                </div>
                <div className="info">
                  <h3>Phone:</h3>
                  <h4>{viewItem.phone_number}</h4>
                </div>
                <div className="info">
                  <h3>City:</h3>
                  <h4>{viewItem.address.city}</h4>
                </div>
                <div className="info">
                  <h3>Street:</h3>
                  <h4>{viewItem.address.street}</h4>
                </div>
                <div className="info">
                  <h3>Apartmant:</h3>
                  <h4>{viewItem.address.apartmant}</h4>
                </div>
                <div className="info">
                  <h3>Zip_code:</h3>
                  <h4>{viewItem.address.zip_code}</h4>
                </div>
                <div className="info">
                  <h3>Comment:</h3>
                  <h4>{viewItem.comment}</h4>
                </div>
              </ModalCon>
            </UserContent>

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
          {["1"].map((page, ind: number) => (
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
    </Container>
  );
}
