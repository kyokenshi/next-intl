
import MenuHeader from '@/components/Header/MenuHeader';
import { Menu, MenuProps } from 'antd'
import React from 'react'
import MenuHome from './MenuHome';

type Props = {}

type MenuItem = Required<MenuProps>['items'][number];


const HomePageContainer = (props: Props) => {



    return (
        <div>
            <MenuHome />
        </div>
    )
}

export default HomePageContainer