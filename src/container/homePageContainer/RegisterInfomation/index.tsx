'use client'

import { subscribeEmail } from '@/utils/axios/home';
import { Form, GetProps, Input } from 'antd';
import React from 'react';

type Props = {};

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const RegisterInfomation = (props: Props) => {

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        if (values.email && values.email?.trim()?.length > 0) {
            const resp = await subscribeEmail({
                email: values.email,
            });
            if (resp) {
                form.resetFields()
            }
        }
    }

    return (
        <div style={{

        }}>
            <div className='flex items-center max-w-[1200px] mx-auto gap-[24px] md:gap-[40px] p-[24px] flex-wrap'>
                <div>
                    <strong> ĐĂNG KÝ NHẬN TIN</strong> VÀ NHẬN KHUYẾN MÃI TỪ CHÚNG TÔI
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
                            suffix="Đăng ký"
                            style={{ maxWidth: 500 }}
                            size="large"
                        />
                    </Form.Item>
                </Form>
            </div>

        </div>
    );
};

export default RegisterInfomation;
