"use client"
import styled, { keyframes } from 'styled-components';

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledCardProduct = styled.div`
  cursor: pointer;
  /* .mark {
    position: absolute;
    top: 1px;
    left: 1px;
    z-index: 1;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
    background: rgba(34, 34, 34, 0.6);
    display: none;
    opacity: 0;
  } */

  /* .cart-wrapper {
    position: absolute;
    top: 15%;
    right: 15%;
    z-index: 2;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    opacity: 0;

    .cart {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: #fff;
    }
  } */

  /* &:hover {
    .mark {
      display: block;
      animation: ${fadeIn} 0.2s ease-in-out forwards;
    }

    .cart-wrapper {
      display: block;
      animation: ${slideInFromLeft} 0.3s ease-in-out forwards;

      .cart {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  } */


    transition: .3s all;
    -webkit-transition: .3s all;
    position: relative;
    &:hover {
      transform: scale(1.05, 1.05);
        -webkit-transform: scale(1.05, 1.05);
        z-index: 5;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        .wrapper-text {
          background: #232323 !important;
          color: white;
          .text-price {
              color: #00f300 !important;
          }
        }
    }

`;
