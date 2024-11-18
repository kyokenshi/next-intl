import CardProductHorizontal from '@/components/CardNewHorizontal'
import CardProduct from '@/components/CardProduct'
import MenuList from '@/components/MenuList'
import SectionTitle from '@/components/SectionTitle'
import { Button, Divider, InputNumber, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

type Props = {}

const ProductDetailContainer = (props: Props) => {

    const listMenuProduct = [
        {
            id: 1,
            name: 'Chưa phân loại'
        },
        {
            id: 2,
            name: 'Thiết Bị Khai Thác mỏ'
        },
        {
            id: 3,
            name: 'Máy nghiền cát'
        },
        {
            id: 4,
            name: 'Cấp liệu rung'
        },
        {
            id: 5,
            name: 'Sản phầm khuyến mãi'
        }
    ];

    const productList = [
        {
            id: 1,
            name: 'Máy nghiền cát'
        },
        {
            id: 2,
            name: 'Máy nghiền cát'
        },
        {
            id: 3,
            name: 'Máy nghiền cát'
        },
        {
            id: 4,
            name: 'Máy nghiền cát'
        }
    ];

    const option = [
        {
            label: 'Máy nghiền cát',
            value: 1
        },
        {
            label: 'Máy nghiền cát',
            value: 2
        },
        {
            label: 'Máy nghiền cát',
            value: 3
        }
    ];


    return (
        <div className='mb-[40px]'>
            <SectionTitle title='Cấp liệu rung' description='Cấp liệu rung' />
            <div className="max-w-[1200px] px-[0px] mx-auto">
                <div className="grid grid-cols-[1fr] sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-[24px] mt-[40px] mb-[40px]">
                    <div>
                        <div className='hidden sm:block'>
                            <MenuList title='Mới nhất'>
                                <Space direction='vertical' size={12}>
                                    {listMenuProduct.map((el) => {
                                        return <CardProductHorizontal key={el.id} />;
                                    })}
                                </Space>
                            </MenuList>
                        </div>
                    </div>
                    <div className='w-[100%] flex flex-col'>
                        <div className='flex gap-[35px]'>
                            <div>
                                <img src='https://hoaphatthietbi.com/wp-content/uploads/2023/01/image9.jpg' alt='product-detail' />
                            </div>
                            <Space direction='vertical' size={12}>
                                <div className='capitalize text-[22px] font-semibold'>Cấp độ rung</div>
                                <div>
                                    <Divider />
                                    1VNĐ
                                    <Divider />
                                </div>
                                <div>Danh mục:<span>Cấp độ rung</span>, <span>Thiết bị khai thác mỏ</span></div>
                                <Space size={12} >
                                    <InputNumber min={1} />
                                    <div>
                                        <Button type='primary'>Mua hàng</Button>
                                    </div>
                                </Space>
                            </Space>
                        </div>
                        <div>
                            <div className='text-[#fff] bg-[#2865c2] px-[30px] py-[5px] text-[14px] font-semibold w-[fit-content]'>Mô tả</div>
                            <div className='border-[1px] border-[#dcdcdc] pt-[24px] pb-[16px] '>
                                <img
                                    src="https://hoaphatthietbi.com/wp-content/uploads/2023/01/image21.jpg"
                                    alt="Description"
                                />
                            </div>
                        </div>
                        <div className='mt-[24px]'>
                            <div className='text-[24px] font-semibold uppercase border-b-[1px] border-[ #c2c6c6] pb-[16px]'>
                                Sản phẩm tương tự
                            </div>
                            <div>

                                <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-[16px] mt-[32px]">
                                    {productList.map((el) => {
                                        return <CardProduct key={el.id} />;
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div >
    )
}

export default ProductDetailContainer