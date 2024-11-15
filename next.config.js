// @ts-check

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const config = {
  images: {
    // domains: ['seidai88.com'], // Thêm domain cho hình ảnh từ bên ngoài
    unoptimized: true // Tắt tối ưu hóa nếu bạn chỉ muốn dùng hình ảnh như mặc định
  },
  compiler: {
    styledComponents: true
  }
};

module.exports = withNextIntl(config);
