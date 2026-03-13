'use client';
import CardProduct from '@/components/CardProduct';
import CardProductHorizontal from '@/components/CardProductHorizontal';
import MenuList from '@/components/MenuList';
import Pagination from '@/components/Pagination';
import { getApiProduct } from '@/utils/axios/product';
import { gtag_event } from '@/utils/gtag';
import { Popover, Skeleton, Space } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ProductCategory {
    id: number;
    title: string;
    url: string;
}

export interface Product {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    images: any;
    product_category: ProductCategory;
}

interface Props {
    params: { id?: any };
    dataCategoryProduct: any;
    dataProductNew: any;
    dataConfig: any;
}

const ProductContainer = (props: Props) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { id } = props.params;
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
        setParams((prev) => ({
            ...prev,
            page: page,
        }));

        gtag_event('product_list_page_change', {
            event_category: 'pagination',
            event_label: `page_${page}`,
        });
    };

    useEffect(() => {
        setParams((prev) => ({
            ...prev,
            search: search,
        }));
    }, [search]);

    const onGetListProduct = async () => {
        try {
            const resp = await getApiProduct({
                categoryId: id?.[0],
                params,
            });

            setProductList(resp.data);
            setPagination(resp.meta.pagination);

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
    }, [params, id]);

    /*
        MENU LEVEL 2
    */

    const renderLevel2 = (subs: any[], parent: any) => {
        return (
            <div>
                {subs.map((sub: any) => (
                    <div
                        key={sub.id}
                        className="px-[12px] py-[6px] cursor-pointer hover:bg-[#F0F0F0] hover:rounded-[4px]"
                        onClick={() => {
                            gtag_event('category_level2_click', {
                                event_category: 'product_category',
                                event_label: `category_${sub.id}`,
                            });

                            router.push(
                                `/product-catalog/${sub.url}`
                            );
                        }}
                    >
                        {sub.title}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-[1200px] px-[0px] mx-auto">
            <div className="grid grid-cols-[1fr] sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-[24px] mt-[40px] mb-[40px]">

                {/* LEFT MENU */}

                <div>
                    <div className="mb-[32px] hidden sm:block">
                        <MenuList title={dataConfig?.name_category_home}>
                            {dataCategoryProduct?.map((el: any) => (
                                <Popover
                                    key={el.id}
                                    placement="rightTop"
                                    content={renderLevel2(
                                        el.product_category_level_2s,
                                        el
                                    )}
                                >
                                    <div
                                        className="px-[12px] py-[6px] cursor-pointer hover:bg-[#F0F0F0] hover:rounded-[4px]"
                                        onClick={() => {
                                            gtag_event('category_level1_click', {
                                                event_category:
                                                    'product_category',
                                                event_label: `category_${el.id}`,
                                            });


                                        }}
                                    >
                                        {el.title}
                                    </div>
                                </Popover>
                            ))}
                        </MenuList>
                    </div>

                    {/* PRODUCT NEW */}

                    <div className="hidden sm:block">
                        <MenuList title={dataConfig?.name_product_new}>
                            <Space direction="vertical" size={12}>
                                {dataProductNew?.map((el: any) => (
                                    <div
                                        key={el.id}
                                        onClick={() => {
                                            gtag_event('new_product_click', {
                                                event_category: 'product',
                                                event_label: `new_product_${el.id}`,
                                            });

                                            router.push(`/product/${el.slug}`);
                                        }}
                                    >
                                        <CardProductHorizontal {...el} />
                                    </div>
                                ))}
                            </Space>
                        </MenuList>
                    </div>
                </div>

                {/* PRODUCT LIST */}

                {loading ? (
                    <Skeleton
                        active
                        paragraph={{ rows: 10 }}
                    />
                ) : (
                    <div>
                        {productList.length > 0 ? (
                            <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-[16px]">
                                {productList.map((el) => (
                                    <div
                                        key={el.id}
                                        onClick={() => {
                                            gtag_event('product_click', {
                                                event_category: 'product',
                                                event_label: `product_${el.id}`,
                                            });

                                            router.push(`/product/${el.slug}`);
                                        }}
                                    >
                                        <CardProduct {...el} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center mt-20">
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