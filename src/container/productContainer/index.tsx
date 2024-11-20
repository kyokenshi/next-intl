'use client';
import CardProduct from '@/components/CardProduct';
import CardProductHorizontal from '@/components/CardProductHorizontal';
import MenuList from '@/components/MenuList';
import { getApiProduct } from '@/utils/axios/product';
import { getCategoryProduct, getCategoryProductID } from '@/utils/axios/productCategory';
import { Pagination, Select, Space } from 'antd';
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

interface Product {
    id: number;
    documentId: string;
    title: string;
    url: string;
    description: string;
    content: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    images: Image[];
    product_category: ProductCategory;
    localizations: any[];
}

interface Props {
    params: { id: string };
}

const ProductContainer = (props: Props) => {

    const { id } = props.params;

    const [productLista, setProductList] = useState<Product[]>([]);
    const [categoryProduct, setCategoryProduct] = useState<ProductCategory[]>([]);
    const [categoryProductNew, setCategoryProductNew] = useState<ProductCategory[]>([]);




    useEffect(() => {
        Promise.all([
            getApiProduct(),
            getCategoryProduct(),
            getCategoryProductID(id)
        ]).then(([productList, categoryProduct, categoryProductID]) => {
            setProductList(productList.data);
            setCategoryProduct(categoryProduct.data);
            setCategoryProductNew(categoryProductID.data);
        });
    }, []);

    console.log(categoryProduct, "categoryProduct");



    const listMenuProduct = [
        {
            id: 1,
            name: 'Chưa phân loại'
        },
        {
            id: 2,
            name: 'Thiết Bị Khai Thác mỏ'
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

    const productList = [
        {
            id: 1,
            name: 'Máy nghiền cát'
        },
        {
            id: 2,
            name: 'Máy nghiền cát'
        },
        {
            id: 3,
            name: 'Máy nghiền cát'
        },
        {
            id: 4,
            name: 'Máy nghiền cát'
        }
    ];

    const option = [
        {
            label: 'Máy nghiền cát',
            value: 1
        },
        {
            label: 'Máy nghiền cát',
            value: 2
        },
        {
            label: 'Máy nghiền cát',
            value: 3
        }
    ];
    return (
        <div className="max-w-[1200px] px-[0px] mx-auto">
            <div className="grid grid-cols-[1fr] sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-[24px] mt-[40px] mb-[40px]">
                <div>
                    <div className="mb-[32px] hidden sm:block">
                        <MenuList title='Danh mục sản phẩm'>
                            {categoryProduct.map((el) => {
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
                        <MenuList title='Mới nhất'>
                            <Space direction='vertical' size={12}>
                                {categoryProductNew.map((el) => {
                                    return <CardProductHorizontal key={el.id} {...el} />
                                })}
                            </Space>
                        </MenuList>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-[16px]">
                        <div>
                            {/* Showing 1–9 of 13 results */}
                        </div>
                        <Select className="w-[200px]" options={option} />
                    </div>
                    <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-[16px]">
                        {productLista.map((el) => {
                            return <CardProduct key={el.id} />;
                        })}
                    </div>
                    <div className="flex justify-center mt-[24px]">
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductContainer;
