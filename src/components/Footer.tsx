import React from 'react'
import { StyledFooter } from './styles'
import Image from 'next/image'

type Props = {}

const Footer = (props: Props) => {
    return (
        <StyledFooter >
            <div className='max-w-1200 mx-auto mt-[32px]'>
                <div className='text-center'>
                    <div className='flex justify-center mb-[16px]'>
                        <Image
                            src="/assets/images/logo.png"
                            alt="Logo_Home"
                            width={90}
                            height={60}
                        />
                    </div>
                    <div >
                        <div className='text-[14px] mb-[4px]'><strong>Kho hàng</strong>: Km1, đường phan trọng tuệ, Thanh Trì, Hà Nội</div>
                        <div className='text-[14px] mb-[4px]'><strong>Văn phòng</strong>: Tòa nhà Hòa Phát, Số 70 Nguyễn Đức Cảnh, Phường Tương Mai, Quận Hoàng Mai, Hà Nội</div>
                        <div className='text-[14px] mb-[4px]'><strong>Điện thoại</strong>: 0983.884.194</div>
                        <div className='text-[14px] mb-[4px]'><strong>Email</strong>: Hoaphatthietbi.banhang@gmail.com</div>
                    </div>

                </div>
            </div>

        </StyledFooter>
    )
}

export default Footer