import CardProduct from '@/components/CardProduct'
import CardProductHorizontal from '@/components/CardProductHorizontal'
import MenuList from '@/components/MenuList'
import SectionTitle from '@/components/SectionTitle'
import { formatPrice, getImageUrl } from '@/utils/commom'
import { Divider, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

type Props = {
    data: any;
    dataProductNew: any
}

const ProductDetailContainer = (props: Props) => {

    const { data, dataProductNew } = props;

    const elment = data[0];




    return (
        <div className='mb-[40px]'>
            <SectionTitle title={elment?.title} description={elment?.title} />
            <div className="max-w-[1200px] px-[0px] mx-auto">
                <div className="grid grid-cols-[1fr] sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-[24px] mt-[40px] mb-[40px]">
                    <div>
                        <div className='hidden sm:block'>
                            <MenuList title='Mới nhất'>
                                <Space direction='vertical' size={12}>
                                    {dataProductNew.map((el: any) => {
                                        return <CardProductHorizontal key={el.id} {...el} />;
                                    })}
                                </Space>
                            </MenuList>
                        </div>
                    </div>
                    <div className='w-[100%] flex flex-col'>
                        <div className='flex gap-[35px]'>
                            <div>
                                <Image width={380} height={380} objectFit='cover' src={getImageUrl(elment.images[0]?.formats?.thumbnail?.url)} alt='product-detail' />
                            </div>
                            <Space direction='vertical' size={12}>
                                <div className='capitalize text-[22px] font-semibold'>{elment?.title}</div>
                                <div>
                                    <Divider />
                                    <span className='font-semibold text-[#00a0ea]'>
                                        {formatPrice(elment.price)}
                                    </span>
                                    <Divider />

                                </div>
                                <div>Danh mục : <span>{elment?.product_category?.title}</span></div>
                                {/* <Space size={12} >
                                    <InputNumber min={1} />
                                    <div>
                                        <Button type='primary'>Mua hàng</Button>
                                    </div>
                                </Space> */}
                            </Space>
                        </div>
                        <div>
                            <div className='text-[#fff] bg-[#2865c2] px-[30px] py-[5px] text-[14px] font-semibold w-[fit-content]'>Mô tả</div>
                            <div className='border-[1px] border-[#dcdcdc] p-[16px] '>
                                <div
                                    dangerouslySetInnerHTML={{ __html: elment.content }}
                                ></div>
                            </div>
                        </div>
                        {/* <div className='mt-[24px]'>
                            <div className='text-[24px] font-semibold uppercase border-b-[1px] border-[ #c2c6c6] pb-[16px]'>
                                Sản phẩm tương tự
                            </div>
                            <div>
                                <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-[16px] mt-[32px]">
                                    {productList.map((el) => {
                                        return <CardProduct {...el} key={el.id} />;
                                    })}
                                </div>

                            </div>
                        </div> */}
                    </div>

                </div>

            </div>
        </div >
    )
}

export default ProductDetailContainer