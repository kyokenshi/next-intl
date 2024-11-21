import { formatPrice, getImageUrl } from '@/utils/commom';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

type Props = {
    size?: number;
    title?: string;
    images?: any[] | string;
    price?: any;
    slug?: string
}

const CardProductHorizontal = (props: Props) => {
    const { size = 82, title, images, price, slug = "" } = props

    return (
        <div className='grid grid-cols-[82px_1fr] gap-[12px]'>
            <Image
                src={getImageUrl(images)}
                alt='product'
                width={size}
                height={size}
                className='cursor-pointer'
            />
            <div>
                <div className='text-[14px] capitalize font-semibold hover:text-[#2865C2] mb-[4px] cursor-pointer'>
                    <Link href={`/product/${slug}`}>
                        {title}
                    </Link>
                </div>
                <div className='text-[14px] '>{formatPrice(price)}</div>
            </div>
        </div>
    )
}

export default CardProductHorizontal