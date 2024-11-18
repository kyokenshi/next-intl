
"use client"
import { Button, Carousel } from 'antd'
import React, { useRef, useState, useTransition } from 'react'
import { StyledCarouselMenu } from './styles';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { CarouselProps } from 'antd/es/carousel';
import { debounce } from 'lodash';
import clsx from 'clsx';

interface ICarouselMenu extends CarouselProps {
    children: React.ReactNode,
    customArrows?: any
    isShowArrows?: boolean
}



const CarouselMenu = (props: ICarouselMenu) => {
    const { children, slidesToShow = 1, dots = false, isShowArrows = true, speed = 400, ...other } = props;



    const [isAnimating, setIsAnimating] = useState(false);
    const carouselRef = useRef<any>();

    const handlePrev = debounce(() => {

        if (!isAnimating) {
            setIsAnimating(true);
            carouselRef.current?.prev();
            setTimeout(() => setIsAnimating(false), 300); // Đợi animation hoàn thành
        }
    }, 300, { leading: true, trailing: false });

    const handleNext = debounce(() => {
        if (!isAnimating) {
            setIsAnimating(true);
            carouselRef.current?.next();
            setTimeout(() => setIsAnimating(false), 300);
        }
    }, 300, { leading: true, trailing: false });

    return (
        <StyledCarouselMenu>
            <Carousel arrows={false} slidesToShow={slidesToShow} dots={dots} ref={carouselRef} speed={speed} {...other}>
                {children}
            </Carousel>
            {isShowArrows && <div style={{ marginTop: 16, textAlign: 'center' }}>
                <div
                    onClick={handlePrev}
                    className={clsx("btn-prev", { 'pointer-events-none': isAnimating })}
                    style={{ marginRight: 8 }}
                >
                    <LeftOutlined style={{ fontSize: 20 }} />
                </div>
                <div
                    onClick={handleNext}
                    className={`btn-next ${isAnimating ? 'pointer-events-none' : ''}`}
                >
                    <RightOutlined style={{ fontSize: 20 }} />
                </div>
            </div>}
        </StyledCarouselMenu>

    )
}

export default CarouselMenu