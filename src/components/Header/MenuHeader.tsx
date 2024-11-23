"use client"
import { Affix, Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react'
import { StyledMenu } from './styles';
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';
import { useRouter } from 'next/navigation';
import { getHeaderData } from '@/utils/axios/header';
type Props = {}

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

type MenuItem = Required<MenuProps>['items'][number];

const { SubMenu } = Menu;



const MenuHeader = (props: Props) => {

  const router = useRouter();


  const [masterData, setMasterData] = useState<any>();

  // const onTitleClick = (info: any) => {
  //   router.push(`/${info.url}`);
  // }

  const transformMenuData = (data: any[]) => {

    return data.map(item => {
      if (item.__component === 'menu.nolink') {
        return {
          key: item.id.toString(),
          label: item.title,
          url: item.url,
          __component: item.__component
        };
      }
      if (item.__component === 'menu.page') {
        return {
          key: item.id.toString(),
          label: item.title,
          url: "news",
          __component: item.__component
        };
      }

      if (item.__component === 'menu.dropdown') {
        return {
          key: `${item.id}`,
          label: item.title,
          url: item.url,
          // onTitleClick: () => onTitleClick(item),
          __component: item.__component,
          children: item.product_category ? [
            {
              key: item.product_category.id.toString(),
              label: item.product_category.title,
              url: item.product_category.url,
            }
          ] : undefined
        };
      }

      return null;
    }).filter(Boolean);
  };




  useEffect(() => {
    (async () => {
      try {
        const data = await getHeaderData();
        if (data?.MainMenuItems?.length > 0) {
          const transformedItems = transformMenuData(data.MainMenuItems);
          setMasterData(transformedItems);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const { Search } = Input;



  const onSearch: any = (value: string) => {
    console.log(value);
  }

  const findDeepItem = (keyPath: string[], items: any[]): any => {
    const [childKey, parentKey] = keyPath;

    // Nếu có parentKey, tìm parent trước
    if (parentKey) {
      const parent = items.find(item => item.key === parentKey);
      if (parent?.children) {
        const child = parent.children.find((child: any) => child.key === childKey);
        if (child) {
          // Trả về child với URL được combine từ parent
          return {
            ...child,
            url: `danh-muc-san-pham/${child.url}`,
            parentKey: parent.key,
            __component: parent.__component
          };
        }
      }
    }

    // Nếu không có parentKey hoặc không tìm thấy child
    return items.find(item => item.key === childKey);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    const { keyPath } = e;
    const clickedItem = findDeepItem(keyPath, masterData);

    if (clickedItem) {
      const { __component, url } = clickedItem;

      const routes: any = {
        'menu.page': () => router.push(`/${url}`),
        'menu.nolink': () => {
          if (url === "trang-chu" || url === "home") {
            return router.push(`/`);
          }
          return router.push(`/${url}`);
        },
        'menu.dropdown': () => router.push(`/${url}`)
      };
      // Gọi hàm tương ứng với __component
      routes[__component]?.();
    }
  };


  return (
    <Affix>
      <div className='min-h-[46px] bg-blue-1000 '>
        <StyledMenu className='max-w-1200 px-[16px] xl:px-[0] mr-auto ml-auto flex justify-between items-center'>
          <Menu
            onClick={onClick}
            mode='horizontal'
            rootClassName='menu-header'
            items={masterData}
          />
          {/* <div className='min-h-[46px] flex items-center min-w-[auto] md:min-w-[300px]'>
            <Search placeholder="Tìm kiếm sản phẩm " allowClear onSearch={onSearch} />
          </div> */}
        </StyledMenu>
      </div>
    </Affix>
  )
}

export default MenuHeader