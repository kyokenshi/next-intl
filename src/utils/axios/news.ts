import { API_URL } from "@/utils/axios/constants";
import { getLanguageFromCookie } from "../commom";


export const getApiListNews = async (
    filmId?: string,
): Promise<any> => {
    const language = getLanguageFromCookie();
    const res = await fetch(`${API_URL}/api/articles?locale=${language}&populate=*`);
    const data = await res.json();
    return data;
};