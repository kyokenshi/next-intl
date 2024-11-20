import { cache } from "react";

import { API_URL } from "@/utils/axios/constants";
import { getLanguageFromCookie } from "../commom";


// export type HeaderDataResponse = {
//   genres: HeaderDataItem[];
//   countries: HeaderDataItem[];
// };

const fetchHeaderData = async (): Promise<any> => {
  const language = getLanguageFromCookie();
  const res = await fetch(`${API_URL}/api/main-menu?locale=${language}&populate[MainMenuItems][populate]=*`);
  const data = await res.json();

  return data.data;
};

export const getHeaderData = cache(fetchHeaderData);
