'use client';
import CardProduct from '@/components/CardProduct';
import CardProductHorizontal from '@/components/CardProductHorizontal';
import MenuList from '@/components/MenuList';
import Pagination from '@/components/Pagination';
import { getApiProduct } from '@/utils/axios/product';
import { gtag_event } from '@/utils/gtag'; // ✅ import gtag
import { Popover, Skeleton, Space } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
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
    dataCategoryProduct: any;
    dataProductNew: any;
    dataConfig: any;
}

const ProductContainer = (props: Props) => {
    const searchParams = useSearchParams();
    const { id } = props.params;
    const router = useRouter();
    const { dataCategoryProduct, dataProductNew, dataConfig } = props;
    const [productList, setProductList] = useState<Product[]>([]);
    const [pagination, setPagination] = useState<any>({});
    const search = searchParams?.get('search');

    const [loading, setLoading] = useState(true);
    const [params, setParams] = useState({
        page: 1,
        search: search,
    });

    const onPageChange = (page: number) => {
        setParams((prevState) => ({
            ...prevState,
            page: page,
        }));
        gtag_event('product_list_page_change', {
            event_category: 'pagination',
            event_label: `page_${page}`,
        });
    };

    useEffect(() => {
        setParams((prevState) => ({
            ...prevState,
            search: search,
        }));
    }, [search]);

    const onGetListProduct = async () => {
        try {
            const resp = await getApiProduct({ categoryId: id?.[0], params });
            setProductList(resp.data);
            setPagination(resp.meta.pagination);

            // ✅ Track load list sản phẩm
            gtag_event('product_list_loaded', {
                event_category: 'product',
                event_label: `${id?.[0] || 'all'}_page_${params.page}`,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        onGetListProduct();
    }, [params]);

    const content = (el: any) => {
        return (
            <div>
                {el.map((sub: any) => {
                    return (
                        <div
                            key={sub.id}
                            className="px-[12px] py-[6px] cursor-pointer hover:bg-[#F0F0F0] hover:rounded-[4px]"
                            onClick={() =>
                                gtag_event('product_click', {
                                    event_category: 'product',
                                    event_label: `product_${el.id}`,
                                })
                            }
                        >
                            {sub.title}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="max-w-[1200px] px-[0px] mx-auto">
            <div className="grid grid-cols-[1fr] sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-[24px] mt-[40px] mb-[40px]">
                <div>
                    <div className="mb-[32px] hidden sm:block">
                        <MenuList title={dataConfig?.name_category_home}>
                            {dataCategoryProduct?.map((el: any) => {
                                return (
                                    <Popover
                                        key={el.id}
                                        placement="rightTop"
                                        content={content(el.product_category_level_2s)}
                                    >
                                        <div
                                            className="px-[12px] py-[6px] cursor-pointer hover:bg-[#F0F0F0] hover:rounded-[4px]"
                                            onClick={() =>
                                                gtag_event('category_level1_click', {
                                                    event_category: 'product_category',
                                                    event_label: `category_${el.id}`,
                                                })
                                            }
                                        >
                                            {el.title}
                                        </div>
                                    </Popover>
                                );
                            })}
                        </MenuList>
                    </div>
                    <div className="hidden sm:block">
                        <MenuList title={dataConfig?.name_product_new}>
                            <Space direction="vertical" size={12}>
                                {dataProductNew?.map((el: any) => {
                                    return (
                                        <div
                                            key={el.id}
                                            onClick={() =>
                                                gtag_event('new_product_click', {
                                                    event_category: 'product',
                                                    event_label: `new_product_${el.id}`,
                                                })
                                            }
                                        >
                                            <CardProductHorizontal {...el} />
                                        </div>
                                    );
                                })}
                            </Space>
                        </MenuList>
                    </div>
                </div>

                {loading ? (
                    <Skeleton
                        active
                        style={{
                            lineHeight: '3em',
                        }}
                        paragraph={{
                            rows: 10,
                            width: [
                                '80%',
                                '80%',
                                '80%',
                                '80%',
                                '80%',
                                '80%',
                                '80%',
                                '80%',
                                '80%',
                                '80%',
                                '80%',
                            ],
                        }}
                    />
                ) : (
                    <div>
                        {productList.length > 0 ? (
                            <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-[16px]">
                                {productList.map((el) => {
                                    return (
                                        <div
                                            key={el.id}
                                            onClick={() =>
                                                gtag_event('product_click', {
                                                    event_category: 'product',
                                                    event_label: `product_${el.id}`,
                                                })
                                            }
                                        >
                                            <CardProduct {...el} />
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex justify-center align-middle mt-20">
                                <Image
                                    src={'/assets/empty_data.png'}
                                    width={200}
                                    height={150}
                                    alt="IMG_EMPTY"
                                />
                            </div>
                        )}

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
            </div>
        </div>
    );
};

export default ProductContainer;
