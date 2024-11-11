
import MenuHeader from '@/components/Header/MenuHeader';
import { Menu, MenuProps } from 'antd'
import React from 'react'
import MenuHome from './MenuHome';
import CarouselMenu from './CarouselMenu';
import HotDeal from './HotDeal';

type Props = {}

type MenuItem = Required<MenuProps>['items'][number];


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
            <div className='grid grid-cols-[300px_minmax(900px,_1fr)] gap-[6px]'>
                <MenuHome />
                <CarouselMenu>
                    {data.map((el) => <div style={{ height: 500 }}><img src={el.image} alt={el.name} /></div>)}
                </CarouselMenu>
            </div>
            <HotDeal />
        </div>
    )
}

export default HomePageContainer