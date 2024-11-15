import styled from "styled-components";



export const StyledCarouselMenu = styled.div`
    position: relative;
    width: 100%;
    .btn-prev, .btn-next {
        position: absolute;
        top: 50%;   
        transform: translateY(-50%);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-prev {
        left: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 30px;
        background: #00000094;
        border-radius: 5px;
        color: #fff;
    }

    .btn-next {
        right: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 30px;
        background: #00000094;
        border-radius: 5px;
        color: #fff;
    }

    /* slick */
    .ant-carousel {
    height: 100%;
  }

  .slick-slider,
  .slick-list,
  .slick-track {
    height: 100%;
  }


  .slick-slide {
    > div {
      height: 100%;
    }
  }
`