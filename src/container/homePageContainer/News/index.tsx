import React from 'react'
import { StyledNews } from './styles'
import CardNewHome from '@/components/CardNewHome'

type Props = {}

const News = (props: Props) => {

    const data = [{
        id: 1,
        image: 'https://hoaphatthietbi.com/wp-content/uploads/2023/01/tt3.jpg',
        title: 'Máy nghiền cát nhân tạo tại tỉnh Quảng Ninh',
    }, {
        id: 2,
        image: 'https://hoaphatthietbi.com/wp-content/uploads/2023/01/tt3.jpg',
        title: 'Máy nghiền cát nhân tạo tại tỉnh Quảng Ninh',
    }, {
        id: 3,
        image: 'https://hoaphatthietbi.com/wp-content/uploads/2023/01/tt3.jpg',
        title: 'Máy nghiền cát nhân tạo tại tỉnh Quảng Ninh',
    }]

    return (
        <StyledNews>
            <h3 className='text-[20px] font-bold text-[#2764c2] text-center mb-[16px]' >TIN TỨC</h3>
            <div className='grid grid-cols-3 gap-[16px]'>
                {data.map((el) => <CardNewHome key={el.id} {...el} />)}
            </div>
        </StyledNews>
    )
}

export default News