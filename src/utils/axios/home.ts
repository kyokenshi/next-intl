import { API_URL } from "./constants";


interface ProductDataDetailResquest {
    locale?: string;
    slug?: string;
}
// SSR
export const getApiCategoryHome = async (): Promise<any> => {
    const res = await fetch(`${API_URL}/api/menu-home?locale=vi&populate[product_category][populate]=*`);
    const data = await res.json();
    return data;
};



export const getApiSliderbanner = async (): Promise<any> => {
    const res = await fetch(`${API_URL}/api/sliders?populate=*`);
    const data = await res.json();
    return data;
};




interface ProductDataSliderSectionResquest {
    locale?: string;
}
export const getApiSliderSection = async (props: ProductDataSliderSectionResquest): Promise<any> => {
    const { locale } = props
    const res = await fetch(`${API_URL}/api/sections?locale=${locale}&populate[product_list][populate][productions][populate]=images`, {
        next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
};


export const getApiPartner = async (): Promise<any> => {
    const res = await fetch(`${API_URL}/api/clients?populate=* `, {
        next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
};
