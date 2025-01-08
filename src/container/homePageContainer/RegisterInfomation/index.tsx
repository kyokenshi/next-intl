'use client'

import { subscribeEmail } from '@/utils/axios/home';
import { App, Form, GetProps, Input, notification } from 'antd';
import React from 'react';

type Props = {
    dataConfig?: any
};


const RegisterInfomation = (props: Props) => {



    const { dataConfig } = props


    const [form] = Form.useForm();


    const onSubmitForm = () => {
        form.submit();
    };

    const onFinish = async (values: any) => {
        if (values.email && values.email?.trim()?.length > 0) {
            const resp = await subscribeEmail({
                email: values.email,
            });
            if (resp) {
                notification.success({
                    message: 'Success',
                    placement: 'topRight',
                });
                form.resetFields()
            }
        }
    }

    return (
        <div>
            <div className='flex items-center max-w-[1200px] mx-auto gap-[24px] md:gap-x-[80px] p-[6px] md:p-[24px] flex-wrap'>
                <div>
                    <strong> {dataConfig?.name_subscribe}</strong>
                </div>
                <Form name='email_form'
                    form={form}
                    onFinish={onFinish}>
                    <Form.Item
                        style={{ marginBottom: 0 }}
                        name="email"
                        rules={[{ type: 'email', message: 'Please enter a valid email!' }]}
                    >
                        <Input
                            className='input-register'
                            suffix={<span onClick={onSubmitForm}>Đăng ký</span>}
                            size="large"
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default RegisterInfomation;
