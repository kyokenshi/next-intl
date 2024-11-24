import { API_URL } from "./constants";

interface CheckPageResquest {
    locale?: string;
    slug?: string
}


export const getApiCheckPage = async (props: CheckPageResquest): Promise<any> => {
    const { locale, slug } = props
    const res = await fetch(`${API_URL}/api/pages?locale=${locale}&filters[slug]=${slug}`, {
        next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
};