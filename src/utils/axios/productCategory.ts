import { API_URL } from "@/utils/axios/constants";
import { getLanguageFromCookie, getServerLanguage } from "../commom";
import { StrapiQuery } from "../strapi-query";


// TODO: api ssr
// export const getCategoryProduct = async (
//   filmId?: string,
// ): Promise<any> => {
//   const language = getServerLanguage();
//   const res = await fetch(`${API_URL}/api/product-categories?locale=${language}&populate=*&pagination[pageSize]=1000`);
//   const data = await res.json();
//   return data;
// };

// TODO: api ssr

interface FilmDataResquest {
  locale: string
}

export const getCategoryProduct = async (props: FilmDataResquest) => {
  const { locale } = props
  const res = await fetch(`${API_URL}/api/product-categories?locale=${locale}&populate=*&pagination[pageSize]=1000`, {
    next: { revalidate: 300 },
  });

  const data = await res.json();

  return { data: data };
};



export const getCategoryProductID = async (
  categoryId?: string,
): Promise<any> => {
  const language = getLanguageFromCookie();

  const query = new StrapiQuery('productions')
    .setLocale(language)
    .setPagination(1000)
    .setSort('createdAt', 'desc');

  if (categoryId) {
    query.setFilter('product_category[id]', '$eq', categoryId);
  }


  const res = await fetch(`${query}`);
  const data = await res.json();
  return data;
};