import React from 'react'
import { StyledFooter } from './styles'

type Props = {}

const Footer = (props: Props) => {
    return (
        <StyledFooter >
            <div className='max-w-1200 mx-auto'>
                <div className='text-center'>
                    <div className='flex justify-center mb-[16px]'>
                        <img src="https://hoaphatthietbi.com/wp-content/uploads/2023/01/logo1.png" alt="logo" />

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