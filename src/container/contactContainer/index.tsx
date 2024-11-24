"use client"
import SectionTitle from '@/components/SectionTitle';
import { postContact } from '@/utils/axios/contact';
import { getImageUrl } from '@/utils/commom';
import { Form, Input, Button } from 'antd';
import Image from 'next/image';
import React from 'react'

type Props = {
    dataConfig: any
}

const ContactContainer = (props: Props) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        const resp = await postContact(values);
        if (resp) {
            form.resetFields()
        }
    };

    const { dataConfig } = props
    return (
        <div className='mb-[40px]'>
            <SectionTitle title='Liên hệ' description='Liên hệ' />
            <div className="max-w-[1200px] px-4 xl:px-[0px]  mx-auto">
                <div className='grid grid-cols-1 md:grid-cols-2 md:text-center lg:text-left lg:grid-cols-[auto_1fr_1fr_1fr] gap-[20px] p-[16px] border border-[rgba(221,221,221, 1)] mt-[24px]'>
                    <div className='flex justify-center items-center'>
                        <Image
                            src={getImageUrl(dataConfig?.logo?.url)}
                            alt="Logo_Home"
                            width={90}
                            height={60}
                        />
                    </div>
                    <div><strong>Address</strong> : {dataConfig.address}</div>
                    <div><strong>Phone</strong> : {dataConfig.phone}</div>
                    <div><strong>Email</strong> : {dataConfig.email}</div>
                </div>
                <div className='text-[24px] font-semibold text-center mt-[24px]'>{dataConfig.name_contact_us}</div>
                <Form name="contact" form={form} onFinish={onFinish}>
                    <div className=' w-full flex flex-col gap-[6px]'>
                        <div>Họ tên</div>
                        <Form.Item style={{ marginBottom: 8 }} name='fullname' rules={[{
                            required: true,
                            message: 'Please enter your full name',
                        }]}>
                            <Input placeholder='Họ tên' />
                        </Form.Item>
                    </div>
                    <div className=' w-full flex flex-col gap-[6px]'>
                        <div>Email</div>
                        <Form.Item style={{ marginBottom: 8 }} name='email'
                            rules={[{
                                required: true,
                                message: 'Please enter your email',
                            },
                            {
                                type: "email",
                                message: 'Please enter the correct format',
                            }]}
                        >
                            <Input placeholder='Email' />
                        </Form.Item>
                    </div>
                    <div className=' w-full flex flex-col gap-[6px]'>
                        <div>Số điện thoại</div>
                        <Form.Item style={{ marginBottom: 8 }} name='phone'
                            rules={[{
                                required: true,
                                message: 'Please enter your phone',
                            }]}>
                            <Input placeholder='Số điện thoại' />
                        </Form.Item>
                    </div>
                    <div className=' w-full flex flex-col gap-[6px]'>
                        <div>Nội dung</div>
                        <Form.Item style={{ marginBottom: 8 }} name='note'
                            rules={[{
                                required: true,
                                message: 'Please enter your note',
                            }]}
                        >
                            <Input.TextArea placeholder='Note' />
                        </Form.Item>
                    </div>
                    <div className='flex justify-end'>
                        <Button type='primary' onClick={() => form.submit()}>Send</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ContactContainer