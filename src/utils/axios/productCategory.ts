import { API_URL } from "@/utils/axios/constants";
import { getLanguageFromCookie } from "../commom";
import { StrapiQuery } from "../strapi-query";


export const getCategoryProduct = async (
  filmId?: string,
): Promise<any> => {
  const language = getLanguageFromCookie();
  const res = await fetch(`${API_URL}/api/product-categories?locale=${language}&populate=*&pagination[pageSize]=1000`);
  const data = await res.json();
  return data;
};



export const getCategoryProductID = async (
  categoryId?: string,
): Promise<any> => {
  const language = getLanguageFromCookie();

  const query = new StrapiQuery('productions')
    .setLocale(language)
    .setPagination(1000, false)
    .setSort('createdAt', 'desc');

  if (categoryId) {
    query.setFilter('product_category[id]', '$eq', categoryId);
  }


  const res = await fetch(`${query}`);
  const data = await res.json();
  return data;
};