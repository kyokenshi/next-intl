import styled from "styled-components";



export const StyledCarouselMenu = styled.div`
    position: relative;

    .btn-prev, .btn-next {
        position: absolute;
        top: 50%;   
        transform: translateY(-50%);
        cursor: pointer;
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
`