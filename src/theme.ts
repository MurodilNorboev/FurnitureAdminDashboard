// import { createTheme, Theme } from "@mui/material";
// import { useMemo, useState, createContext, useCallback } from "react";

// // Ranglar: light va dark mod uchun ranglar
// export const tokens = (mode: "dark" | "light") => ({
//   ...(mode === "dark"
//     ? {
//         gray: {
//           100: "#e0e0e0",
//           200: "#c2c2c2",
//           300: "#a3a3a3",
//           400: "#858585",
//           500: "#666666",
//           600: "#525252",
//           700: "#3d3d3d",
//           800: "#292929",
//           900: "#141414",
//         },
//         primary: {
//           100: "#d0d1d5",
//           200: "#a1a4ab",
//           300: "#727681",
//           400: "#434957",
//           500: "#141b2d",
//           600: "#101624",
//           700: "#0c101b",
//           800: "#080b12",
//           900: "#040509",
//         },
//         greenAccent: {
//           500: "#4CAF50", // Yashil accent ranglari
//         },
//       }
//     : {
//         gray: {
//           100: "#141414",
//           200: "#292929",
//           300: "#3d3d3d",
//           400: "#525252",
//           500: "#666666",
//           600: "#858585",
//           700: "#a3a3a3",
//           800: "#c2c2c2",
//           900: "#e0e0e0",
//         },
//         primary: {
//           100: "#040509",
//           200: "#080b12",
//           300: "#0c101b",
//           400: "#fcfcfc",
//           500: "#f2f0f0",
//           600: "#434957",
//           700: "#727681",
//           800: "#a1a4ab",
//           900: "#d0d1d5",
//         },
//         greenAccent: {
//           500: "#4CAF50", // Yashil accent ranglari
//         },
//       }),
// });

// // Mui Tema sozlamalari
// export const themeSettings = (mode: "dark" | "light") => {
//   const colors = tokens(mode);

//   return {
//     palette: {
//       mode: mode,
//       ...(mode === "dark"
//         ? {
//             primary: {
//               main: colors.primary[500],
//             },
//             secondary: {
//               main: colors.greenAccent[500], // Yashil accent rangini ishlatish
//             },
//             neutral: {
//               dark: colors.gray[700],
//               main: colors.gray[500],
//               light: colors.gray[100],
//             },
//             background: {
//               default: colors.primary[500],
//             },
//           }
//         : {
//             primary: {
//               main: colors.primary[100],
//             },
//             secondary: {
//               main: colors.greenAccent[500], // Yashil accent rangini ishlatish
//             },
//             neutral: {
//               dark: colors.gray[700],
//               main: colors.gray[500],
//               light: colors.gray[100],
//             },
//             background: {
//               default: colors.primary[500],
//             },
//           }),
//     },
//     typography: {
//       fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//       fontSize: 12,
//       h1: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 14,
//       },
//     },
//   };
// };

// // Ranglar rejimini boshqaruvchi Context
// export const ColorModeContext = createContext<{
//   toggleColorMode: () => void;
// }>({
//   toggleColorMode: () => {},
// });

// // Custom hook (maxsus hook)
// export const useMode = (): [Theme, { toggleColorMode: () => void }] => {
//   const [mode, setMode] = useState<"dark" | "light">("dark");

//   // useCallback to'g'ridan-to'g'ri ishlatish
//   const toggleColorMode = useCallback(() => {
//     setMode((prev) => (prev === "light" ? "dark" : "light"));
//   }, []);

//   // Tema yaratish
//   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

//   return [theme, { toggleColorMode }];
// };

// theme.tsx

// theme.tsx

import { createTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";

// useMode hook'i orqali rang rejimlarini boshqarish
export const useMode = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)"); // Tizimni dark yoki light rejimiga qarab aniqlash
  const [mode, setMode] = useState<"light" | "dark">(prefersDarkMode ? "dark" : "light");

  // Rang rejimini tizimga qarab avtomatik ravishda o'zgartirish
  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  return createTheme({
    palette: {
      mode: mode,
    },
    typography: {
      fontFamily: ['"Source Sans Pro"', 'sans-serif'].join(','),
      fontSize: 12,
    },
  });
};
