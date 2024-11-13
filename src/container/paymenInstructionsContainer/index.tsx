import SectionTitle from '@/components/SectionTitle';
import React from 'react'

type Props = {}

const PaymentForInstructionsContainer = (props: Props) => {
    return (
        <div className='mb-[40px]'>
            <SectionTitle title='Hướng dẫn thanh toán qua Ngân Lượng' description='Hướng dẫn thanh toán qua Ngân Lượng' />
            <div className="max-w-[1200px] px-4 xl:px-[0px] mx-auto">
                <div className='mt-[40px]'>
                    <div className='text-[24px] font-semibold mb-[32px]'>
                        Hướng dẫn thanh toán
                    </div>
                    <div className='text-[18px] font-semibold'>
                        Sau khi tới trang thanh toán, quý khách có thể dễ dàng thanh toán bằng cách đăng ký tài khoản mới để đảm bảo các quyền lợi tối ưu nhất dành cho quý khách theo các thao tác sau.
                    </div>
                    <div className='text-[16px] mt-[6px] mb-[16px] font-normal'>
                        A.Hướng dẫn thanh toán bằng cách đăng ký tài khoản
                    </div>
                    <div className='mt-[12px] mb-[24px]'>
                        <p>→ Bước 1: Quý khách vui lòng nhấn vào thẻ “Đăng ký tài khoản”.</p>
                        <p>→ Bước 2: Điền thông tin đăng ký tài khoản.</p>
                        <p>→ Bước 3: Nhấn vào nút “Đăng ký” để hoàn tất thao tác.</p>
                        <p>→ Bước 4: Chọn phương thức vận chuyển phù hợp.</p>
                        <p>→ Bước 5: Xem lại thông tin giỏ hàng.</p>
                        <p>→ Bước 6: Đồng ý với các điều khoản.</p>
                        <p>→ Bước 7: Nhấn “Xác nhận đơn hàng”.</p>
                    </div>


                    <img src='https://js.chili.vn/Img/hdoc3/5.png' alt='huong-dan-thanh-toan-qua-ngan-luong' />
                </div>
            </div>
        </div>
    )
}

export default PaymentForInstructionsContainer