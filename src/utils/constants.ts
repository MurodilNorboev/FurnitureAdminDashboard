// utils/constants.ts
export const baseAPI = process.env.REACT_APP_API_URL;

if (!baseAPI) {
    throw new Error("API URL is not defined");
} else {
    console.log("API URL is successfully defined");
}

// export const baseAPI = 'http://109.71.242.131:8082'
// export const baseAPI = 'http://localhost:8081'