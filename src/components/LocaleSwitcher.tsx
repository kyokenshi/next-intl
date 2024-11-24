"use client"
import { useLocale } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { getApiListLocel } from '@/utils/axios/home';
import { useParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState, useTransition } from 'react';
import { Select, Space } from 'antd';
import { Locale, usePathname, useRouter } from '@/i18n/routing';

export default function LocaleSwitcher() {

  const locale = useLocale();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<any>(locale)
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(e: any) {
    const nextLocale = e as any;
    startTransition(() => {
      setValue(nextLocale)
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: `${nextLocale}` }
      );
    });
  }

  const [data, setData] = useState<any[]>([])

  const onGetAPI = async () => {
    const data = await getApiListLocel()
    if (data) {
      const newData = data.map((el: any) => {
        return {
          label: el.name,
          value: el.code,
          emoji: onGetIcon(el.code)
        }
      })
      setData(newData)
    }
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
    <Select
      onChange={onSelectChange}
      options={data}
      disabled={isPending}
      popupClassName='select-transaction'
      value={value}
      defaultValue={locale}
      optionRender={(option) => (
        <Space>
          <span role="img" aria-label={option.data.label}>
            {option.data.emoji} {option.data.label}
          </span>
        </Space>
      )}
    />


  );
}
