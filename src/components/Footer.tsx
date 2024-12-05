import React from 'react'
import { StyledFooter } from './styles'
import Image from 'next/image'
import { getImageUrl } from '@/utils/commom'
import { getApiSocials } from '@/utils/axios/home'
import { Space } from 'antd'
import Link from 'next/link'

type Props = {
    dataConfig: any
}

const Footer = async (props: Props) => {
    const { dataConfig } = props;

    const { data } = await getApiSocials()




    return (
        <StyledFooter >
            <div className='max-w-1200 mx-auto mt-[32px] mb-[40px]'>
                <div className='text-center'>
                    <div className='flex justify-center mb-[16px]'>
                        <Image
                            src={getImageUrl(dataConfig?.logo?.url)}
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
                <Space size={16} direction="horizontal" style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                    {data?.map((item: any) => {
                        return <Link href={item.url}><img src={getImageUrl(item.image.formats?.thumbnail?.url)} width={24} height={24} alt='ALT' /></Link>
                    })}
                </Space>
            </div>


        </StyledFooter>
    )
}

export default Footer