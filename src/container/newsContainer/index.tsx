"use client"
import CardNewHorizontal from '@/components/CardNewHorizontal'
import { HomeOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import React, { useEffect, useState } from 'react'
import MenuList from '@/components/MenuList'
import CardNew from '@/components/CardNew'
import SectionTitle from '@/components/SectionTitle'
import { getApiListNews } from '@/utils/axios/news'
import Link from 'next/link'

interface INewsProps {
    dataListArtical: any
}

const NewsContainer = (props: INewsProps) => {
    const { dataListArtical } = props;

    const [listNews, setListNews] = useState<any[]>([]);
    useEffect(() => {
        (async () => {
            const data = await getApiListNews();
            setListNews(data.data);
        })();
    }, []);


    const listMenuProduct = [
        {
            id: 1,
            name: 'Chưa phân loại'
        },
        {
            id: 2,
            name: 'Thiết Bị Khai Thác mỏ abcd sâs âsâs âs'
        },
        {
            id: 3,
            name: 'Máy nghiền cát'
        },
        {
            id: 4,
            name: 'Cấp liệu rung'
        },
        {
            id: 5,
            name: 'Sản phầm khuyến mãi'
        }
    ];
    return (
        <div className='mb-[40px]'>
            <SectionTitle title='Tin tức' description='Tin tức' />
            <div className="max-w-[1200px] px-[0px] mx-auto">
                <div className="grid grid-cols-[1fr] sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-[24px] mt-[40px] mb-[40px]">
                    <div className='hidden sm:block'>
                        <Space direction='vertical' size={32}>
                            <MenuList title='Mới nhất'>
                                <Space direction='vertical' size={4} style={{ width: "100%" }}>
                                    {dataListArtical?.map((el: any) => {
                                        return (
                                            <Link href={`${"news"}/${el.slug}`}>
                                                <div
                                                    className="px-[12px] leading-[27px] line-clamp-1 py-[6px] cursor-pointer hover:bg-[#F0F0F0] hover:rounded-[4px]"
                                                    key={el.id}
                                                >
                                                    {el.name}
                                                </div>
                                            </Link>
                                        )

                                    })}
                                </Space>
                            </MenuList>
                            <MenuList title='Liên quan'>
                                <Space direction='vertical' size={12}>
                                    {listMenuProduct.map((el) => {
                                        return <CardNewHorizontal key={el.id} />;
                                    })}
                                </Space>
                            </MenuList>
                        </Space>
                    </div>
                    <div className='grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-[16px]'>
                        {listNews.map((el) => {
                            return <div key={el.id}><CardNew title={el.title} description={el.description} {...el} /></div>;
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NewsContainer