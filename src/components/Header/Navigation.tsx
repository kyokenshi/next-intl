import { useTranslations } from 'next-intl';
import LocaleSwitcher from '../LocaleSwitcher';
import MenuHeader from './MenuHeader';
import { Affix } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/utils/commom';

export default function Navigation({ dataConfig }: any) {
  const t = useTranslations('Navigation');

  return (
    <>
      <header className='max-w-1200 w-[100%] px-[6px] xl:px-[0px] gap-y-[10px]  mr-auto ml-auto flex justify-between py-[5px] items-center flex-wrap'>
        <div className='flex items-center gap-[10px]'>
          <Link href="/">
            <Image
              src={getImageUrl(dataConfig?.logo?.url)}
              alt="Logo_Home"
              width={90}
              height={60}
            />
          </Link>
          <div className='hidden sm:flex' style={{ alignItems: "center" }}>
            <div className="icon-home"></div>
            <div className="text"><p className='text-16 font-bold'>{dataConfig?.address}</p>
              {/* <p className='text-12 font-bold'>Hoàng Mai, Hà Nội</p> */}
            </div>
          </div>
        </div>

        <div className='hidden sm:flex align-middle'>
          <div className="icon-mail mr-1" ></div>
          <div className="text"><p className='text-16 font-bold'>{dataConfig?.email}</p><p className='text-16 font-bold'>{dataConfig?.phone}</p></div>
        </div>


        <nav className=''>
          <LocaleSwitcher />
        </nav>
      </header>
      {/* <Affix> */}
      <MenuHeader />
      {/* </Affix> */}
    </>
  );
}
