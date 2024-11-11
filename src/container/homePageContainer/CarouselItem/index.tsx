
"use client"
import { Button, Carousel } from 'antd'
import React, { useRef } from 'react'
import { StyledCarouselItem } from './styles';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';


interface ICarouselMenu {
    children: React.ReactNode,
    customArrows?: any
}

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


const CarouselItem = (props: ICarouselMenu) => {
    const { children, } = props;


    const carouselRef = useRef<any>();

    return (
        <StyledCarouselItem>
            <Carousel slidesToShow={4} arrows={false} dots={false} slidesToScroll={1} infinite ref={carouselRef} centerPadding='20px'>
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