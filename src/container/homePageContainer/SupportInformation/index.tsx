"use client"

import CarouselMenu from '@/container/components/CarouselMenu';
import { getImageUrl } from '@/utils/commom';
import React from 'react';

type Props = {
    dataPartner: any
};

const SupportInformation = (props: Props) => {
    const { dataPartner } = props

    const supportInformation = [
        {
            title: 'VẬN CHUYỂN VÀ LẮP ĐẶT',
            description: 'Bàn giao và lắp đặt tại công trình'
        },
        {
            title: 'THANH TOÁN VÀ BẢO MẬT',
            description: 'An Toàn Tuyệt Đối'
        },
        {
            title: 'HỖ TRỢ ONLINE',
            description: 'Chúng Tôi Hỗ Trợ Bạn 24/7'
        },
        {
            title: 'THANH TOÁN KHI NHẬN HÀNG',
            description: 'Thu Tiền Khi Giao Hàng'
        }
    ];

    const supportImg = [
        {
            img: `https://hoaphatthietbi.com/wp-content/uploads/2023/01/d1.png`,
            description: 'Bàn giao và lắp đặt tại công trình'
        },
        {
            img: `https://hoaphatthietbi.com/wp-content/uploads/2023/01/d2.png`,
            description: 'An Toàn Tuyệt Đối'
        },
        {
            img: `https://hoaphatthietbi.com/wp-content/uploads/2023/01/d3.png`,
            description: 'Chúng Tôi Hỗ Trợ Bạn 24/7'
        },
        {
            img: `https://hoaphatthietbi.com/wp-content/uploads/2023/01/d4.png`,
            description: 'Thu Tiền Khi Giao Hàng'
        },
        {
            img: `https://hoaphatthietbi.com/wp-content/uploads/2023/01/dt5-removebg-preview.png`,
            description: 'Thu Tiền Khi Giao Hàng'
        }
    ];


    return (
        <div className="">
            <div className="bg-blue-1000  text-white grid grid-cols-2 md:grid-cols-4">
                {supportInformation.map((el, index) => (
                    <div className="flex items-start md:items-center cursor-pointer gap-[8px] hover:bg-[#00a0e9] p-[16px] md:p-[30px]" key={index}>
                        {/* <div className="flex-none">a</div> */}
                        <div >
                            <div className="text-[12px] font-semibold">{el.title}</div>
                            <div className="text-[12px]">{el.description}</div>
                        </div>
                    </div>
                ))
                }
            </div >
            <div className='p-[24px] mt-[24px] bg-[#F3F3F3]'>
                <CarouselMenu slidesToShow={5} isShowArrows={false} autoplay responsive={[
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ]}>
                    {dataPartner?.map((el: any) => <div key={el.id}><img src={getImageUrl(el?.image?.url)} alt={el.description} /></div>)}
                </CarouselMenu>
            </div>
        </div >
    );
};

export default SupportInformation;
