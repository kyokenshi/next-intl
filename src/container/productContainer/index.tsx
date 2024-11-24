'use client';
import CardProduct from '@/components/CardProduct';
import CardProductHorizontal from '@/components/CardProductHorizontal';
import MenuList from '@/components/MenuList';
import Pagination from '@/components/Pagination';
import { getApiProduct } from '@/utils/axios/product';
import { Select, Skeleton, Space } from 'antd';
import Link from 'antd/es/typography/Link';
import React, { useEffect, useState } from 'react';


interface ImageFormats {
    large?: ImageDetails;
    small?: ImageDetails;
    medium?: ImageDetails;
    thumbnail?: ImageDetails;
}

interface ImageDetails {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path?: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}

interface Image {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string | null;
    caption?: string | null;
    width: number;
    height: number;
    formats: ImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string | null;
    provider: string;
    provider_metadata?: any | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

interface ProductCategory {
    id: number;
    documentId: string;
    title: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
}

export interface Product {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    images: any;
    product_category: ProductCategory;
    localizations: any[];
}

interface Props {
    params: { id?: any };
    dataCategoryProduct: any
    dataProductNew: any
    dataConfig: any
}

const ProductContainer = (props: Props) => {

    const { id } = props.params;
    const { dataCategoryProduct, dataProductNew, dataConfig } = props
    const [productList, setProductList] = useState<Product[]>([]);
    const [pagination, setPagination] = useState<any>({});

    const [loading, setLoading] = useState(true);
    const [params, setParams] = useState({
        page: 1,
    })

    const onPageChange = (page: number) => {
        setParams((preveState) => ({
            ...preveState,
            page: page,
        }));
    };


    const onGetListProduct = async () => {
        try {
            const resp = await getApiProduct({ categoryId: id?.[0], params });
            setProductList(resp.data);
            setPagination(resp.meta);


        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onGetListProduct();
    }, [params])


    return (
        <div className="max-w-[1200px] px-[0px] mx-auto">
            <div className="grid grid-cols-[1fr] sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-[24px] mt-[40px] mb-[40px]">
                <div>
                    <div className="mb-[32px] hidden sm:block">

                        <MenuList title={dataConfig?.name_category_home}>
                            {
                                dataCategoryProduct?.map((el: any) => {
                                    return (
                                        <div
                                            className="px-[12px] py-[6px] cursor-pointer hover:bg-[#F0F0F0] hover:rounded-[4px]"
                                            key={el.id}
                                        >
                                            <Link href={`/danh-muc-san-pham/${el.url}`}>
                                                {el.title}
                                            </Link>
                                        </div>
                                    );
                                })}
                        </MenuList>

                    </div>
                    <div className='hidden sm:block'>
                        <MenuList title={dataConfig?.name_product_new}>
                            <Space direction='vertical' size={12}>
                                {dataProductNew?.map((el: any) => {
                                    return <CardProductHorizontal key={el.id} {...el} />
                                })}
                            </Space>
                        </MenuList>
                    </div>
                </div>

                {loading ? <Skeleton active style={{
                    lineHeight: '3em', // Điều chỉnh khoảng cách giữa các dòng
                }}
                    paragraph={{
                        rows: 10,
                        // Số lượng dòng
                        width: ['80%', '80%', '80%', '80%', '80%', '80%', '80%', '80%', '80%', '80%', '80%',], // Độ rộng từng dòng
                    }} /> :
                    <div>
                        {/* <div className="flex justify-between mb-[16px]">
                            <div>
                                Showing 1–9 of 13 results
                            </div>
                            <Select className="w-[200px]" options={option} />
                        </div> */}
                        <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-[16px]">
                            {productList.map((el) => {
                                return <CardProduct key={el.id}  {...el} />;
                            })}
                        </div>
                        <div className="flex justify-center mt-[24px]">
                            <Pagination
                                current={params.page}
                                pageSize={pagination?.pageSize}
                                total={Number(pagination?.total)}
                                onChange={onPageChange}
                            />

                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductContainer;
