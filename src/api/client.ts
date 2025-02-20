/**
 * This file configures and exports an Axios instance for making HTTP requests
 * to the RapidAPI flight data service. It sets up the base URL and required
 * authentication headers using environment variables.
 */

import axios from "axios";
import { env } from "../config/env";

export const apiClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    "x-rapidapi-key": `${env.VITE_API_KEY}`,
    "x-rapidapi-host": `${env.VITE_API_HOST}`,
  },
});
