"use client"
import { useLocale } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { getApiListLocel } from '@/utils/axios/home';
import { useEffect, useState } from 'react';

export default function LocaleSwitcher() {

  const locale = useLocale();




  const [data, setData] = useState([])

  const onGetAPI = async () => {
    const data = await getApiListLocel()
    setData(data)
  }

  const onGetIcon = (code: string) => {
    const icon: { [key: string]: JSX.Element } = {
      "vi": <span>🇻🇳</span>,
      "en": <span>🇺🇸</span>,
      "zh": <span>🇨🇳</span>
    }
    return icon[code] ?? <span>🇺🇸</span>
  }

  useEffect(() => {
    onGetAPI()
  }, [])


  return (
    <LocaleSwitcherSelect defaultValue={locale} label={""}>
      {data?.map((cur: any) => (
        <option key={cur} value={cur.code}>
          {onGetIcon(cur.code)}  {cur.name}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
