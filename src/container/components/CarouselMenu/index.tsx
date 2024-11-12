
"use client"
import { Button, Carousel } from 'antd'
import React, { useRef } from 'react'
import { StyledCarouselMenu } from './styles';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { CarouselProps } from 'antd/es/carousel';

interface ICarouselMenu extends CarouselProps {
    children: React.ReactNode,
    customArrows?: any
    isShowArrows?: boolean
}



const CarouselMenu = (props: ICarouselMenu) => {
    const { children, slidesToShow = 1, dots = false, isShowArrows = true } = props;


    const carouselRef = useRef<any>();

    return (
        <StyledCarouselMenu>
            <Carousel arrows={false} slidesToShow={slidesToShow} dots={dots} ref={carouselRef} >
                {children}
            </Carousel>
            {isShowArrows && <div style={{ marginTop: 16, textAlign: 'center' }}>
                <div onClick={() => carouselRef.current.prev()} className='btn-prev' style={{ marginRight: 8 }}>
                    <LeftOutlined style={{ fontSize: 20 }} />
                </div>
                <div onClick={() => carouselRef.current.next()} className='btn-next'>
                    <RightOutlined style={{ fontSize: 20 }} />
                </div>
            </div>}

        </StyledCarouselMenu>

    )
}

export default CarouselMenu