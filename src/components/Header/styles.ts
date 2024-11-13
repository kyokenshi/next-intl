'use client';

import styled from 'styled-components';

export const StyledMenu = styled.div`
  color: white;
  .ant-menu-root {
    width: 100%;
  }
  .ant-menu {
    background: #2865c2 !important;
  }
  .menu-header {
    .ant-menu-item {
      background: #2865c2;
    }
    .ant-menu-item::after {
      border-bottom: none !important;
    }
    .ant-menu-item:hover {
      background: #00a0e9 !important;
    }
    .ant-menu-submenu:hover {
      background: #00a0e9 !important;
      border-bottom: none !important;
    }
    .ant-menu-submenu-active {
      &::after {
        border-bottom: none !important;
      }
    }
    .ant-menu-title-content {
      color: #fff;
      font-weight: 700;
    }
  }
`;
