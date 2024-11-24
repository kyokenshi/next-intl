"use client"

import CarouselMenu from '@/container/components/CarouselMenu';
import { getImageUrl } from '@/utils/commom';
import Image from 'next/image';
import React from 'react';

type Props = {
    dataPartner: any
    dataService: any
    dataConfig: any
};

const SupportInformation = (props: Props) => {
    const { dataPartner, dataService } = props

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

    return (
        <div className="">
            <div className="bg-blue-1000  text-white grid grid-cols-2 md:grid-cols-4">
                {dataService?.services?.map((el: any, index: number) => (
                    <div key={index} className="flex items-start md:items-center cursor-pointer gap-[8px] hover:bg-[#00a0e9] p-[16px] md:p-[30px]">
                        <div className="flex-none"><Image src={getImageUrl(el?.image?.url)} width={24} height={24} alt='icon' /></div>
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
                    {dataPartner?.map((el: any) => <div key={el.id}><img style={{ widows: 200, height: 140 }} src={getImageUrl(el?.image?.url)} alt={el.description} /></div>)}
                </CarouselMenu>
            </div>
        </div >
    );
};

export default SupportInformation;
