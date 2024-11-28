import { API_URL } from "@/utils/axios/constants";
import { getLanguageFromCookie } from "../commom";
import { StrapiQuery } from "../strapi-query";


interface ArticlesDataResquest {
    locale?: string;
    params: {
        page: number;
    }
    categoryId?: string
}
// Client
export const getApiListNews = async (props: ArticlesDataResquest): Promise<any> => {
    const { params, categoryId } = props

    const language = getLanguageFromCookie();

    // /api/articles?locale=en&pagination[page]=1&pagination[pageSize]=10&sort=createdAt:desc
    //&filters[category][slug][$eq]=tech&populate=*

    let query = new StrapiQuery('articles')
        .setLocale(language)
        .setPagination(9, params.page)
        .setSort('createdAt', 'desc')
    if (categoryId) {
        query.setFilterNews(categoryId)
    }

    const res = await fetch(`${query + `&populate=*`}`);
    const data = await res.json();
    return data;
};


interface ArticlesDataResquestSSR {
    locale: string;

}
export const getApiListNewsSSR = async (props: ArticlesDataResquestSSR): Promise<any> => {
    const { locale } = props
    const query = new StrapiQuery('articles')
        .setLocale(locale ?? "vi")
        .setPagination(5, 1)
        .setSort('createdAt', 'desc');

    const res = await fetch(`${query + `&populate=*`}`);
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




interface ProductDataDetailResquest {
    locale?: string;
    slug?: string;
}
// SSR
export const getApiNewsDetail = async (props: ProductDataDetailResquest): Promise<any> => {
    const { locale, slug } = props
    const res = await fetch(`${API_URL}/api/articles?locale=${locale}&filters[slug]=${slug}&populate[seo][populate]=*`);
    const data = await res.json();
    return data;
};

