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
  
`;
