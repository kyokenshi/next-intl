
"use client"
import { Button, Carousel } from 'antd'
import React, { useRef } from 'react'
import { StyledCarouselMenu } from './styles';
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


const CarouselMenu = (props: ICarouselMenu) => {
    const { children, } = props;


    const carouselRef = useRef<any>();

    return (
        <StyledCarouselMenu>
            <Carousel arrows={false} dots={false} ref={carouselRef} >
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
        </StyledCarouselMenu>

    )
}

export default CarouselMenu