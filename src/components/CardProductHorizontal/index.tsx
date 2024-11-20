import { getImageUrl } from '@/utils/commom';
import Image from 'next/image'
import React from 'react'

type Props = {
    size?: number;
    title?: string;
    images?: any[] | string;
    price?: any;
}

const CardProductHorizontal = (props: Props) => {
    const { size = 82, title, images, price } = props
    console.log(images);

    return (
        <div className='grid grid-cols-[82px_1fr] gap-[12px]'>
            <Image
                src={typeof images === 'string' ? images : images?.[0]?.url ? getImageUrl(images[0].url) : ""}
                alt='product'
                width={size}
                height={size}
                className='cursor-pointer'
            />
            <div>
                <div className='text-[14px] capitalize font-semibold hover:text-[#2865C2] mb-[4px] cursor-pointer'>{title}</div>
                <div className='text-[14px] '>{!price ? "Contact us" : price + " $"}</div>
            </div>
        </div>
    )
}

export default CardProductHorizontal