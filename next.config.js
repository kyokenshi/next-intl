// @ts-check

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true
  }
};

module.exports = withNextIntl(config);
