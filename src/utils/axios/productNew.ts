import { API_URL } from "./constants";

interface FilmDataResquest {
    locale: string
}

export const getProductNew = async (props: FilmDataResquest) => {
    const { locale } = props
    const res = await fetch(`${API_URL}/api/productions?locale=${locale}&pagination[page]=1&pagination[pageSize]=4&sort=createdAt:desc&populate=*`, {
        next: { revalidate: 300 },
    });

    const data = await res.json();

    return { data: data };
};
