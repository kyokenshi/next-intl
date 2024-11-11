
import Image from 'next/image'
import React from 'react'

type Props = {}

const CardProduct = (props: Props) => {
    return (
        <div className='card-product'>
            <div>
                <img src='https://hoaphatthietbi.com/wp-content/uploads/2023/01/image11-300x300.jpg' alt='product' />
            </div>

            <div className='mx-[15px] my-[20px] min-h-[40px] text-[16px] line-clamp-2 font-bold '>title</div>


            <div className=' mx-[15px] mb-[20px] min-h-[56px] border-t border-gray-200 pt-[15px]' >100.000</div>

        </div >
    )
}

export default CardProduct