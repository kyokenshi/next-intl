'use client'
import { Menu, MenuProps, Skeleton } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { StyledMenuHome } from './styles';
import { getApiCategoryHome } from '@/utils/axios/home';
import { getImageUrl } from '@/utils/commom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {}
type MenuItem = Required<MenuProps>['items'][number];

const MenuHome = (props: Props) => {
    const router = useRouter();
    const [listCategoryHome, setListCategoryHome] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const onGetListMenu = async () => {
        try {
            setLoading(true)
            await getApiCategoryHome().then((resp) => {
                if (resp.data.product_category.length > 0) {
                    const newData = transformMenuData(resp.data.product_category)
                    setListCategoryHome(newData);
                }
            }).finally(() => {
                setLoading(false);

            });
        } catch (error) {
            console.log(error);
        }
    }
    const transformMenuData = (data: any[]) => {
        return data.map(item => {
            return {
                key: item.id,
                icon: <Image src={getImageUrl(item?.icon?.url)} width={24} height={24} alt={item?.icon?.name} />,
                label: item.title,
                onTitleClick: () => handleTitleClick(item),
                children: item.product_categories?.map((el: any) => ({
                    label: el.title,
                    key: el.id,
                    url: el.url
                })),
            }
        }).filter(Boolean);
    };

    // Hàm tìm phần tử theo key
    const findElementByKey = (key: number) => {
        if (listCategoryHome.length == 0) {
            return
        }

        const newList = [...listCategoryHome];
        for (const item of newList) {
            if (item.key == key) return item;
            const child = item.children?.find((child: any) => child.key == key);
            if (child) return child
        }
        return null;
    };


    const handleTitleClick = (item: any) => {
    }

    const onClick: MenuProps['onClick'] = ({ key }) => {
        const element = findElementByKey(Number(key));
        router.push(`${element.url}`)
    };



    useEffect(() => {
        onGetListMenu()
    }, [])


    return (
        <StyledMenuHome className='bg-[#F0F0F0] '>
            <div className='p-[20px] bg-blue-1000 text-ellipsis  text-white text-16px '>Danh mục sản phẩm</div>
            {loading ? <Skeleton active /> : <Menu onClick={onClick} mode="vertical" items={listCategoryHome} rootClassName='menu-home-custom' />
            }
        </StyledMenuHome>


    )
}

export default MenuHome