import { useTranslations } from 'next-intl';
import LocaleSwitcher from '../LocaleSwitcher';
import MenuHeader from './MenuHeader';
import { Affix } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  const t = useTranslations('Navigation');


  return (
    <>
      <header className='max-w-1200 w-[100%]  mr-auto ml-auto flex justify-between py-[5px] items-center flex-wrap'>
        <div className='flex items-center gap-[10px]'>
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="Logo_Home"
              width={90}
              height={60}
            />
          </Link>
          <div className='hidden sm:flex   align-middle'>
            <div className="icon-home"></div>
            <div className="text"><p className='text-12'>Tòa nhà Hòa Phát</p><p className='text-12'>Hoàng Mai, Hà Nội</p></div>
          </div>
        </div>

        <div className='hidden sm:flex align-middle'>
          <div className="icon-mail mr-1" ></div>
          <div className="text"><p className='text-12'> Hoaphatthietbi.banhang@gmail.com</p><p className='text-12'> 0983.884.194</p></div>
        </div>

        <div className='hidden sm:flex align-middle'>
          <div className="text"><p className='text-16 font-semibold'> Giỏ hàng</p><p className='text-14'>10 sản phẩm - 10vnd</p></div>
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
