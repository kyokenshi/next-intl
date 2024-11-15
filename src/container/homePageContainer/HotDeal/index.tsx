'use client'
import React from 'react'
import { StyledHotDeal, StyledHotDealTitle } from './styles'
import CardProduct from '@/components/CardProduct'
import CarouselItem from '../../components/CarouselItem'
import { FireFilled } from '@ant-design/icons'

type Props = {}

const HotDeal = (props: Props) => {
    return (
        <StyledHotDeal>
            <StyledHotDealTitle className='mb-[16px]'>
                <div className='hot-deal-title'>
                    <div><FireFilled /></div>
                    <h3>Hot Deal</h3>
                </div>
            </StyledHotDealTitle>
            <CarouselItem
                responsive={[
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
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