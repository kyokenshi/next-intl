import { getLocale } from "next-intl/server";

export const getLanguageFromCookie = () => {
    try {
        // Check if we're on the client side
        if (typeof window !== 'undefined') {
            // Lấy cookie ở client side
            const value = `; ${document.cookie}`;
            const parts = value.split(`; NEXT_LOCALE=`);
            if (parts.length === 2) {
                const lang = parts.pop()?.split(';').shift();
                return lang || 'en';
            }
        }
        return 'en'; // fallback
    } catch (error) {
        console.error('Error getting language from cookie:', error);
        return 'en'; // fallback if error
    }
};

// Server-side version
export const getServerLanguage = async () => {
    try {
        const locale = await getLocale();
        return locale;
    } catch (error) {
        return 'en'; // fallback
    }
};

export const getImageUrl = (url: any) => {
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}${url}`;
};