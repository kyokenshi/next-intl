"use client"
import Image from 'next/image';
import React from 'react';
import { StyledCardProduct } from './styles';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Product } from '@/container/productContainer';
import { formatPrice, getImageUrl } from '@/utils/commom';
import Link from 'antd/es/typography/Link';

type Props = Product;

const CardProduct = (props: Props) => {
    const { id, title, price, images = "", slug } = props;

    return (
        <Link href={`/product/${slug}`}>
            <StyledCardProduct>
                <div className="card-product bg-[#F4F4F4] ">
                    <div className="p-[6px] relative">
                        {/* <div className="mark"></div>
                    <div className="cart-wrapper">
                        <div
                            className="cart"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('vào2');
                            }}
                        >
                            <ShoppingCartOutlined />
                        </div>
                    </div> */}
                        <div className="p-[6px] relative w-full aspect-square hover:scale-[104%]"> {/* Thêm aspect-square để tạo container vuông */}
                            <Image
                                objectFit={images ? 'cover' : "contain"}
                                src={getImageUrl(images)}
                                alt="product"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>

                    </div>
                    <div style={{ background: '#F4F4F4' }}>
                        <div className="p-[15px] text-[16px] font-bold ">
                            <div className="min-h-[40px]  line-clamp-2">{title}</div>
                        </div>
                        <div className=" mx-[15px] mb-[20px] min-h-[56px] border-t text-[#00a0ea] border-gray-200 pt-[15px] font-semibold">
                            {formatPrice(price)}
                        </div>
                    </div>
                </div>
            </StyledCardProduct>
        </Link>
    );
};

export default CardProduct;
