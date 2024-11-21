import { API_URL } from "@/utils/axios/constants";
import { getLanguageFromCookie } from "../commom";


export const getApiProduct = async (
  filmId?: string,
): Promise<any> => {
  const language = getLanguageFromCookie();
  const res = await fetch(`${API_URL}/api/productions?locale=${language}&pagination[page]=1&pagination[pageSize]=10&sort=createdAt:desc&populate=*`);
  const data = await res.json();
  return data;
};