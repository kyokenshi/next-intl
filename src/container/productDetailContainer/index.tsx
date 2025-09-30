"use client";
import CardProductHorizontal from '@/components/CardProductHorizontal';
import MenuList from '@/components/MenuList';
import SectionTitle from '@/components/SectionTitle';
import { formatPrice, getImageUrl } from '@/utils/commom';
import { Divider, Space } from 'antd';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { gtag_report_conversion } from '@/utils/gtag'; // ✅ thêm import

type Props = {
    data: any;
    dataProductNew: any;
};

const ProductDetailContainer = (props: Props) => {
    const { data, dataProductNew } = props;
    const elment = data[0];

    // ✅ Track khi user xem trang chi tiết sản phẩm
    useEffect(() => {
        if (elment?.id) {
            gtag_report_conversion(`product_detail_view_${elment.id}`);
        }
    }, [elment?.id]);

    return (
        <div className="mb-[40px]">
            <SectionTitle title={elment?.title} description={elment?.title} />
            <div className="max-w-[1200px] px-[0px] mx-auto">
                <div className="grid grid-cols-[1fr] sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-[24px] mt-[40px] mb-[40px]">
                    <div>
                        <div className="hidden sm:block">
                            <MenuList title="Mới nhất">
                                <Space direction="vertical" size={12}>
                                    {dataProductNew.map((el: any) => {
                                        return (
                                            <div
                                                key={el.id}
                                                onClick={() => gtag_report_conversion(`new_product_click_${el.id}`)}
                                            >
                                                <CardProductHorizontal {...el} />
                                            </div>
                                        );
                                    })}
                                </Space>
                            </MenuList>
                        </div>
                    </div>
                    <div className="w-[100%] flex flex-col">
                        <div className="flex gap-[35px]">
                            <div>
                                <img
                                    width={380}
                                    height={380}
                                    src={getImageUrl(
                                        elment.images[0]?.formats?.medium?.url
                                            ? elment.images[0]?.formats?.medium?.url
                                            : elment.images[0]?.formats?.thumbnail?.url
                                    )}
                                    alt="product-detail"
                                />
                            </div>
                            <Space direction="vertical" size={12}>
                                <div className="capitalize text-[22px] font-semibold">
                                    {elment?.title}
                                </div>
                                <div>
                                    <Divider />
                                    {elment.price ? (
                                        <span className="font-semibold text-[#00a0ea]">
                                            {formatPrice(elment.price)}
                                        </span>
                                    ) : (
                                        <Link
                                            href={'/contact'}
                                            onClick={() => gtag_report_conversion(`product_contact_${elment.id}`)}
                                        >
                                            <span className="font-semibold text-[#00a0ea]">
                                                {formatPrice(elment.price)}
                                            </span>
                                        </Link>
                                    )}
                                    <Divider />
                                </div>
                                <div>
                                    Danh mục :{' '}
                                    <Link
                                        href={`/product-catalog/${elment?.product_category?.url}`}
                                        onClick={() => gtag_report_conversion(`category_click_${elment?.product_category?.id}`)}
                                    >
                                        <span className="hover:text-[#2865C2]">
                                            {elment?.product_category?.title}
                                        </span>
                                    </Link>
                                </div>
                            </Space>
                        </div>
                        <div className="mt-[32px]">
                            <div className="text-[#fff] bg-[#2865c2] px-[30px] py-[5px] text-[14px] font-semibold w-[fit-content]">
                                Mô tả
                            </div>
                            <div className="border-[1px] border-[#dcdcdc] p-[16px] ">
                                <div dangerouslySetInnerHTML={{ __html: elment.content }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailContainer;
