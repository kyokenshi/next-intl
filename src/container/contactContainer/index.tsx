"use client"
import SectionTitle from '@/components/SectionTitle';
import { Form, Input, Button } from 'antd';
import Image from 'next/image';
import React from 'react'

type Props = {}

const ContactContainer = (props: Props) => {
    return (
        <div className='mb-[40px]'>
            <SectionTitle title='Liên hệ' description='Liên hệ' />
            <div className="max-w-[1200px] px-4 xl:px-[0px]  mx-auto">
                <div className='grid grid-cols-1 md:grid-cols-2 md:text-center lg:text-left lg:grid-cols-[auto_1fr_1fr_1fr] gap-[20px] p-[16px] border border-[rgba(221,221,221, 1)] mt-[24px]'>
                    <div className='flex justify-center items-center'>
                        <Image src='/assets/images/logo.png' alt='hotline' width={100} height={100} />
                    </div>
                    <div><strong>Hotline</strong> : Tòa nhà Hòa Phát, Số 70 Nguyễn Đức Cảnh, P. Tương Mai, Q. Hoàng Mai, HN</div>
                    <div><strong>Điện thoại</strong> : 0983.884.194</div>
                    <div><strong>Email</strong> : Hoaphatthietbi.banhang@gmail.com</div>
                </div>
                <div className='text-[24px] font-semibold text-center mt-[24px]'>Liên hệ với chúng tôi</div>
                <Form>
                    <div className=' w-full flex flex-col gap-[6px]'>
                        <div>Họ tên</div>
                        <Form.Item name='name' >
                            <Input placeholder='Họ tên' />
                        </Form.Item>
                    </div>
                    <div className=' w-full flex flex-col gap-[6px]'>
                        <div>Email</div>
                        <Form.Item name='email' >
                            <Input placeholder='Email' />
                        </Form.Item>
                    </div>
                    <div className=' w-full flex flex-col gap-[6px]'>
                        <div>Số điện thoại</div>
                        <Form.Item name='phone' >
                            <Input placeholder='Số điện thoại' />
                        </Form.Item>
                    </div>
                    <div className=' w-full flex flex-col gap-[6px]'>
                        <div>Nội dung</div>
                        <Form.Item name='message' >
                            <Input.TextArea placeholder='Nội dung' />
                        </Form.Item>
                    </div>
                    <div className='flex justify-end'>
                        <Button type='primary'>Gửi</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ContactContainer