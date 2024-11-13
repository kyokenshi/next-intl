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
        <div className='bg-[#CCCCCC] h-[200px] flex-col w-[100vw] flex justify-center items-center -ml-[calc(50vw-50%)] gap-[4px]'>
            <div className='text-[24px] font-semibold uppercase text-white '>{title}</div>
            <div className='text-[16px] text-white'><HomeOutlined onClick={() => router.push('/')} /> - {description}</div>
        </div>
    )
}

export default SectionTitle