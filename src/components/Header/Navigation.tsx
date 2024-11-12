import { useTranslations } from 'next-intl';
import LocaleSwitcher from '../LocaleSwitcher';
import MenuHeader from './MenuHeader';
import { Affix } from 'antd';

export default function Navigation() {
  const t = useTranslations('Navigation');

  return (
    <>
      <header className='max-w-1200  mr-auto ml-auto flex justify-between py-[5px] items-center'>
        <nav className=''>
          <LocaleSwitcher />
        </nav>
        <img src='https://hoaphatthietbi.com/wp-content/uploads/2023/01/logo1.png' alt='IMG' style={{
          maxHeight: 57,
          width: 175
        }}></img>
        <div className='flex align-middle'>
          <div className="icon-home"></div>
          <div className="text"><p className='text-12'>Tòa nhà Hòa Phát</p><p className='text-12'>Hoàng Mai, Hà Nội</p></div>
        </div>
        <div className='flex align-middle'>
          <div className="icon-mail mr-1" ></div>
          <div className="text"><p className='text-12'> Hoaphatthietbi.banhang@gmail.com</p><p className='text-12'> 0983.884.194</p></div>
        </div>

        <div className='flex align-middle'>
          <div className="text"><p className='text-16 font-semibold'> Giỏ hàng</p><p className='text-14'>10 sản phẩm - 10vnd</p></div>
        </div>
      </header>
      <Affix>
        <MenuHeader />
      </Affix>
    </>
  );
}
