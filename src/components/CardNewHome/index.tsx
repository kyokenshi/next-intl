import { getImageUrl } from '@/utils/commom'
import Image from 'next/image'
import React from 'react'

type Props = {
    cover?: any
    title?: string
}

const CardNewHome = (props: Props) => {
    const { cover, title } = props
    return (
        <div>
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
            <div className='p-[14px] text-center' >
                <div className='text-[20px] text-[#2764c2]'>{title}</div>
                <div className='text-center text-[12px] mt-[16px]'>See more<span className='ml-[4px]'>→</span></div>
            </div>
        </div>
    )
}

export default CardNewHome