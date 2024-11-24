import React from 'react'
import { StyledFooter } from './styles'
import Image from 'next/image'

type Props = {
    dataConfig: any
}

const Footer = (props: Props) => {
    const { dataConfig } = props;
    return (
        <StyledFooter >
            <div className='max-w-1200 mx-auto mt-[32px] mb-[40px]'>
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
                        <div className='text-[14px] mb-[4px]'>
                            <div className='flex justify-center'>
                                <strong className=''>Kho hàng</strong> :
                                <div className='ml-[4px]'>

                                    <div> {dataConfig?.address}</div>
                                    <div>
                                        {dataConfig?.brandaddress}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-[14px] mb-[4px]'><strong>Văn phòng</strong>: {dataConfig?.office}</div>
                        <div className='text-[14px] mb-[4px]'><strong>Điện thoại</strong>: {dataConfig?.phone}</div>
                        <div className='text-[14px] mb-[4px]'><strong>Email</strong>: {dataConfig?.email}</div>
                    </div>

                </div>
            </div>

        </StyledFooter>
    )
}

export default Footer