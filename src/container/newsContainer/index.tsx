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

interface INewsProps {
    dataListArtical: any
    dataConfig: any
}

const NewsContainer = (props: INewsProps) => {
    const { dataListArtical, dataConfig } = props;

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
    };

    useEffect(() => {
        (async () => {
            const data = await getApiListNews({ params });
            setListNews(data.data);
            setPagination(data.meta);
        })();
    }, [params]);


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
                            {/* <MenuList title='Liên quan'>
                                <Space direction='vertical' size={12}>
                                    {listMenuProduct.map((el) => {
                                        return <CardNewHorizontal key={el.id} />;
                                    })}
                                </Space>
                            </MenuList> */}
                        </Space>
                    </div>
                    <div className='grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-[16px]'>
                        {listNews.map((el) => {
                            return <div key={el.id}><CardNew title={el.title} description={el.description} {...el} /></div>;
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
                </div>
            </div>
        </div>

    )
}

export default NewsContainer