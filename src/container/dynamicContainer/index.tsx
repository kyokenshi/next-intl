import SectionTitle from '@/components/SectionTitle';
import React from 'react'

type Props = {
    data: any
}

const DynamicContainer = (props: Props) => {
    const { data } = props
    return (
        <div className='mb-[40px]'>
            <SectionTitle title={data?.title} description={data?.description} />
            <div className="max-w-[1200px] px-4 xl:px-[0px]  mx-auto">
                <div className='mt-[40px]'>
                    <div
                        dangerouslySetInnerHTML={{ __html: data.content }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DynamicContainer