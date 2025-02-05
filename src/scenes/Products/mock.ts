import styled from "styled-components";

export const VisuallyHiddenInput = styled("input")`
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
export const categories = [
  { label: "Furniture", value: "furniture" },
  { label: "Rooms", value: "rooms" },
];
export const typecatalog = [
  {
    label: "Furniture",
    types: [
      "Sofa",
      "Table",
      "Chair",
      "Beds",
      "Storage",
      "Lighting",
      "Decor",
      "Textiles",
      "Mirrors",
      "Wall Art",
      "Clocks",
      "Vases",
      "Candles",
      "Shelves",
      "Plant Pots",
      "Bathroom Accessories",
    ],
  },
  {
    label: "Rooms",
    types: [
      "Bathroom",
      "Bedroom",
      "Kitchen",
      "Living Room",
      "Dining Room",
      "Playroom",
    ],
  },
];
export const mockDatas = {
  colors: [
    { label: "Orange", value: "orange" },
    { label: "Blue", value: "blue" },
    { label: "Dark Gray", value: "dark gray" },
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Light beige", value: "light beige" },
  ],
  styles: [
    { label: "Minimalist", value: "minimalist" },
    { label: "Eco Style", value: "eco style" },
    { label: "Glam", value: "glam" },
    { label: "Royal", value: "royal" },
    { label: "Pink rose", value: "pink rose" },
    { label: "Hi Tech", value: "hi tech" },
  ],
  materials: [
    { label: "Metal", value: "metal" },
    { label: "Plastic", value: "plastic" },
    { label: "Leather", value: "leather" },
    { label: "Marble", value: "marble" },
    { label: "Glass", value: "glass" },
    { label: "Rattan", value: "rattan" },
  ],
  colorSet: [
    { label: "Orange", value: "orange" },
    { label: "Blue", value: "blue" },
    { label: "Dark Gray", value: "dark gray" },
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Light beige", value: "light beige" },
  ],
};
export const mockData: any = [
  "Features:",
  "Sub Categories:",
  "Stock Number:",
  "Desk1:",
  "Video:",
  "Description:",
  "Min Height:",
  "Min Width:",
  "Max Height:",
  "Max Width:",
  "Arm Dimensions:",
  "Seat Dimensions:",
  "Leg Height:",
  "Package Dimensions:",
  "Weight:",
  "Assembly:",
  "Number of Seats:",
  "Caring Instructions:",
  "Cost:",
  "Big Cost:",
  "Discount:",
  "Count:"
];
export const datas1 = [
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
export const TYPES = [
  "Sofa",
  "Table",
  "Chair",
  "Beds",
  "Storage",
  "Lighting",
  "Decor",
  "Textile",
  "Mirrors",
  "Wall Art",
  "Clock",
  "Vases",
  "Candles",
  "Shelves",
  "Plant Pots",
  "Bathroom Accessories",
  "Kitchen",
];
export const NUMBER_FIELDS = [
    "Height",
    "Width",
    "Weight_KG",
    "LegHeight_CM",
    "discount",
    "cost",
    "StockNumber",
  ];