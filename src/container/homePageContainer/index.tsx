
import MenuHeader from '@/components/Header/MenuHeader';
import { Menu, MenuProps } from 'antd'
import React from 'react'
import MenuHome from './MenuHome';
import CarouselMenu from './CarouselMenu';
import HotDeal from './HotDeal';

type Props = {}

type MenuItem = Required<MenuProps>['items'][number];


const HomePageContainer = (props: Props) => {



    return (
        <div>
            <div>
                <MenuHome />
                <CarouselMenu />
            </div>
            <HotDeal />
        </div>
    )
}

export default HomePageContainer