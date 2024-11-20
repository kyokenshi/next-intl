import { API_URL } from "@/utils/axios/constants";
import { getLanguageFromCookie } from "../commom";


export const getCategoryProduct = async (
  filmId?: string,
): Promise<any> => {
  const language = getLanguageFromCookie();
  const res = await fetch(`${API_URL}/api/product-categories?locale=${language}&populate=*&pagination[pageSize]=1000`);
  const data = await res.json();
  return data;
};



export const getCategoryProductID = async (
  filmId?: string,
): Promise<any> => {
  const language = getLanguageFromCookie();

  const baseUrl = `${API_URL}/api/productions?locale=${language}&pagination[pageSize]=1000&pagination[withCount]=false&sort=createdAt:desc`;

  const url = filmId
    ? `${baseUrl}&filters[product_category][id][$eq]=${filmId}`
    : baseUrl;

  const res = await fetch(`${url}`);
  const data = await res.json();
  return data;
};