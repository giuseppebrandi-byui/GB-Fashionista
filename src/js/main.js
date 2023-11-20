const baseURL = import.meta.env.VITE_SERVER_URL;
import { showHeroImage } from "./main.mjs";

showHeroImage();
console.log("This is the baseUrl: ", baseURL);
console.log("This is process.env: ", process.env.VITE_SERVER_URL);
