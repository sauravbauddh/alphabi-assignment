import axios from "axios";

const API_KEY = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
const BASE_URL = "https://api.giphy.com/v1/gifs";

export const fetchGifs = async (
  searchTerm: any,
  pageNumber = 1,
  pageSize = 10
) => {
  try {
    const offset = (pageNumber - 1) * pageSize;
    const response = await axios.get(
      `${BASE_URL}/search?api_key=${API_KEY}&q=${searchTerm}&limit=${pageSize}&offset=${offset}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    throw error;
  }
};
