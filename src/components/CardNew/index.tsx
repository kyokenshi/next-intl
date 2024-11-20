import { Button, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

type Props = {
    title?: string;
    description?: string;
}

const CardNew = (props: Props) => {
    const { title, description } = props;
    return (
        <div className='shadow-custom2'>

            <div className="p-[6px] relative w-full aspect-square"> {/* Thêm aspect-square để tạo container vuông */}
                <Image
                    className="object-cover" // Thêm object-cover
                    src="https://hoaphatthietbi.com/wp-content/uploads/2023/01/tt3.jpg"
                    alt="product"
                    fill
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className='p-[12px]'>
                <Space size={6} direction='vertical'>
                    <div className='text-[18px] text-[#333333] hover:text-[#2865c2] cursor-pointer font-semibold line-clamp-2'>
                        {title}
                    </div>
                    <div className='text-[12px] line-clamp-3'>
                        {description}
                    </div>
                </Space>
                <div className='w-full flex justify-end '>
                    <Button type='primary' className='mt-[12px]'>See more</Button>
                </div>
            </div>
        </div>
    )
}

export default CardNew
