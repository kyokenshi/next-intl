import SectionTitle from '@/components/SectionTitle';
import React from 'react'

type Props = {}

const DynamicContainer = (props: Props) => {
    return (
        <div className='mb-[40px]'>
            <SectionTitle title='Chuyển khoản ngân hàng' description='Chuyển khoản ngân hàng' />
            <div className="max-w-[1200px] px-4 xl:px-[0px]  mx-auto">
                <div className='mt-[40px]'>
                    <div className='text-[24px]  font-semibold mb-[32px]'>
                        Chuyển khoản ngân hàng
                    </div>
                    <div className='text-[16px] mt-[6px] mb-[16px]'>
                        Khi nhấn chọn phương thức thanh toán này, quý khách vui lòng xem thông tin tài khoản ngân hàng bên dưới vài thực hiện giao dịch tại ngân hàng. Ví dụ vị trí tài khoản ngân hàng và thực hiện giao dịch tại ngân hàng.
                    </div>
                    <img src='https://js.chili.vn/Img/hdoc3/10.png' alt='huong-dan-thanh-toan-qua-ngan-luong' />
                </div>
            </div>
        </div>
    )
}

export default DynamicContainer