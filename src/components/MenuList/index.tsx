import React from 'react'


interface MenuListProps {
    title: string;
    children: React.ReactNode;

}

const MenuList = (props: MenuListProps) => {
    const { title, children } = props
    return (
        <div>
            <div className="text-center border-b text-ellipsis text-[16px] font-bold bg-blue-1000 text-white px-[14px] py-[10px]">
                {title}
            </div>
            <div className="px-[12px] py-[16px] border border-t-0 shadow-custom mt-[-1px]">
                {children}
            </div>
        </div>
    )
}

export default MenuList