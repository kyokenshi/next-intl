import { API_URL } from "@/utils/axios/constants";
import { getLanguageFromCookie } from "../commom";
import { StrapiQuery } from "../strapi-query";


interface ProductDataResquest {
  locale?: string;
  categoryId?: string;
  params: {
    page: number;
  }
}
// Client

export const getApiProduct = async (props: ProductDataResquest): Promise<any> => {
  const { categoryId, params } = props

  const language = getLanguageFromCookie();

  const query = new StrapiQuery('productions')
    .setLocale(language)
    .setPagination(9, true, params.page)
    .setSort('createdAt', 'desc');


  if (categoryId) {
    query.setFilter('product_category[id]', '$eq', categoryId);
  }

  const res = await fetch(`${query}` + `&populate=images`);
  const data = await res.json();
  return data;
};



interface ProductDataDetailResquest {
  locale?: string;
  slug?: string;
}
// SSR
export const getApiProductDetail = async (props: ProductDataDetailResquest): Promise<any> => {
  const { locale, slug } = props

  const res = await fetch(`${API_URL}/api/productions?locale=${locale}&filters[slug]=${slug}&populate=*`);
  const data = await res.json();
  return data;
};



interface FilmDataResquest {
  locale: string
}
// SSR
export const getProductNew = async (props: FilmDataResquest) => {
  const { locale } = props
  const res = await fetch(`${API_URL}/api/productions?locale=${locale}&pagination[page]=1&pagination[pageSize]=4&sort=createdAt:desc&populate=*`, {
    next: { revalidate: 300 },
  });

  const data = await res.json();

  return { data: data };
};


