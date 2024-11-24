import { API_URL } from "./constants";




export type ContactRequest = {
    email: string;
    fullname: string;
    phone: string;
    note: string
};


export const postContact = async (
    request: ContactRequest,
): Promise<any> => {
    const res = await fetch(`${API_URL}/api/contacts `, {
        body: JSON.stringify({
            data: {
                email: request.email,
                fullname: request.fullname,
                phone: request.phone,
                note: request.note,
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