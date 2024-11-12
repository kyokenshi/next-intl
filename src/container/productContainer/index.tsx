'use client';
import CardProduct from '@/components/CardProduct';
import { Pagination, Select } from 'antd';
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
        <div className="w-[1200px] mx-auto">
            <div className="grid grid-cols-[300px_1fr] gap-[24px] mt-[40px]">
                <div>
                    <div className="mb-[32px]">
                        <div className="text-center border-b text-ellipsis text-[16px] font-bold bg-blue-1000 text-white px-[14px] py-[10px]">
                            Danh mục sản phẩm
                        </div>
                        <div className="px-[12px] py-[6px] border border-t-0 border-[#2865C2] mt-[-1px]">
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
                        </div>
                    </div>
                    <div>
                        <div className="text-center border-b text-ellipsis text-[16px] font-bold bg-blue-1000 text-white px-[14px] py-[10px]">
                            Mới nhất
                        </div>
                        <div className="px-[12px] py-[6px] border border-t-0 border-[#2865C2] mt-[-1px]">
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
                        </div>
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
