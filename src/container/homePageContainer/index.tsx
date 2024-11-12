
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
        <div >
            <div className='grid grid-cols-[300px_1fr] gap-[6px] h-[350px] md:h-[500px]'>
                <MenuHome />
                <div className="relative w-full h-full overflow-hidden">
                    <CarouselMenu>
                        {data.map((el) => (
                            <div key={el.id} className="relative h-[350px] md:h-[500px]">
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