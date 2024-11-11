"use client"

import { Menu, MenuProps } from 'antd';
import React from 'react'
import { StyledMenu } from './styles';
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';
type Props = {}

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

type MenuItem = Required<MenuProps>['items'][number];


const MenuHeader = (props: Props) => {

  const { Search } = Input;


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
        { key: '12', label: 'Hướng dẫn thanh toán qua ngân lượng' },
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
    console.log('click', e);
  };
  return (
    <div className=' bg-blue-1000 '>
      <StyledMenu className='max-w-1200 mr-auto ml-auto flex justify-between items-center'>  <Menu onClick={onClick} mode='horizontal' className='menu-header' items={items} />
        <Search placeholder="Tìm kiếm sản phẩm " allowClear onSearch={onSearch} style={{ width: 200 }} /></StyledMenu>
    </div>
  )
}

export default MenuHeader