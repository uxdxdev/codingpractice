export const API_KEY = import.meta.env.VITE_API_KEY;
export const SHEET_ID = "1qu8-hCd7ufFi4k6XdTo5x45WVgtpVXMeURSX-xz10gk";
export const SHEET_NAME_DATABASE = "database";
export const SHEET_DATABASE_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME_DATABASE}?key=${API_KEY}`;
export const intervals: number[] = [1, 3, 7, 14, 28];
