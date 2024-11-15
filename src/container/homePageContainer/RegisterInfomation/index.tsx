'use client'

import { GetProps, Input } from 'antd';
import React from 'react';

type Props = {};

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const RegisterInfomation = (props: Props) => {
    const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
        console.log(info?.source, value);

    return (
        <div style={{
            // right: 0,
            // left: 0,
            // width: '99.4vw',
            // margin: '0px calc(50% - 50vw)',
            // background: '#F3F3F3',
            // marginTop: 24
        }}>
            <div className='flex items-center max-w-[1200px] mx-auto gap-[40px] p-[24px]'>
                <div>
                    <strong> ĐĂNG KÝ NHẬN TIN</strong> VÀ NHẬN KHUYẾN MÃI TỪ CHÚNG TÔI
                </div>
                <Search
                    style={{ maxWidth: 500 }}
                    placeholder="nhập email của bạn"
                    enterButton="Đăng ký"
                    size="large"
                    onSearch={onSearch}
                />
            </div>

        </div>
    );
};

export default RegisterInfomation;
