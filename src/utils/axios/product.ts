import { API_URL } from "@/utils/axios/constants";
import { getLanguageFromCookie } from "../commom";
import { StrapiQuery } from "../strapi-query";


interface ProductDataResquest {
  locale?: string;
  categoryId?: string;
}

export const getApiProduct = async (props: ProductDataResquest): Promise<any> => {
  const { categoryId } = props

  const language = getLanguageFromCookie();

  const query = new StrapiQuery('productions')
    .setLocale(language)
    .setPagination(1000, false)
    .setSort('createdAt', 'desc');


  if (categoryId) {
    query.setFilter('product_category[id]', '$eq', categoryId);
  }

  const res = await fetch(`${query}` + `&populate=images`);
  const data = await res.json();
  return data;
};