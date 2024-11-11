'use client'
import React from 'react'
import { StyledHotDeal, StyledHotDealTitle } from './styles'
import CardProduct from '@/components/CardProduct'
import { Carousel } from 'antd'
import CarouselItem from '../CarouselItem'

type Props = {}

const HotDeal = (props: Props) => {
    return (
        <StyledHotDeal>
            <StyledHotDealTitle>
                <div className='hot-deal-title'>
                    <div>â</div>
                    <h3>Hot Deal</h3>
                </div>
            </StyledHotDealTitle>

            <CarouselItem>
                <div >
                    <CardProduct />
                </div>
                <div >
                    <CardProduct />
                </div>
                <div     >
                    <CardProduct />
                </div>
                <div     >
                    <CardProduct />
                </div>
                <div     >
                    <CardProduct />
                </div>
                <div     >
                    <CardProduct />
                </div>
            </CarouselItem>

        </StyledHotDeal>
    )
}

export default HotDeal