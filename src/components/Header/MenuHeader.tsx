"use client"
import { Menu, MenuProps } from 'antd';
import React from 'react'
import { StyledMenu } from './styles';
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';
import { useRouter } from 'next/navigation';
type Props = {}

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

type MenuItem = Required<MenuProps>['items'][number];

const { SubMenu } = Menu;



const MenuHeader = (props: Props) => {

  const router = useRouter();


  const { Search } = Input;

  const onTitleClick = (info: any) => {
    if (info.key === 'sub1') { // Sản phẩm
      router.push('/product');
    }
  };


  const items: MenuItem[] = [
    {
      key: '1',
      label: 'Trang chủ',
    },
    {
      key: '2',
      label: 'Giới thiệu',
    },

    {
      key: 'sub1',
      label: 'Sản phẩm',
      onTitleClick: (info) => onTitleClick(info),
      children: [
        {
          key: '3',
          label: 'Sản phẩm khuyến mãi',
        },
        {
          key: 'sub4',
          label: 'Thiết bị khai thác mỏ',
          children: [
            { key: '4', label: 'Cấp liệu rung' },
            { key: '5', label: 'Máy nghiền cát' },
            { key: '6', label: 'Máy nghiền đá' },
            { key: '7', label: 'Máy rửa cát' },
            { key: '8', label: 'Sàn phân loại' },
            { key: '9', label: 'Trạm nghiền' },
          ],
        },
        {
          key: 'sub5',
          label: 'Thiết bị xây dựng',
          children: [
            { key: '10', label: 'Cầu tháp' },
            { key: '11', label: 'Máy đầm đất' },
          ],
        },
      ],
    },

    {
      key: 'sub2',
      label: 'Hướng dẫn',
      children: [
        { key: '12', label: <span>Hướng dẫn thanh toán qua ngân lượng</span> },
        { key: '13', label: 'Hướng dẫn thanh toán' },
        { key: '14', label: 'Chuyển khoản ngân hàng' },
      ],
    },
    {
      key: '15',
      label: 'Tin tức',
    },
    {
      key: '16',
      label: 'Liên hệ',
    },
  ];

  const onSearch: any = (value: string) => {
    console.log(value);
  }


  const onClick: MenuProps['onClick'] = (e) => {
    console.log(e);

    if (e.key === 'sub1') { // Sản phẩm
      router.push('/products');
    }

    if (e.key === '14') { // Chuyển khoản ngân hàng
      router.push('/bank-transfer');
    }
    if (e.key === '13') { // Hướng dẫn thanh toán
      router.push('/payment-instruction');
    }
    if (e.key === '12') { // Hướng dẫn thanh toán qua ngân lượng
      router.push('/payment-for-instruction');
    }
    if (e.key === '15') { // Tin tức
      router.push('/news');
    }
  };




  return (
    <div className=' bg-blue-1000 '>
      <StyledMenu className='max-w-1200 mr-auto ml-auto flex justify-between items-center'>
        <Menu
          onClick={onClick}
          mode='horizontal'
          className='menu-header'
          items={items}
        />
        <Search placeholder="Tìm kiếm sản phẩm " allowClear onSearch={onSearch} style={{ width: 300 }} /></StyledMenu>
    </div>
  )
}

export default MenuHeader