"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
   /* background-color: #f5f5f5; */
    font-family: "Roboto", sans-serif;
    color: #333;
    overflow-x: hidden;
  }

  /* .menu-home-custom {
    .ant-menu-item-selected {
      .ant-menu-title-content {
        color: #333333 !important; 
      }
    } 
  } */
    .menu-header {
     
      .ant-menu-submenu-selected {
        background: #00a0e9 !important;
          .ant-menu-submenu-title {
              color: #333333 !important; 
          }
      
      }  
    }

  a {
    font-size: unset !important;
    color: unset !important;
    &:hover{
      color: unset !important;
    
    }
  }
  

  .slick-slider {
    overflow-x: hidden;
  }

  .input-register {
    padding: 0 !important;
    .ant-input-suffix {
      margin: -1px;
      border-left:  1px solid #e5e7eb;
      padding-left: 6px;
      padding: 0 10px;
      background: #2865C2;
      border-radius: 0 6px 6px 0;
      color: white;
    }
    .ant-input-lg {
      height: 40px;
    }
  }

  #email_form {
    width: 100%;
  }
  @media (min-width: 576px) and (max-width:1024px){
      #email_form {
      width: 320px;
    }
    }
  @media (min-width: 1025px)  {
      #email_form {
      width: 450px;
    }
    }


    .select-transaction {
      width: 180px !important;
      .ant-select-item-option-content{
        display: flex;
        align-items: center;
      }
      .ant-space {
        width: 100%;
        display: flex;
        align-items: center;
        strong{
          display: flex;
          align-items: center;
          gap: 4px;
        }
     
      }
      svg {
        width: 16px;
        height: 16px;
      }
    }
`;
