import axios from "axios"
export default async function getImages(searchQuery, page = 1) {
  try {
    const BASIC_URL = `https://pixabay.com/api/`;
    const searchParams = new URLSearchParams({
      key: '29248530-2b5c64a89fa7cac0198f1c428',
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${page}`,
      per_page: 12,
    });

    const response = await axios(`${BASIC_URL}/?${searchParams}`);

    return response;
  } catch (error) {
    throw new Error(error);
  }
}