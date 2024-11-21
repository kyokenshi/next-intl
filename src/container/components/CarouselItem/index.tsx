
"use client"
import { Button, Carousel } from 'antd'
import React, { useRef, useState, useTransition } from 'react'
import { StyledCarouselItem } from './styles';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CarouselProps } from 'antd/es/carousel';
import { debounce } from 'lodash';
interface ICarouselMenu extends CarouselProps {
    children: React.ReactNode,
    customArrows?: any
}




const CarouselItem = (props: ICarouselMenu) => {
    const { children, arrows = false, dots = false, slidesToScroll = 1, centerPadding = '0px', slidesToShow = 4, ...other } = props;

    const [isAnimating, setIsAnimating] = useState(false);
    const carouselRef = useRef<any>();

    const handlePrev = debounce(() => {

        if (!isAnimating) {
            setIsAnimating(true);
            carouselRef.current?.prev();
            setTimeout(() => setIsAnimating(false), 300); // Đợi animation hoàn thành
        }
    }, 200, { leading: true, trailing: false });



    const handleNext = debounce(() => {

        if (!isAnimating) {
            setIsAnimating(true);
            carouselRef.current?.next();
            setTimeout(() => setIsAnimating(false), 300);
        }
    }, 200, { leading: true, trailing: false });

    return (
        <StyledCarouselItem>
            <Carousel slidesToShow={slidesToShow} arrows={arrows} dots={dots} slidesToScroll={slidesToScroll} infinite ref={carouselRef}
                centerPadding={centerPadding} {...other}>
                {children}
            </Carousel>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
                <div onClick={handlePrev} className={`btn-prev ${isAnimating ? 'pointer-events-none' : ''}`} >
                    <LeftOutlined style={{ fontSize: 20 }} />
                </div>
                <div onClick={handleNext} className={`btn-next ${isAnimating ? 'pointer-events-none' : ''}`}>
                    <RightOutlined style={{ fontSize: 20 }} />
                </div>
            </div>
        </StyledCarouselItem>

    )
}

export default CarouselItem