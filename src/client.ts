import axios from "axios";

export const client = axios.create({
  baseURL: "https://samehadaku.day",
  maxRedirects: 1,
});
