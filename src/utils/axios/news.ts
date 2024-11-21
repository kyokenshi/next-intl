import { API_URL } from "@/utils/axios/constants";
import { getLanguageFromCookie } from "../commom";

// Client
export const getApiListNews = async (
    filmId?: string,
): Promise<any> => {
    const language = getLanguageFromCookie();
    const res = await fetch(`http://159.89.205.46:1337/api/articles?locale=vi&pagination[page]=1&pagination[pageSize]=10&sort=createdAt:desc&populate=*`);
    const data = await res.json();
    return data;
};


interface ListCategoryArticle {
    locale?: string;
    slug?: string;
}
// SSR 
export const getApiListCategoryArticle = async (props: ListCategoryArticle): Promise<any> => {
    const { locale } = props

    const res = await fetch(`${API_URL}/api/categories?locale=${locale}&pagination[page]=1&pagination[pageSize]=1000&sort=createdAt:desc`);
    const data = await res.json();
    return data;
};



