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
export const Data2 = [
  {
    label: "Sofa",
    value1: "Sectional Sofas",
    value2: "Sleeper Sofas",
    value3: "Recliner Sofas",
  },
  {
    label: "Table",
    value1: "Coffee Tables",
    value2: "Dining Tables",
    value3: "Console Tables",
  },
  {
    label: "New In",
    value1: "Modern Designs",
    value2: "Limited Edition",
    value3: "Eco-Friendly Furniture",
  },
  {
    label: "Storage",
    value1: "Wardrobes",
    value2: "Bookshelves",
    value3: "TV Stands",
  },
  {
    label: "Beds",
    value1: "King Size Beds",
    value2: "Queen Size Beds",
    value3: "Bunk Beds",
  },
  {
    label: "Lighting",
    value1: "Ceiling Lights",
    value2: "Table Lamps",
    value3: "Wall Lights",
  },
  {
    label: "Kitchen",
    value1: "Dining Chairs",
    value2: "Bar Stools",
    value3: "Kitchen Islands",
  },
  {
    label: "Chair",
    value1: "Armchairs",
    value2: "Office Chairs",
    value3: "Accent Chairs",
  },
  {
    label: "Decor",
    value1: "Wall Decor",
    value2: "Vases & Jars",
    value3: "Decorative Bowls",
  },
  {
    label: "Textiles",
    value1: "Cushions",
    value2: "Curtains",
    value3: "Rugs & Mats",
  },
  {
    label: "Mirrors",
    value1: "Wall Mirrors",
    value2: "Vanity Mirrors",
    value3: "Floor Mirrors",
  },
  {
    label: "Wall Art",
    value1: "Canvas Paintings",
    value2: "Photo Frames",
    value3: "Wall Stickers",
  },
  {
    label: "Clocks",
    value1: "Wall Clocks",
    value2: "Table Clocks",
    value3: "Alarm Clocks",
  },
  {
    label: "Vases",
    value1: "Ceramic Vases",
    value2: "Glass Vases",
    value3: "Metal Vases",
  },
  {
    label: "Candles",
    value1: "Scented Candles",
    value2: "Candlestick Holders",
    value3: "Tea Light Candles",
  },
  {
    label: "Shelves",
    value1: "Wall Shelves",
    value2: "Floating Shelves",
    value3: "Corner Shelves",
  },
  {
    label: "Plant Pots",
    value1: "Ceramic Pots",
    value2: "Plastic Pots",
    value3: "Hanging Pots",
  },
  {
    label: "Bathroom Accessories",
    value1: "Shower Curtains",
    value2: "Towel Racks",
    value3: "Toilet Brushes",
  },
];
// set
export const mockDatas = {
  /// set
  colors: [
    { label: "Orange", value: "orange" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
    { label: "Dark Gray", value: "dark gray" },
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Light beige", value: "light beige" },
  ],
  // styles
  styles: [
    { label: "Minimalist", value: "minimalist" },
    { label: "Eco Style", value: "eco style" },
    { label: "Glam", value: "glam" },
    { label: "Royal", value: "royal" },
    { label: "Pink rose", value: "pink rose" },
    { label: "Hi Tech", value: "hi tech" },
  ],
  // materila set
  materials: [
    { label: "Metal", value: "metal" },
    { label: "Plastic", value: "plastic" },
    { label: "Leather", value: "leather" },
    { label: "Marble", value: "marble" },
    { label: "Glass", value: "glass" },
    { label: "Rattan", value: "rattan" },
  ],
  // color
  colorSet: [
    { label: "Orange", value: "orange" },
    { label: "Blue", value: "blue" },
    { label: "Dark Gray", value: "dark gray" },
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Green", value: "green" },
    { label: "Light beige", value: "light beige" },
  ],
};
// name is label
export const mockData: any = [
  "Features:",
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
  "Count:",
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
// number type
export const NUMBER_FIELDS = [
  "Height",
  "Width",
  "Weight_KG",
  "LegHeight_CM",
  "discount",
  "cost",
  "StockNumber",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight"
];
