import Image from 'next/image'
import React from 'react'

type Props = {
    size?: number;
}

const CardProductHorizontal = (props: Props) => {
    const { size = 82 } = props
    return (
        <div className='grid grid-cols-[82px_1fr] gap-[12px]'>
            <Image src='https://hoaphatthietbi.com/wp-content/uploads/2024/11/may-nghien-be-tong26-300x300.jpg' alt='product' width={size} height={size} className='cursor-pointer' />
            <div >
                <div className='text-[14px] capitalize font-semibold hover:text-[#2865C2] mb-[4px] cursor-pointer'>Máy nghiền bột 26</div>
                <div className='text-[14px] '>1.200 VNĐ</div>
            </div>
        </div>
    )
}

export default CardProductHorizontal