import { getImageUrl } from '@/utils/commom'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    cover?: any
    title?: string
    slug?: string
}

const CardNewHome = (props: Props) => {
    const { cover, title, slug, ...other } = props
    return (
        <div>
            <Link href={`/${slug}`}>
                <div className="p-[6px] relative w-full aspect-square"> {/* Thêm aspect-square để tạo container vuông */}
                    <Image
                        // Thêm object-cover
                        objectFit={cover ? 'cover' : "contain"}
                        src={getImageUrl(cover?.formats?.large?.url) || ''}
                        alt="product"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </Link>
            <div className='p-[14px] text-center' >
                <Link href={`/${slug}`}>
                    <div className='text-[20px] text-[#2764c2]'>{title}</div>
                </Link>
                <Link href={`/${slug}`}>
                    <div className='text-center text-[14px] mt-[16px]'>See more<span className='ml-[4px]'>→</span></div>
                </Link>
            </div>
        </div>
    )
}

export default CardNewHome