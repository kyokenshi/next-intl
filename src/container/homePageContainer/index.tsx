
import MenuHeader from '@/components/Header/MenuHeader';
import { GetProps, Input, Menu, MenuProps } from 'antd'
import React from 'react'
import MenuHome from './MenuHome';
import CarouselMenu from '../components/CarouselMenu';
import HotDeal from './HotDeal';
import News from './News';
import SupportInformation from './SupportInformation';
import RegisterInfomation from './RegisterInfomation';

type Props = {}




const HomePageContainer = (props: Props) => {

    const data = [{
        id: 2,
        name: 'Hot Deal',
        image: 'https://hoaphatthietbi.com/wp-content/uploads/2023/01/slideshow_2.jpg',
    }, {
        id: 3,
        name: 'Hot Deal',
        image: 'https://hoaphatthietbi.com/wp-content/uploads/2023/01/slideshow_3.jpg',
    }]



    return (
        <div>
            <div className='grid grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] gap-[16px] h-[250px] md:h-[350px] lg:h-[500px] mt-[20px] mb-[32px]'>
                <MenuHome />
                <div className="relative w-full h-full overflow-hidden">
                    <CarouselMenu>
                        {data.map((el) => (
                            <div key={el.id} className="relative h-[250px] md:h-[350px] lg:h-[500px]">
                                <img
                                    src={el.image}
                                    alt={el.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </CarouselMenu>
                </div>
            </div>
            <HotDeal />
            <HotDeal />
            <HotDeal />
            <News />
            <SupportInformation />
            <RegisterInfomation />
        </div>
    )
}

export default HomePageContainer