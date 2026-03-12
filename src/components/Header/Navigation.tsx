"use client"
import { useLocale, useTranslations } from 'next-intl';
import MenuHeader from './MenuHeader';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/utils/commom';
import { gtag_event } from '@/utils/gtag';

export default function Navigation({ dataConfig, dataSocial }: any) {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const renderContent = () => {
    if (locale === "en") {
      return dataConfig?.en_sologan_header_logo
    }
    if (locale === "zh") {
      return dataConfig?.cn_sologan_header_logo
    }
    return dataConfig?.vn_sologan_header_logo
  }
  return (
    <>
      <header className='max-w-1200 w-[100%] px-[6px] xl:px-[0px] gap-y-[10px]  mr-auto ml-auto flex justify-between py-[5px] items-center flex-wrap'>
        <div className='flex items-center gap-[10px]'>
          <Link href="/" onClick={() =>
            gtag_event('logo_click', {
              event_category: 'navigation',
              event_label: 'header_logo',
            })
          }>
            <Image
              src={getImageUrl(dataConfig?.logo?.url)}
              alt="Logo_Home"
              width={90}
              height={60}
            />
          </Link>
          <div className='hidden sm:flex' style={{ alignItems: "center" }}>
            <div className="icon-home"></div>
            <div className="text">
              <p className='text-16 font-bold'>{renderContent()}</p>
            </div>
          </div>
        </div>

        <div className='flex gap-1 align-middle'>
          {dataSocial?.map((sc: any) => {
            if (sc?.type === "header") {
              return (
                <Link
                  href={sc?.url || ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    gtag_event('social_click', {
                      event_category: 'navigation',
                      event_label: sc?.name,
                      social_url: sc?.url,
                    })
                  }
                  key={sc?.id || sc?.url} // tránh warning: thêm key
                >
                  <Image
                    src={getImageUrl(sc?.image?.formats?.thumbnail?.url)}
                    alt={sc?.name}
                    width={24}
                    height={24}
                  />
                </Link>
              )
            }
          })}
        </div>
      </header>

      <MenuHeader />
    </>
  );
}
