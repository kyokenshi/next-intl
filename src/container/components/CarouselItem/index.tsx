
"use client"
import { Button, Carousel } from 'antd'
import React, { useRef } from 'react'
import { StyledCarouselItem } from './styles';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CarouselProps } from 'antd/es/carousel';
interface ICarouselMenu extends CarouselProps {
    children: React.ReactNode,
    customArrows?: any
}




const CarouselItem = (props: ICarouselMenu) => {
    const { children, arrows = false, dots = false, slidesToScroll = 1, centerPadding = '0px', slidesToShow = 4 } = props;


    const carouselRef = useRef<any>();

    return (
        <StyledCarouselItem>
            <Carousel slidesToShow={slidesToShow} arrows={arrows} dots={dots} slidesToScroll={slidesToScroll} infinite ref={carouselRef}
                centerPadding={centerPadding}>
                {children}
            </Carousel>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
                <div onClick={() => carouselRef.current.prev()} className='btn-prev' style={{ marginRight: 8 }}>
                    <LeftOutlined style={{ fontSize: 20 }} />
                </div>
                <div onClick={() => carouselRef.current.next()} className='btn-next'>
                    <RightOutlined style={{ fontSize: 20 }} />
                </div>
            </div>
        </StyledCarouselItem>

    )
}

export default CarouselItem