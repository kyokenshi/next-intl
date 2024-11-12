import React from 'react'

type Props = {
    image?: string
    title?: string
}

const CardNew = (props: Props) => {
    const { image, title } = props
    return (
        <div>
            <img src={image} alt='new' />
            <div className='p-[14px] text-center'>
                <div className='text-[20px] text-[#2764c2]'>{title}</div>
                <div className='text-center text-[12px] mt-[16px]'>Xem thêm <span className='ml-[4px]'>→</span></div>
            </div>
        </div>
    )
}

export default CardNew