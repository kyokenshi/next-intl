import Image from 'next/image'
import React from 'react'

type Props = {
    size?: number;
}

const CardProductHorizontal = (props: Props) => {
    const { size = 60 } = props
    return (
        <div className='grid grid-cols-[60px_1fr] gap-[12px]'>
            {/* <img loading='lazy' src='https://hoaphatthietbi.com/wp-content/uploads/2023/01/tt2-100x100.jpg' alt='product' width={size} height={size} className='cursor-pointer' /> */}

            <div className="p-[6px] relative w-full aspect-square"> {/* Thêm aspect-square để tạo container vuông */}
                <Image
                    className="object-cover" // Thêm object-cover
                    src="https://hoaphatthietbi.com/wp-content/uploads/2023/01/tt2-100x100.jpg"
                    alt="product"
                    fill
                />
            </div>
            <div >
                <div className='text-[14px] hover:text-[#2865C2] mb-[4px] cursor-pointer'>Máy nghiền bột 26</div>
            </div>
        </div>
    )
}

export default CardProductHorizontal