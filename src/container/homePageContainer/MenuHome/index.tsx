'use client'
import { Menu, MenuProps } from 'antd'
import React from 'react'

type Props = {}
type MenuItem = Required<MenuProps>['items'][number];

const MenuHome = (props: Props) => {

    const items: MenuItem[] = [
        {
            label: 'Navigation One',
            key: 'mail',
        },
        {
            key: 'sub1',
            label: 'Navigation One',
            children: [
                {
                    key: '1-1',
                    label: 'Item 1',
                    type: 'group',
                    children: [
                        { key: '1', label: 'Option 1' },
                        { key: '2', label: 'Option 2' },
                    ],
                },
                {
                    key: '1-2',
                    label: 'Item 2',
                    type: 'group',
                    children: [
                        { key: '3', label: 'Option 3' },
                        { key: '4', label: 'Option 4' },
                    ],
                },
            ],
        },
        {
            key: 'sub2',
            label: 'Navigation Two',
            children: [
                { key: '5', label: 'Option 5' },
                { key: '6', label: 'Option 6' },
                {
                    key: 'sub3',
                    label: 'Submenu',
                    children: [
                        { key: '7', label: 'Option 7' },
                        { key: '8', label: 'Option 8' },
                    ],
                },
            ],
        },
        {
            key: 'sub4',
            label: 'Navigation Three',
            children: [
                { key: '9', label: 'Option 9' },
                { key: '10', label: 'Option 10' },
                { key: '11', label: 'Option 11' },
                { key: '12', label: 'Option 12' },
            ],
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };

    return (
        <div className='grid grid-cols-[300px_minmax(900px,_1fr)] gap-[6px]' >
            <div>
                <div>Danh mục sản phẩm</div>
                <Menu onClick={onClick} mode="vertical" items={items} />
            </div>
        </div>


    )
}

export default MenuHome