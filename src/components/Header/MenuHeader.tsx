'use client';
import { Affix, Menu, MenuProps, Popover } from 'antd';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { StyledMenu } from './styles';
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { getHeaderData } from '@/utils/axios/header';
import { GlobalOutlined, SearchOutlined } from '@ant-design/icons';
import { useLocale } from 'next-intl';

import { Locale, usePathname } from '@/i18n/routing';

import { useRouter as useRouterI18 } from '@/i18n/routing';
import { getApiListLocel } from '@/utils/axios/home';

type Props = {};

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

type MenuItem = Required<MenuProps>['items'][number];

const { SubMenu } = Menu;

const MenuHeader = (props: Props) => {
  const router = useRouter();

  const [masterData, setMasterData] = useState<any>();

  // const onTitleClick = (info: any) => {
  //    router.push (`/${info.url}`);
  // }

  const transformMenuData = (data: any[]) => {
    return data
      .map((item) => {
        if (item.__component === 'menu.nolink') {
          return {
            key: `${item.id.toString() + item.__component}`,
            label: item.title,
            url: item.url,
            __component: item.__component
          };
        }
        if (item.__component === 'menu.page') {
          return {
            key: `${item.id.toString() + item.__component}`,
            label: item.title,
            url: item?.page?.slug,
            __component: item.__component
          };
        }

        if (item.__component === 'menu.dropdown') {
          return {
            key: `${item.id + item.documentId}`,
            label: item.title,
            url: item.url,
            // onTitleClick: () => onTitleClick(item),
            __component: item.__component,
            children: item.product_categories
              ? item.product_categories.map((el: any) => {
                return {
                  key: el.id.toString(),
                  label: el.title,
                  url: el.url
                };
              })
              : undefined
          };
        }

        return null;
      })
      .filter(Boolean);
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

  const onSearch: any = (value: string) => {
    router.push(`/product?search=${encodeURIComponent(value)}`);
  };

  const findDeepItem = (keyPath: string[], items: any[]): any => {
    const [childKey, parentKey] = keyPath;

    // Nếu có parentKey, tìm parent trước
    if (parentKey) {
      const parent = items.find((item) => item.key === parentKey);
      if (parent?.children) {
        const child = parent.children.find(
          (child: any) => child.key === childKey
        );
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
    return items.find((item) => item.key === childKey);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    const { keyPath } = e;
    const clickedItem = findDeepItem(keyPath, masterData);

    if (clickedItem) {
      const { __component, url } = clickedItem;

      const routes: any = {
        'menu.page': () => router.push(`/${url}`),
        'menu.nolink': () => {
          if (url === 'trang-chu' || url === 'home') {
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

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLDivElement | null>(null); // Specify the type for searchRef

  // Hàm kiểm tra khi click ra ngoài
  const handleClickOutside = (event: any) => {
    if (searchRef.current && !searchRef.current?.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Gắn sự kiện khi component mount
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const locale = useLocale();

  const routeri18 = useRouterI18();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<any>(locale);
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(e: any) {
    setOpenLanguage(false);
    const nextLocale = e as any;
    startTransition(() => {
      setValue(nextLocale);
      routeri18.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: `${nextLocale}` }
      );
    });
  }

  const [data, setData] = useState<any[]>([]);

  const [openLanguage, setOpenLanguage] = useState(false);

  const onGetAPI = async () => {
    const data = await getApiListLocel();
    if (data) {
      const newData = data.map((el: any) => {
        return {
          label: el.name,
          value: el.code,
          emoji: onGetIcon(el.code)
        };
      });
      setData(newData);
    }
  };

  const onGetIcon = (code: string) => {
    const icon: { [key: string]: JSX.Element } = {
      vi: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
        >
          <rect
            x="1"
            y="4"
            width="24"
            height="24"
            rx="4"
            ry="4"
            fill="#c93728"
          ></rect>
          <path
            d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
            opacity=".15"
          ></path>
          <path
            d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
            fill="#fff"
            opacity=".2"
          ></path>
          <path
            fill="#ff5"
            d="M18.008 16.366L21.257 14.006 17.241 14.006 16 10.186 14.759 14.006 10.743 14.006 13.992 16.366 12.751 20.186 16 17.825 19.249 20.186 18.008 16.366z"
          ></path>
        </svg>
      ),
      en: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
        >
          <rect
            x="1"
            y="4"
            width="24"
            height="24"
            rx="4"
            ry="4"
            fill="#fff"
          ></rect>
          <path
            d="M1.638,5.846H30.362c-.711-1.108-1.947-1.846-3.362-1.846H5c-1.414,0-2.65,.738-3.362,1.846Z"
            fill="#a62842"
          ></path>
          <path
            d="M2.03,7.692c-.008,.103-.03,.202-.03,.308v1.539H31v-1.539c0-.105-.022-.204-.03-.308H2.03Z"
            fill="#a62842"
          ></path>
          <path fill="#a62842" d="M2 11.385H31V13.231H2z"></path>
          <path fill="#a62842" d="M2 15.077H31V16.923000000000002H2z"></path>
          <path fill="#a62842" d="M1 18.769H31V20.615H1z"></path>
          <path
            d="M1,24c0,.105,.023,.204,.031,.308H30.969c.008-.103,.031-.202,.031-.308v-1.539H1v1.539Z"
            fill="#a62842"
          ></path>
          <path
            d="M30.362,26.154H1.638c.711,1.108,1.947,1.846,3.362,1.846H27c1.414,0,2.65-.738,3.362-1.846Z"
            fill="#a62842"
          ></path>
          <path
            d="M5,4h11v12.923H1V8c0-2.208,1.792-4,4-4Z"
            fill="#102d5e"
          ></path>
          <path
            d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
            opacity=".15"
          ></path>
          <path
            d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
            fill="#fff"
            opacity=".2"
          ></path>
          <path
            fill="#fff"
            d="M4.601 7.463L5.193 7.033 4.462 7.033 4.236 6.338 4.01 7.033 3.279 7.033 3.87 7.463 3.644 8.158 4.236 7.729 4.827 8.158 4.601 7.463z"
          ></path>
          <path
            fill="#fff"
            d="M7.58 7.463L8.172 7.033 7.441 7.033 7.215 6.338 6.989 7.033 6.258 7.033 6.849 7.463 6.623 8.158 7.215 7.729 7.806 8.158 7.58 7.463z"
          ></path>
          <path
            fill="#fff"
            d="M10.56 7.463L11.151 7.033 10.42 7.033 10.194 6.338 9.968 7.033 9.237 7.033 9.828 7.463 9.603 8.158 10.194 7.729 10.785 8.158 10.56 7.463z"
          ></path>
          <path
            fill="#fff"
            d="M6.066 9.283L6.658 8.854 5.927 8.854 5.701 8.158 5.475 8.854 4.744 8.854 5.335 9.283 5.109 9.979 5.701 9.549 6.292 9.979 6.066 9.283z"
          ></path>
          <path
            fill="#fff"
            d="M9.046 9.283L9.637 8.854 8.906 8.854 8.68 8.158 8.454 8.854 7.723 8.854 8.314 9.283 8.089 9.979 8.68 9.549 9.271 9.979 9.046 9.283z"
          ></path>
          <path
            fill="#fff"
            d="M12.025 9.283L12.616 8.854 11.885 8.854 11.659 8.158 11.433 8.854 10.702 8.854 11.294 9.283 11.068 9.979 11.659 9.549 12.251 9.979 12.025 9.283z"
          ></path>
          <path
            fill="#fff"
            d="M6.066 12.924L6.658 12.494 5.927 12.494 5.701 11.799 5.475 12.494 4.744 12.494 5.335 12.924 5.109 13.619 5.701 13.19 6.292 13.619 6.066 12.924z"
          ></path>
          <path
            fill="#fff"
            d="M9.046 12.924L9.637 12.494 8.906 12.494 8.68 11.799 8.454 12.494 7.723 12.494 8.314 12.924 8.089 13.619 8.68 13.19 9.271 13.619 9.046 12.924z"
          ></path>
          <path
            fill="#fff"
            d="M12.025 12.924L12.616 12.494 11.885 12.494 11.659 11.799 11.433 12.494 10.702 12.494 11.294 12.924 11.068 13.619 11.659 13.19 12.251 13.619 12.025 12.924z"
          ></path>
          <path
            fill="#fff"
            d="M13.539 7.463L14.13 7.033 13.399 7.033 13.173 6.338 12.947 7.033 12.216 7.033 12.808 7.463 12.582 8.158 13.173 7.729 13.765 8.158 13.539 7.463z"
          ></path>
          <path
            fill="#fff"
            d="M4.601 11.104L5.193 10.674 4.462 10.674 4.236 9.979 4.01 10.674 3.279 10.674 3.87 11.104 3.644 11.799 4.236 11.369 4.827 11.799 4.601 11.104z"
          ></path>
          <path
            fill="#fff"
            d="M7.58 11.104L8.172 10.674 7.441 10.674 7.215 9.979 6.989 10.674 6.258 10.674 6.849 11.104 6.623 11.799 7.215 11.369 7.806 11.799 7.58 11.104z"
          ></path>
          <path
            fill="#fff"
            d="M10.56 11.104L11.151 10.674 10.42 10.674 10.194 9.979 9.968 10.674 9.237 10.674 9.828 11.104 9.603 11.799 10.194 11.369 10.785 11.799 10.56 11.104z"
          ></path>
          <path
            fill="#fff"
            d="M13.539 11.104L14.13 10.674 13.399 10.674 13.173 9.979 12.947 10.674 12.216 10.674 12.808 11.104 12.582 11.799 13.173 11.369 13.765 11.799 13.539 11.104z"
          ></path>
          <path
            fill="#fff"
            d="M4.601 14.744L5.193 14.315 4.462 14.315 4.236 13.619 4.01 14.315 3.279 14.315 3.87 14.744 3.644 15.44 4.236 15.01 4.827 15.44 4.601 14.744z"
          ></path>
          <path
            fill="#fff"
            d="M7.58 14.744L8.172 14.315 7.441 14.315 7.215 13.619 6.989 14.315 6.258 14.315 6.849 14.744 6.623 15.44 7.215 15.01 7.806 15.44 7.58 14.744z"
          ></path>
          <path
            fill="#fff"
            d="M10.56 14.744L11.151 14.315 10.42 14.315 10.194 13.619 9.968 14.315 9.237 14.315 9.828 14.744 9.603 15.44 10.194 15.01 10.785 15.44 10.56 14.744z"
          ></path>
          <path
            fill="#fff"
            d="M13.539 14.744L14.13 14.315 13.399 14.315 13.173 13.619 12.947 14.315 12.216 14.315 12.808 14.744 12.582 15.44 13.173 15.01 13.765 15.44 13.539 14.744z"
          ></path>
        </svg>
      ),
      zh: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
        >
          <rect
            x="1"
            y="4"
            width="24"
            height="24"
            rx="4"
            ry="4"
            fill="#db362f"
          ></rect>
          <path
            d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
            opacity=".15"
          ></path>
          <path
            fill="#ff0"
            d="M7.958 10.152L7.19 7.786 6.421 10.152 3.934 10.152 5.946 11.614 5.177 13.979 7.19 12.517 9.202 13.979 8.433 11.614 10.446 10.152 7.958 10.152z"
          ></path>
          <path
            fill="#ff0"
            d="M12.725 8.187L13.152 8.898 13.224 8.072 14.032 7.886 13.269 7.562 13.342 6.736 12.798 7.361 12.035 7.037 12.461 7.748 11.917 8.373 12.725 8.187z"
          ></path>
          <path
            fill="#ff0"
            d="M14.865 10.372L14.982 11.193 15.37 10.46 16.187 10.602 15.61 10.007 15.997 9.274 15.253 9.639 14.675 9.044 14.793 9.865 14.048 10.23 14.865 10.372z"
          ></path>
          <path
            fill="#ff0"
            d="M15.597 13.612L16.25 13.101 15.421 13.13 15.137 12.352 14.909 13.149 14.081 13.179 14.769 13.642 14.541 14.439 15.194 13.928 15.881 14.391 15.597 13.612z"
          ></path>
          <path
            fill="#ff0"
            d="M13.26 15.535L13.298 14.707 12.78 15.354 12.005 15.062 12.46 15.754 11.942 16.402 12.742 16.182 13.198 16.875 13.236 16.047 14.036 15.827 13.26 15.535z"
          ></path>
          <path
            d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
            fill="#fff"
            opacity=".2"
          ></path>
        </svg>
      )
    };
    return (
      icon[code] ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <rect
            x="1"
            y="4"
            width="30"
            height="24"
            rx="4"
            ry="4"
            fill="#fff"
          ></rect>
          <path
            d="M1.638,5.846H30.362c-.711-1.108-1.947-1.846-3.362-1.846H5c-1.414,0-2.65,.738-3.362,1.846Z"
            fill="#a62842"
          ></path>
          <path
            d="M2.03,7.692c-.008,.103-.03,.202-.03,.308v1.539H31v-1.539c0-.105-.022-.204-.03-.308H2.03Z"
            fill="#a62842"
          ></path>
          <path fill="#a62842" d="M2 11.385H31V13.231H2z"></path>
          <path fill="#a62842" d="M2 15.077H31V16.923000000000002H2z"></path>
          <path fill="#a62842" d="M1 18.769H31V20.615H1z"></path>
          <path
            d="M1,24c0,.105,.023,.204,.031,.308H30.969c.008-.103,.031-.202,.031-.308v-1.539H1v1.539Z"
            fill="#a62842"
          ></path>
          <path
            d="M30.362,26.154H1.638c.711,1.108,1.947,1.846,3.362,1.846H27c1.414,0,2.65-.738,3.362-1.846Z"
            fill="#a62842"
          ></path>
          <path
            d="M5,4h11v12.923H1V8c0-2.208,1.792-4,4-4Z"
            fill="#102d5e"
          ></path>
          <path
            d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
            opacity=".15"
          ></path>
          <path
            d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
            fill="#fff"
            opacity=".2"
          ></path>
          <path
            fill="#fff"
            d="M4.601 7.463L5.193 7.033 4.462 7.033 4.236 6.338 4.01 7.033 3.279 7.033 3.87 7.463 3.644 8.158 4.236 7.729 4.827 8.158 4.601 7.463z"
          ></path>
          <path
            fill="#fff"
            d="M7.58 7.463L8.172 7.033 7.441 7.033 7.215 6.338 6.989 7.033 6.258 7.033 6.849 7.463 6.623 8.158 7.215 7.729 7.806 8.158 7.58 7.463z"
          ></path>
          <path
            fill="#fff"
            d="M10.56 7.463L11.151 7.033 10.42 7.033 10.194 6.338 9.968 7.033 9.237 7.033 9.828 7.463 9.603 8.158 10.194 7.729 10.785 8.158 10.56 7.463z"
          ></path>
          <path
            fill="#fff"
            d="M6.066 9.283L6.658 8.854 5.927 8.854 5.701 8.158 5.475 8.854 4.744 8.854 5.335 9.283 5.109 9.979 5.701 9.549 6.292 9.979 6.066 9.283z"
          ></path>
          <path
            fill="#fff"
            d="M9.046 9.283L9.637 8.854 8.906 8.854 8.68 8.158 8.454 8.854 7.723 8.854 8.314 9.283 8.089 9.979 8.68 9.549 9.271 9.979 9.046 9.283z"
          ></path>
          <path
            fill="#fff"
            d="M12.025 9.283L12.616 8.854 11.885 8.854 11.659 8.158 11.433 8.854 10.702 8.854 11.294 9.283 11.068 9.979 11.659 9.549 12.251 9.979 12.025 9.283z"
          ></path>
          <path
            fill="#fff"
            d="M6.066 12.924L6.658 12.494 5.927 12.494 5.701 11.799 5.475 12.494 4.744 12.494 5.335 12.924 5.109 13.619 5.701 13.19 6.292 13.619 6.066 12.924z"
          ></path>
          <path
            fill="#fff"
            d="M9.046 12.924L9.637 12.494 8.906 12.494 8.68 11.799 8.454 12.494 7.723 12.494 8.314 12.924 8.089 13.619 8.68 13.19 9.271 13.619 9.046 12.924z"
          ></path>
          <path
            fill="#fff"
            d="M12.025 12.924L12.616 12.494 11.885 12.494 11.659 11.799 11.433 12.494 10.702 12.494 11.294 12.924 11.068 13.619 11.659 13.19 12.251 13.619 12.025 12.924z"
          ></path>
          <path
            fill="#fff"
            d="M13.539 7.463L14.13 7.033 13.399 7.033 13.173 6.338 12.947 7.033 12.216 7.033 12.808 7.463 12.582 8.158 13.173 7.729 13.765 8.158 13.539 7.463z"
          ></path>
          <path
            fill="#fff"
            d="M4.601 11.104L5.193 10.674 4.462 10.674 4.236 9.979 4.01 10.674 3.279 10.674 3.87 11.104 3.644 11.799 4.236 11.369 4.827 11.799 4.601 11.104z"
          ></path>
          <path
            fill="#fff"
            d="M7.58 11.104L8.172 10.674 7.441 10.674 7.215 9.979 6.989 10.674 6.258 10.674 6.849 11.104 6.623 11.799 7.215 11.369 7.806 11.799 7.58 11.104z"
          ></path>
          <path
            fill="#fff"
            d="M10.56 11.104L11.151 10.674 10.42 10.674 10.194 9.979 9.968 10.674 9.237 10.674 9.828 11.104 9.603 11.799 10.194 11.369 10.785 11.799 10.56 11.104z"
          ></path>
          <path
            fill="#fff"
            d="M13.539 11.104L14.13 10.674 13.399 10.674 13.173 9.979 12.947 10.674 12.216 10.674 12.808 11.104 12.582 11.799 13.173 11.369 13.765 11.799 13.539 11.104z"
          ></path>
          <path
            fill="#fff"
            d="M4.601 14.744L5.193 14.315 4.462 14.315 4.236 13.619 4.01 14.315 3.279 14.315 3.87 14.744 3.644 15.44 4.236 15.01 4.827 15.44 4.601 14.744z"
          ></path>
          <path
            fill="#fff"
            d="M7.58 14.744L8.172 14.315 7.441 14.315 7.215 13.619 6.989 14.315 6.258 14.315 6.849 14.744 6.623 15.44 7.215 15.01 7.806 15.44 7.58 14.744z"
          ></path>
          <path
            fill="#fff"
            d="M10.56 14.744L11.151 14.315 10.42 14.315 10.194 13.619 9.968 14.315 9.237 14.315 9.828 14.744 9.603 15.44 10.194 15.01 10.785 15.44 10.56 14.744z"
          ></path>
          <path
            fill="#fff"
            d="M13.539 14.744L14.13 14.315 13.399 14.315 13.173 13.619 12.947 14.315 12.216 14.315 12.808 14.744 12.582 15.44 13.173 15.01 13.765 15.44 13.539 14.744z"
          ></path>
        </svg>
      )
    );
  };

  const renderContent = () => {
    return (
      <div>
        {data.map((i) => (
          <div
            key={i.value}
            onClick={() => onSelectChange(i.value)}
            className={` flex items-center gap-2 py-[6px] px-[12px] rounded-[12px] hover:bg-[#d1eef9] cursor-pointer ${(locale === i.value || value == i.value) && 'bg-[#d1dee3]'}`}
          >
            {i.emoji} {i.label}{' '}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    onGetAPI();
  }, []);

  return (
    <Affix>
      <div className="min-h-[46px] bg-blue-1000 ">
        <div className="max-w-1200 mr-auto ml-auto flex justify-end py-[12px] px-2">
          <Popover
            open={openLanguage}
            onOpenChange={(isOpened) => {
              setOpenLanguage(isOpened);
            }}
            content={renderContent()}
            trigger="click"
            placement="bottomRight"
          >
            <span className='text-white'> {value} </span> <GlobalOutlined style={{ color: 'white', cursor: "pointer" }} />
          </Popover>
        </div>
        <StyledMenu className="max-w-1200 px-[16px] xl:px-[0] mr-auto ml-auto flex justify-between items-center">
          <Menu
            onClick={onClick}
            mode="horizontal"
            rootClassName="menu-header"
            items={masterData}
          />
          {/* <div className='min-h-[46px] flex items-center min-w-[auto] md:min-w-[300px]'>
            <Search placeholder="Tìm kiếm sản phẩm " onSearch={onSearch} />
          </div> */}

          <div className="flex items-center space-x-2">
            <div className="relative w-64" ref={searchRef}>
              {/* Nút tìm kiếm */}
              <SearchOutlined
                style={{ fontSize: 24 }}
                onClick={() => setIsOpen(!isOpen)}
              />
              {/* Thanh tìm kiếm */}
              {isOpen && (
                <div
                  className="mt-2"
                  style={{
                    position: 'absolute',
                    right: '4px',
                    zIndex: '100',
                    top: 32
                  }}
                >
                  <Search
                    placeholder="search"
                    onSearch={onSearch}
                    size="large"
                    style={{ width: 270 }}
                  />
                </div>
              )}
            </div>
          </div>
        </StyledMenu>
      </div>
    </Affix>
  );
};

export default MenuHeader;
