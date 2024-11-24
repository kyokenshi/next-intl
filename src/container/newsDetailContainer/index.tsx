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
    dataConfig: any
    dataListSSR: any
}

const NewsDetailContainer = (props: Props) => {

    const { dataDetail, dataConfig, dataListSSR } = props;
    const elment = dataDetail[0]
    const { id } = props.params;

    return (
        <div className='mb-[40px]'>
            <SectionTitle title={dataDetail.title} description={dataDetail.title} />
            <div className="max-w-[1200px] px-[0px] mx-auto">
                <div className="grid grid-cols-[1fr] sm:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] gap-[24px] mt-[40px] mb-[40px]">
                    <div className='hidden sm:block'>
                        <MenuList title={dataConfig?.name_product_new}>
                            <Space direction='vertical' size={12}>
                                {dataListSSR.map((el: any) => {
                                    return <CardNewHorizontal key={el.id} {...el} />;
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