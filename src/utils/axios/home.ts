import { cache } from "react";
import { API_URL } from "./constants";


interface ProductDataDetailResquest {
    locale?: string;
    slug?: string;
}
// SSR
export const getApiCategoryHome = async (locale: string): Promise<any> => {
    const res = await fetch(`${API_URL}/api/menu-home?locale=${locale}&populate[product_category][populate]=*`);
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


export const getApiPartner = async (props: ProductDataSliderSectionResquest): Promise<any> => {
    const { locale } = props

    const res = await fetch(`${API_URL}/api/clients?locale=${locale}&populate[clients][populate]=* `, {
        next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
};


interface ProductDataConfigResquest {
    locale?: string;
}

const getApiConfig = async (props: ProductDataConfigResquest): Promise<any> => {
    const { locale } = props
    const res = await fetch(`${API_URL}/api/setting-website?locale=${locale}&populate[logo][populate]=*&populate[seo][populate]=*`, {
        next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
};

export const getConfigData = cache(getApiConfig);




interface ProductDataArticleResquest {
    locale?: string;
}


export const getApiListCategoryArticleHome = async (props: ProductDataArticleResquest): Promise<any> => {
    const { locale } = props
    const res = await fetch(`${API_URL}/api/articles?locale=${locale}&pagination[page]=1&pagination[pageSize]=3&sort=createdAt:desc&populate=*`);
    const data = await res.json();
    return data;
};

export const getApiListLocel = async (): Promise<any> => {
    const res = await fetch(`${API_URL}/api/i18n/locales`, {
        next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
};


interface ProductDataServiceResquest {
    locale?: string;
}
export const getApiService = async (props: ProductDataServiceResquest): Promise<any> => {
    const { locale } = props

    const res = await fetch(`${API_URL}/api/service?locale=${locale}&populate[services][populate]=image`, {
        next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
};


export type SubscribeEmailRequest = {
    email: string;
};


export const subscribeEmail = async (
    request: SubscribeEmailRequest,
): Promise<any> => {
    const res = await fetch(`${API_URL}/api/subscribe-to-our-newsletters`, {
        body: JSON.stringify({
            data: {
                email: request.email,
            }
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    const data = await res.json();
    return data;
};

export const getApiSocials = async (): Promise<any> => {
    const res = await fetch(`${API_URL}/api/socials?populate=*`, {
        next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
};