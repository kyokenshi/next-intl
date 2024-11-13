import CardNewHorizontal from '@/components/CardNewHorizontal'
import { HomeOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import React from 'react'
import MenuList from '@/components/MenuList'
import CardNew from '@/components/CardNew'
import SectionTitle from '@/components/SectionTitle'
type Props = {}

const NewsContainer = (props: Props) => {

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
    return (
        <div className='mb-[40px]'>
            <SectionTitle title='Tin tức' description='Tin tức' />
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-[300px_1fr] gap-[24px] mt-[40px]">
                    <div>
                        <MenuList title='Mới nhất'>
                            <Space direction='vertical' size={12}>
                                {listMenuProduct.map((el) => {
                                    return <CardNewHorizontal key={el.id} />;
                                })}
                            </Space>
                        </MenuList>
                    </div>
                    <div className='grid grid-cols-[1fr_1fr_1fr] gap-[16px]'>
                        <div><CardNew /></div>
                        <div><CardNew /></div>
                        <div><CardNew /></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NewsContainer