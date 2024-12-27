"use client"
import CarouselMenu from '@/container/components/CarouselMenu';
import { getImageUrl } from '@/utils/commom';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import React from 'react';

type Props = {
    dataPartner: any
    dataService: any
    dataConfig: any
};

const SupportInformation = (props: Props) => {
    const { dataPartner, dataService, dataConfig } = props

    const locale = useLocale();
    // const supportInformation = [
    //     {
    //         title: 'VẬN CHUYỂN VÀ LẮP ĐẶT',
    //         description: 'Bàn giao và lắp đặt tại công trình'
    //     },
    //     {
    //         title: 'THANH TOÁN VÀ BẢO MẬT',
    //         description: 'An Toàn Tuyệt Đối'
    //     },
    //     {
    //         title: 'HỖ TRỢ ONLINE',
    //         description: 'Chúng Tôi Hỗ Trợ Bạn 24/7'
    //     },
    //     {
    //         title: 'THANH TOÁN KHI NHẬN HÀNG',
    //         description: 'Thu Tiền Khi Giao Hàng'
    //     }
    // ];


    const renderContent = () => {
        if (locale === "en") {
            return dataConfig?.en_name_home_content
        }
        if (locale === "zh") {
            return dataConfig?.cn_name_home_content
        }
        return dataConfig?.vn_name_home_content
    }





    return (
        <div className="mt-4 mb-4">
            {/* <div className="bg-blue-1000  text-white grid grid-cols-2 md:grid-cols-4 ">
                {dataService?.services?.map((el: any, index: number) => (
                    <div key={index} className="flex items-start md:items-center cursor-pointer gap-[8px] hover:bg-[#00a0e9] p-[16px] md:p-[30px]">
                        <div className="flex-none"><Image src={getImageUrl(el?.image?.url)} width={50} height={50} alt='icon' /></div>
                        <div >
                            <div className="text-[13px] font-semibold uppercase">{el.title}</div>
                            <div className="text-[12px]">{el.description}</div>
                        </div>
                    </div>
                ))
                }
            </div > */}

            <div className="bg-blue-1000 text-center  text-white grid grid-cols-2 md:grid-cols-1 ">
                <div className='p-4 text-[20px] font-[600]' >{renderContent()}</div>
            </div >
            <div className='py-[24px] mt-[24px]'>
                {dataPartner?.map((el: any, index: number) => {
                    return <div className='py-[24px] gap-4 last-of-type:!border-b-[0]' key={index} style={{
                        display: "grid",
                        gridTemplateColumns: "200px auto",
                        alignItems: "center",
                        borderBottom: "1px dashed #E2E2E2",
                        paddingBottom: "24px"
                    }} >
                        <div>
                            {/* style={{
                            color: #e25656,
                            fontSize: "22px",
                            fontWeight: 500
                        }} */}
                            <div className="text-[#e25656] text-[20px] font-[500]">
                                {el?.title}
                            </div>
                            {/* <div className='text-[18px] font-[400] '>12121</div> */}
                        </div>
                        <div>
                            <div className='grid  sm:grid-cols-2 md:grid-cols-4 gap-[48px]'>
                                {el?.clients?.map((el2: any, index: number) => {
                                    return <div className='rounded-[8px] h-[100px]' key={index} style={{
                                        background: "#F3F3F3",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 20
                                    }}>
                                        <img src={getImageUrl(el2?.image?.url)} alt='LOGO_COVER' />
                                    </div>
                                })}
                            </div>
                        </div>

                    </div>
                })}
            </div>
        </div >
    );
};

export default SupportInformation;
