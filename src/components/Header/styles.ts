'use client';

import styled from 'styled-components';

export const StyledMenu = styled.div`
  text-transform: uppercase;

  color: white;
  .ant-menu-root {
    width: 100%;
  }
  .ant-btn-variant-outlined {
    background: #e0d9d9;
  }
  .anticon-ellipsis {
    svg {
      path {
        fill: #fff;
      }
    }
  }
  @media (max-width: 768px) {
    .ant-menu-root {
      width: 80%;
    }
  }

  .ant-menu {
    background: #2865c2 !important;
    display: flex;
    /* justify-content: space-evenly; */

  }
  .menu-header {
    .ant-menu-item {
      background: #2865c2;
      padding-inline :46px
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

  .ant-menu-item-selected {
    background: #00a0e9 !important;
  }
`;
