'use client'
import React from 'react';
import { StyledFooter } from './styles';
import Image from 'next/image';
import { getImageUrl } from '@/utils/commom';
import { Space } from 'antd';
import Link from 'next/link';
import { useLocale } from 'next-intl';

type Props = {
    dataConfig: any;
    dataSocial: any;
};

const Footer = (props: Props) => {

    const { dataConfig, dataSocial } = props;
    const locale = useLocale();

    const textMap: any = {
        vi: {
            warehouse: "Kho hàng",
            office: "Văn phòng",
            phone: "Điện thoại",
            email: "Email"
        },
        en: {
            warehouse: "Warehouse",
            office: "Office",
            phone: "Phone",
            email: "Email"
        },
        zh: {
            warehouse: "仓库",
            office: "办公室",
            phone: "电话",
            email: "邮箱"
        }
    };

    const text = textMap[locale] || textMap.en;

    return (
        <StyledFooter>
            <div className="px-[24px] mt-[32px] mb-[40px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">

                    <div className='col-span-1'>

                        <div className="text-center">

                            <div className="flex justify-center mb-[16px]">
                                <Image
                                    src={getImageUrl(dataConfig?.logo?.url)}
                                    alt="Logo_Home"
                                    width={90}
                                    height={60}
                                />
                            </div>

                            <div className='text-start'>

                                <div className="text-[14px] mb-[4px]">
                                    <div className='grid grid-cols-[80px_auto]'>
                                        <strong className="flex-none mr-1">
                                            {text.warehouse} :
                                        </strong>
                                        <div className="ml-[4px]">
                                            <div>{dataConfig?.address}</div>
                                            <div>{dataConfig?.brandaddress}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-[14px] mb-[4px]">
                                    <div className='grid grid-cols-[80px_auto]'>
                                        <strong className="flex-none">
                                            {text.office} :
                                        </strong>
                                        <div>{dataConfig?.office}</div>
                                    </div>
                                </div>

                                <div className="text-[14px] mb-[4px]">
                                    <div className="grid grid-cols-[80px_auto]">
                                        <strong className="flex-none">
                                            {text.phone} :
                                        </strong>
                                        <div className="whitespace-pre-line">
                                            {dataConfig?.phone}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-[14px] mb-[4px]">
                                    <div className='grid grid-cols-[80px_auto]'>
                                        <strong className="flex-none">
                                            {text.email} :
                                        </strong>
                                        <div className="whitespace-pre-line">
                                            {dataConfig?.email}
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className='flex gap-2 flex-col'>

                            <Space
                                size={16}
                                direction="horizontal"
                                style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}
                            >
                                <div className="flex gap-1 align-middle">

                                    {dataSocial?.map((sc: any) => {
                                        if (sc?.type === 'footer') {
                                            return (
                                                <Link
                                                    key={sc.id}
                                                    href={sc?.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Image
                                                        src={getImageUrl(sc?.image?.formats?.thumbnail?.url)}
                                                        alt={sc?.name}
                                                        width={24}
                                                        height={24}
                                                    />
                                                </Link>
                                            );
                                        }
                                    })}

                                </div>
                            </Space>

                            <div className='flex justify-center'>

                                {dataSocial?.map((sc: any) => {
                                    if (sc?.name === "wechat" && sc?.image?.formats?.thumbnail?.url) {
                                        return (
                                            <Image
                                                key={sc.id}
                                                src={getImageUrl(sc?.image?.formats?.thumbnail?.url)}
                                                alt={sc?.name}
                                                className='mt-2'
                                                width={200}
                                                height={200}
                                            />
                                        )
                                    }
                                })}

                            </div>

                        </div>

                    </div>

                    <div className='col-span-1 md:col-span-2'>
                        <iframe
                            src={dataConfig?.url_google_map}
                            width="100%"
                            height="400px"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                        />
                    </div>

                </div>
            </div>
        </StyledFooter>
    );
};

export default Footer;