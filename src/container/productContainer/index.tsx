'use client';
import CardProduct from '@/components/CardProduct';
import CardProductHorizontal from '@/components/CardProductHorizontal';
import MenuList from '@/components/MenuList';
import { Pagination, Select, Space } from 'antd';
import React from 'react';

type Props = {};

const ProductContainer = (props: Props) => {
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
        <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-[300px_1fr] gap-[24px] mt-[40px]">
                <div>
                    <div className="mb-[32px]">


                        <MenuList title='Danh mục sản phẩm'>
                            {listMenuProduct.map((el) => {
                                return (
                                    <div
                                        className="px-[12px] py-[6px] cursor-pointer hover:bg-[#F0F0F0] hover:rounded-[4px]"
                                        key={el.id}
                                    >
                                        {el.name}
                                    </div>
                                );
                            })}
                        </MenuList>
                    </div>
                    <div>
                        <MenuList title='Mới nhất'>
                            <Space direction='vertical' size={12}>
                                {listMenuProduct.map((el) => {
                                    return <CardProductHorizontal key={el.id} />;
                                })}
                            </Space>
                        </MenuList>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-[16px]">
                        <div> Showing 1–9 of 13 results</div>
                        <Select className="w-[200px]" options={option} />
                    </div>
                    <div className="grid grid-cols-[1fr_1fr_1fr] gap-[16px]">
                        {productList.map((el) => {
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
