import Image from 'next/image';
import React from 'react';
import { StyledCardProduct } from './styles';

type Props = {};

const CardProduct = (props: Props) => {
    const onClick = () => {
        console.log('vào1');
    };
    return (
        <StyledCardProduct onClick={onClick}>
            <div className="card-product bg-[#F4F4F4] ">
                <div className="p-[6px] relative">
                    <div className="mark"></div>
                    <div className="cart-wrapper">
                        <div
                            className="cart"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('vào2');
                            }}
                        >
                            a
                        </div>
                    </div>
                    <img
                        src="https://hoaphatthietbi.com/wp-content/uploads/2023/01/image11-300x300.jpg"
                        alt="product"
                    />
                </div>
                <div style={{ background: '#F4F4F4' }}>
                    <div className="p-[15px] text-[16px] font-bold ">
                        <div className="min-h-[40px]  line-clamp-2">title</div>
                    </div>
                    <div className=" mx-[15px] mb-[20px] min-h-[56px] border-t border-gray-200 pt-[15px]">
                        100.000
                    </div>
                </div>
            </div>
        </StyledCardProduct>
    );
};

export default CardProduct;
