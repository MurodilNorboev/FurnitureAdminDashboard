import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Content } from "../../all.Styles";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import "../../styles.css";
import "../../../../index.css";
import { baseAPI } from "../../../../utils/constants";

const ApexChart: React.FC = () => {
  const [totalOrderItems, setTotalOrderItems] = useState<number>(0);
  const [totalOrderItemsMonth, setTotalOrderItemsMonth] = useState<number>(0);
  const [state, setState] = useState<any>({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: true, type: "xy" },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      title: { text: "All Data", align: "left" },
      grid: {
        row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
      },
      xaxis: {
        type: "datetime",
        title: {
          text: "Days",
        },
        labels: {
          datetimeUTC: false,
          format: "dd MMM", // Sanani o'zgartirilgan formatda ko'rsatish
        },
      },
    },
    zoomLevel: 1,
  });
  useEffect(() => {
    fetch(`${baseAPI}/payment/getOrderList`)
      .then((response) => response.json())
      .then((data) => {
        const totalItems = data.data[0].totalOrderItems;
        const totalItemsMonth = data.data[0].totalOrderItemsMonth;
        setTotalOrderItems(totalItems);
        setTotalOrderItemsMonth(totalItemsMonth);

        // Sanalarni olish
        const sortedData = data.data[0].days.sort(
          (a: any, b: any) => a.day - b.day
        );

        // Hozirgi kundan 1 oylik vaqt oralig'ini olish
        const today = new Date();
        const todayTimestamp = today.getTime(); // Hozirgi kunning timestampi
        const last30Days = Array.from({ length: 30 }, (_, index) => {
          const date = new Date(today);
          date.setDate(today.getDate() - index);
          return date;
        });

        // Grafik uchun ma'lumot tayyorlash
        const chartData = last30Days.map((date) => {
          const dayData = sortedData.find((day: any) => {
            const dayDate = new Date(
              today.getFullYear(),
              today.getMonth(),
              day.day
            ); // 2025 yilni olib tashlash
            // Taqqoslashda faqat yil, oy, kunni solishtirish
            return (
              dayDate.getFullYear() === date.getFullYear() &&
              dayDate.getMonth() === date.getMonth() &&
              dayDate.getDate() === date.getDate()
            );
          });

          return [date.getTime(), dayData ? dayData.totalOrderItemsDay : 0];
        });

        setState((prevState: any) => ({
          ...prevState,
          series: [{ data: chartData }],
        }));
      })
      .catch((error) => console.error("Error fetching order data: ", error));
  }, []);

  const percentageChange = (
    (totalOrderItemsMonth / totalOrderItems) *
    100
  ).toFixed(2);

  return (
    <Sheet
      className="Sheet4"
      sx={{
        border: "1.5px solid",
        borderColor: "divider",
      }}
    >
      <div>
        <Content>
          <div
            className="users"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <h4>Conversions</h4>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <h1>{totalOrderItems.toLocaleString()}</h1>{" "}
              {/* Showing total orders */}
              <Chip
                variant="soft"
                size="sm"
                color="success"
                sx={{
                  height: "22px",
                  border: "1.5px solid #acf0ba",
                  color: "#146725",
                }}
              >
                +{percentageChange}%
              </Chip>{" "}
            </div>
            <h5>Sessions per day for the last 30 days</h5>
          </div>
        </Content>
        <div style={{ height: "200px" }}>
          <ReactApexChart
            options={state.options}
            series={state.series}
            height={280}
          />
        </div>
      </div>
    </Sheet>
  );
};

export default ApexChart;
