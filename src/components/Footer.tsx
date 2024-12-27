import React from 'react';
import { StyledFooter } from './styles';
import Image from 'next/image';
import { getImageUrl } from '@/utils/commom';
import { getApiSocials } from '@/utils/axios/home';
import { Space } from 'antd';
import Link from 'next/link';

type Props = {
    dataConfig: any;
    dataSocial: any;
};

const Footer = (props: Props) => {
    const { dataConfig, dataSocial } = props;

    return (
        <StyledFooter>
            <div className="max-w-1200 mx-auto mt-[32px] mb-[40px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
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
                                    <div className="flex justify-center">
                                        <strong className="flex-none mr-1">Kho hàng</strong> :
                                        <div className="ml-[4px]">
                                            <div> {dataConfig?.address}</div>
                                            <div> {dataConfig?.brandaddress}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center text-[14px] mb-[4px]">
                                    <strong className="flex-none">Văn phòng</strong> : <div>{dataConfig?.office}</div>
                                </div>
                                <div className="flex justify-center text-[14px] mb-[4px]">
                                    <strong className="flex-none">Điện thoại</strong> : <div>{dataConfig?.phone}</div>
                                </div>
                                <div className="flex justify-center text-[14px] mb-[4px]">
                                    <strong className="flex-none">Email</strong> : <div>{dataConfig?.email}</div>
                                </div>
                            </div>
                        </div>
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
                    </div>
                    <div>
                        <iframe
                            src={dataConfig?.url_google_map}
                            width="100%"
                            height="300"
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
