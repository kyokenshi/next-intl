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
import Pagination from '@/components/Pagination'
import { useSearchParams } from 'next/navigation'

import imagesa from './../../../public/assets/empty_data.png';
import Image from 'next/image'
import { gtag_event } from '@/utils/gtag' // ✅ thêm import

interface INewsProps {
    dataListArtical: any
    dataConfig: any
}

const NewsContainer = (props: INewsProps) => {
    const { dataListArtical, dataConfig } = props;
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId') ?? "";

    const [listNews, setListNews] = useState<any[]>([]);
    const [params, setParams] = useState({
        page: 1,
    })
    const [pagination, setPagination] = useState<any>({});
    const onPageChange = (page: number) => {
        setParams((preveState) => ({
            ...preveState,
            page: page,
        }));
        gtag_event('news_list_page_change', { page });
    };

    useEffect(() => {
        (async () => {
            const data = await getApiListNews({ params, categoryId: categoryId });
            setListNews(data.data);
            setPagination(data.meta.pagination);
        })();
    }, [params, categoryId]);

    return (
        <div className='mb-[40px]'>
            <SectionTitle title={dataConfig?.name_new_header} description={dataConfig?.name_new_header} />
            <div className="max-w-[1200px] px-[0px] mx-auto">
                <div className="grid grid-cols-[1fr] sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-[24px] mt-[40px] mb-[40px]">
                    <div className='hidden sm:block'>
                        <Space direction='vertical' size={32} className='min-w-full'>
                            <MenuList title={dataConfig?.name_product_new}>
                                <Space direction='vertical' size={4} style={{ width: "100%" }}>
                                    {dataListArtical?.map((el: any) => {
                                        return (
                                            <Link href={`${"news"}?categoryId=${el.slug}`} key={el.id}>
                                                <div
                                                    className="px-[12px] leading-[27px] line-clamp-1 py-[6px] cursor-pointer hover:bg-[#F0F0F0] hover:rounded-[4px]"
                                                >
                                                    {el.name}
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </Space>
                            </MenuList>
                        </Space>
                    </div>

                    {listNews.length > 0 && (
                        <div className='grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-[16px]'>
                            {listNews.map((el) => {
                                return (
                                    <div
                                        key={el.id}
                                        onClick={() => gtag_event('news_click', { id: el.id, title: el.title })}
                                        className="cursor-pointer"
                                    >
                                        <CardNew title={el.title} description={el.description} {...el} />
                                    </div>
                                );
                            })}
                            <div className="flex justify-center mt-[24px]">
                                <Pagination
                                    current={params.page}
                                    pageSize={pagination?.pageSize}
                                    total={Number(pagination?.total)}
                                    onChange={onPageChange}
                                />
                            </div>
                        </div>
                    )}

                    {listNews.length === 0 && (
                        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 40 }}>
                            <Image src={imagesa} width={150} height={150} style={{ height: 150 }} alt='IMG_EMPTY' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewsContainer
