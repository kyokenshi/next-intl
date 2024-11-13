import { Button, Space } from 'antd'
import React from 'react'

type Props = {}

const CardNew = (props: Props) => {
    return (
        <div className='shadow-custom2'>
            <img src='https://hoaphatthietbi.com/wp-content/uploads/2023/01/tt3.jpg' alt='new' />
            <div className='p-[12px]'>
                <Space size={6} direction='vertical'>
                    <div className='text-[18px] text-[#333333] hover:text-[#2865c2] cursor-pointer font-semibold line-clamp-2'>
                        Máy nghiền cát nhân tạo tại tỉnh Quảng Ninh
                    </div>
                    <div className='text-[12px] line-clamp-3'>
                        Tỉnh Quảng Ninh có nền kinh tế phát triển bậc nhất cả nước ngoài nguồn khoáng sản chủ yếu là than, Quảng Ninh còn có điểm mạnh là một địa điểm giàu tiềm năng du lịch những danh lam thắng cảnh nổi tiếng thế giới, Tuy có nhiều núi đá vôi có chất lượng nhưng…
                    </div>
                </Space>
                <div className='w-full flex justify-end '>
                    <Button type='primary' className='mt-[12px]'>Xem thêm</Button>
                </div>
            </div>
        </div>
    )
}

export default CardNew
