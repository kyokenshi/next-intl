"use client"
import SectionTitle from '@/components/SectionTitle';
import { postContact } from '@/utils/axios/contact';
import { getImageUrl } from '@/utils/commom';
import { Form, Input, Button } from 'antd';
import Image from 'next/image';
import React from 'react';
import { gtag_event } from '@/utils/gtag';
import { useLocale } from "next-intl";

type Props = {
    dataConfig: any
}

const ContactContainer = (props: Props) => {

    const [form] = Form.useForm();
    const locale = useLocale();
    const textMap: any = {
        vi: {
            address: "Địa chỉ",
            phone: "Điện thoại",
            email: "Email",
            fullname: "Họ và tên",
            note: "Ghi chú",
            send: "Gửi",
            contact_us: "Liên hệ với chúng tôi",
            contact: "Liên hệ"
        },
        en: {
            address: "Address",
            phone: "Phone",
            email: "Email",
            fullname: "Full Name",
            note: "Note",
            send: "Send",
            contact_us: "Contact Us",
            contact: "Contact"
        },
        zh: {
            address: "地址",
            phone: "电话",
            email: "邮箱",
            fullname: "姓名",
            note: "备注",
            send: "发送",
            contact_us: "联系我们",
            contact: "联系"
        }
    };

    const text = textMap[locale] || textMap.en;

    const onFinish = async (values: any) => {
        const resp = await postContact(values);
        if (resp) {
            form.resetFields();

            gtag_event('contact_form_submit', {
                event_category: 'contact',
                event_label: 'Contact form submitted successfully',
            });
        }
    };

    const { dataConfig } = props;

    return (
        <div className='mb-[40px]'>
            <SectionTitle
                title={text.contact_us}
                description={text.contact_us}
            />

            <div className="max-w-[1200px] px-4 xl:px-[0px] mx-auto">

                <div className='grid grid-cols-1 md:grid-cols-2 md:text-center lg:text-left lg:grid-cols-[auto_1fr_1fr_1fr] gap-[20px] p-[16px] border border-[rgba(221,221,221, 1)] mt-[24px]'>

                    <div className='flex justify-center items-center'>
                        <Image
                            src={getImageUrl(dataConfig?.logo?.url)}
                            alt="Logo_Home"
                            width={90}
                            height={60}
                        />
                    </div>

                    <div>
                        <strong>{text.address}</strong> : {dataConfig?.address}
                    </div>

                    <div>
                        <strong>{text.phone}</strong> :
                        <div className="whitespace-pre-line">{dataConfig?.phone}</div>
                    </div>

                    <div>
                        <strong>{text.email}</strong> :
                        <div className="whitespace-pre-line">{dataConfig?.email}</div>
                    </div>

                </div>

                <div className='text-[24px] font-semibold text-center mt-[24px]'>
                    {text.contact}
                </div>

                <Form name="contact" form={form} onFinish={onFinish}>

                    <div className='w-full flex flex-col gap-[6px]'>
                        <div>{text.fullname}</div>
                        <Form.Item
                            style={{ marginBottom: 8 }}
                            name='fullname'
                            rules={[{
                                required: true,
                                message: 'Please enter your full name',
                            }]}
                        >
                            <Input placeholder={text.fullname} />
                        </Form.Item>
                    </div>

                    <div className='w-full flex flex-col gap-[6px]'>
                        <div>{text.email}</div>
                        <Form.Item
                            style={{ marginBottom: 8 }}
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email',
                                },
                                {
                                    type: "email",
                                    message: 'Please enter the correct format',
                                }
                            ]}
                        >
                            <Input placeholder={text.email} />
                        </Form.Item>
                    </div>

                    <div className='w-full flex flex-col gap-[6px]'>
                        <div>{text.phone}</div>
                        <Form.Item
                            style={{ marginBottom: 8 }}
                            name='phone'
                            rules={[{
                                required: true,
                                message: 'Please enter your phone',
                            }]}
                        >
                            <Input placeholder={text.phone} />
                        </Form.Item>
                    </div>

                    <div className='w-full flex flex-col gap-[6px]'>
                        <div>{text.note}</div>
                        <Form.Item
                            style={{ marginBottom: 8 }}
                            name='note'
                            rules={[{
                                required: true,
                                message: 'Please enter your note',
                            }]}
                        >
                            <Input.TextArea placeholder={text.note} />
                        </Form.Item>
                    </div>

                    <div className='flex justify-end'>
                        <Button
                            type='primary'
                            style={{ background: '#2865C2' }}
                            onClick={() => form.submit()}
                        >
                            {text.send}
                        </Button>
                    </div>

                </Form>

            </div>
        </div>
    )
}

export default ContactContainer;