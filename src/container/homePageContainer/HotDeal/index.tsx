'use client'
import React from 'react'
import { StyledHotDeal, StyledHotDealTitle } from './styles'
import CardProduct from '@/components/CardProduct'
import CarouselItem from '../../components/CarouselItem'

type Props = {}

const HotDeal = (props: Props) => {
    return (
        <StyledHotDeal>
            <StyledHotDealTitle className='mb-[16px]'>
                <div className='hot-deal-title'>
                    <div>â</div>
                    <h3>Hot Deal</h3>
                </div>
            </StyledHotDealTitle>
            <CarouselItem>
                <div>
                    <CardProduct />
                </div>
                <div>
                    <CardProduct />
                </div>
                <div>
                    <CardProduct />
                </div>
                <div>
                    <CardProduct />
                </div>
                <div>
                    <CardProduct />
                </div>
                <div>
                    <CardProduct />
                </div>
            </CarouselItem>
        </StyledHotDeal>
    )
}

export default HotDeal