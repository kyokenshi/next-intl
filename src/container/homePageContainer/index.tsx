
import React from 'react'
import MenuHome from './MenuHome';
import CarouselMenu from '../components/CarouselMenu';
import HotDeal from './HotDeal';
import News from './News';
import SupportInformation from './SupportInformation';
import RegisterInfomation from './RegisterInfomation';
import Image from 'next/image';
import { getApiPartner, getApiSliderbanner, getApiSliderSection } from '@/utils/axios/home';
import { getImageUrl } from '@/utils/commom';

type Props = {
    params: { locale?: any };
}

const HomePageContainer = async (props: Props) => {
    const { params } = props
    const { data } = await getApiSliderbanner()
    const { data: dataSection } = await getApiSliderSection({ locale: params.locale })

    const { data: dataPartner } = await getApiPartner()



    return (
        <div>
            <div className='mx-[-15px] sm:mx-0 grid grid-cols-[1fr] sm:grid-cols-[200px_1fr]  lg:grid-cols-[250px_1fr] gap-[16px] h-[300px] md:h-[400px] lg:h-[540px] mt-[0px] sm:mt-[20px] mb-[32px]'>
                <div className='hidden sm:block'>
                    <MenuHome />
                </div>
                <div className="relative w-full h-full overflow-hidden ">
                    <CarouselMenu>
                        {data?.map((el: any) => (
                            <div key={el.id} className="relative h-[300px] md:h-[400px] lg:h-[540px]">
                                <Image
                                    src={getImageUrl(el?.image?.formats?.large?.url)}
                                    alt={el?.name}
                                    fill
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </CarouselMenu>
                </div>
            </div>
            {dataSection[0]?.product_list?.map((el: any) => {
                return <HotDeal key={el.id} {...el} />
            })}

            <News />
            <SupportInformation dataPartner={dataPartner} />
            <RegisterInfomation />
        </div>
    )
}

export default HomePageContainer