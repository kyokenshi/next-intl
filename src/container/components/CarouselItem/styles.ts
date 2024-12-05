import styled from "styled-components";



export const StyledCarouselItem = styled.div`
    position: relative; 
    .ant-carousel .slick-slide {
    padding: 0 20px;  // Đặt padding mỗi bên 20px để tạo khoảng cách 40px giữa các item
  }
  
  // Đảm bảo item đầu tiên và cuối cùng cũng có padding đúng
    .ant-carousel {
        .slick-list {
            padding-top: 16px;
        /* margin: 0 -20px; */
        }
    }


    .btn-prev, .btn-next {
        position: absolute;
        top: 50%;   
        transform: translateY(-50%);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        display: none;  // Ẩn mặc định
    }

    &:hover {
        .btn-prev, .btn-next {
            display: flex;
        }
    }



    .btn-prev {
        left: -18px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 30px;
        background: #CECECE;
        border-radius: 50%;
        color: #fff;
    }

    .btn-next {
        right: -18px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 30px;
        background: #CECECE;
        border-radius: 50%;
        color: #fff;
    }
`