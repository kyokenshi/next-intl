import { getImageUrl } from '@/utils/commom';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

type Props = {
    size?: number;
    cover?: any
    title?: string
    slug?: string
}

const CardProductHorizontal = (props: Props) => {
    const { size = 60, cover, title, slug } = props
    return (
        <div className='grid grid-cols-[60px_1fr] gap-[12px]'>
            {/* <img loading='lazy' src='https://hoaphatthietbi.com/wp-content/uploads/2023/01/tt2-100x100.jpg' alt='product' width={size} height={size} className='cursor-pointer' /> */}

            <div className="p-[6px] relative w-full aspect-square"> {/* Thêm aspect-square để tạo container vuông */}
                <Image
                    objectFit={cover ? 'cover' : "contain"}
                    src={getImageUrl(cover.url)}
                    alt="product"
                    fill
                />
            </div>
            <Link href={`/news/${slug}`} >
                <div className='text-[14px] hover:text-[#2865C2] mb-[4px] cursor-pointer line-clamp-3'>{title}</div>
            </Link>
        </div>
    )
}

export default CardProductHorizontal