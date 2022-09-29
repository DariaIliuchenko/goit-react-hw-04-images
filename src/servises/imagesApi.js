import axios from "axios"
const BASIC_URL = `https://pixabay.com/api/`;
export default async function getImages(searchQuery, page = 1) {
  
    
    const searchParams = new URLSearchParams({
      key: '29248530-2b5c64a89fa7cac0198f1c428',
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${page}`,
      per_page: 12,
    });

    const url = `${BASIC_URL}?&${searchParams}`;
  const response = await axios.get(url);

    return response.data;
  
}