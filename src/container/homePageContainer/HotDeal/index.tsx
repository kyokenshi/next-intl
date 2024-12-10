'use client'
import React from 'react'
import { StyledHotDeal, StyledHotDealTitle } from './styles'
import CardProduct from '@/components/CardProduct'
import CarouselItem from '../../components/CarouselItem'
import { FireFilled } from '@ant-design/icons'

type HotDealProps = {
    title?: string
    productions: any[]
}

const HotDeal = (props: HotDealProps) => {
    const { title, productions } = props;

    return (
        <StyledHotDeal>
            <StyledHotDealTitle className='mb-[16px]'>
                <div className='hot-deal-title'>
                    <div><FireFilled /></div>
                    <h3>{title}</h3>
                </div>
            </StyledHotDealTitle>
            <CarouselItem
                itemLength={productions.length}
                responsive={[
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]}>
                {productions?.map((product) => (<div> <CardProduct {...product} /></div>))}
            </CarouselItem>
        </StyledHotDeal>
    )
}

export default HotDeal