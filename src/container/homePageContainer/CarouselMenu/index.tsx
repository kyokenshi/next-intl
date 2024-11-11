
"use client"
import { Button, Carousel } from 'antd'
import React, { useRef } from 'react'
import { StyledCarouselMenu } from './styles';

type Props = {}

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


const CarouselMenu = (props: Props) => {


    const carouselRef = useRef<any>();

    return (
        <StyledCarouselMenu>
            <Carousel arrows={false} dots={false} ref={carouselRef}>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
                <div onClick={() => carouselRef.current.prev()} className='btn-prev' style={{ marginRight: 8 }}>
                    P
                </div>
                <div onClick={() => carouselRef.current.next()} className='btn-next'>
                    N
                </div>
            </div>
        </StyledCarouselMenu>

    )
}

export default CarouselMenu