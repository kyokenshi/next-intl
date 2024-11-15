'use client'
import { HomeOutlined } from '@ant-design/icons'
import React from 'react'
import { useRouter } from 'next/navigation';
type SectionTitleProps = {
    title: string;
    description: string;
}

const SectionTitle = (props: SectionTitleProps) => {
    const { title, description } = props;
    const router = useRouter();
    return (
        <div className='relative bg-[#CCCCCC] h-[200px] flex-col  flex justify-center items-center w-[100vw] left-1/2 -translate-x-1/2 gap-[4px]'>
            <div className='text-[24px] font-semibold uppercase text-white '>{title}</div>
            <div className='text-[16px] text-white'><HomeOutlined onClick={() => router.push('/')} /> - {description}</div>
        </div>
    )
}

export default SectionTitle