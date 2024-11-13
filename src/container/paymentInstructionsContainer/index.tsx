import SectionTitle from '@/components/SectionTitle';
import React from 'react'

type Props = {}

const PaymentInstructionsContainer = (props: Props) => {
    return (
        <div className='mb-[40px]'>
            <SectionTitle title='Hướng dẫn thanh toán qua Ngân Lượng' description='Hướng dẫn thanh toán qua Ngân Lượng' />
            <div className="max-w-[1200px] mx-auto">
                <div className='mt-[40px]'>
                    <div className='text-[24px] font-semibold'>
                        Hướng dẫn thanh toán qua Ngân Lượng
                    </div>
                    <div className='text-[16px] font-normal'>
                        Thanh toán trực tuyến an toàn với ví NganLuong.vn

                    </div>
                    <div className='text-[16px] font-normal'>
                        Khi chọn hình thức thanh toán này quý khách vui lòng nhấn vào link được khoanh đỏ trong hình để thao tác được thuận tiện hơn.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentInstructionsContainer