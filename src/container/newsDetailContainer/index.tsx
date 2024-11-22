import CardNewHorizontal from '@/components/CardNewHorizontal'
import { HomeOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import React from 'react'
import MenuList from '@/components/MenuList'
import CardNew from '@/components/CardNew'
import SectionTitle from '@/components/SectionTitle'
import { onFormatDate } from '@/utils/commom'
type Props = {
    params: { id: string };
    dataDetail: any
}

const NewsDetailContainer = (props: Props) => {

    const { dataDetail } = props;

    const elment = dataDetail[0]

    const { id } = props.params;

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
            <SectionTitle title='Máy nghiền cát và nhu cầu cát nhân tạo tại tỉnh Bình Thuận' description='Máy nghiền cát và nhu cầu cát nhân tạo tại tỉnh Bình Thuận' />
            <div className="max-w-[1200px] px-[0px] mx-auto">
                <div className="grid grid-cols-[1fr] sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-[24px] mt-[40px] mb-[40px]">
                    <div className='hidden sm:block'>
                        <MenuList title='Mới nhất'>
                            <Space direction='vertical' size={12}>
                                {listMenuProduct.map((el) => {
                                    return <CardNewHorizontal key={el.id} />;
                                })}
                            </Space>
                        </MenuList>
                    </div>
                    <div className='w-full'>
                        <div className='text-[32px] mb-[16px]'>{elment.title}</div>
                        <div className='mb-[16px]'>{onFormatDate(elment.createdAt)}</div>
                        <div
                            dangerouslySetInnerHTML={{ __html: elment.content }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NewsDetailContainer