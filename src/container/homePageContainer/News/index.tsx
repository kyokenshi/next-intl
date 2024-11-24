import React from 'react'
import { StyledNews } from './styles'
import CardNewHome from '@/components/CardNewHome'

type Props = {
    dataArticle: any
}

const News = (props: Props) => {

    const { dataArticle } = props

    return (
        <StyledNews>
            <h3 className='text-[20px] font-bold text-[#2764c2] text-center mb-[16px]' >TIN TỨC</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]'>
                {dataArticle?.map((el: any) => <CardNewHome key={el.id} {...el} />)}
            </div>
        </StyledNews>
    )
}

export default News