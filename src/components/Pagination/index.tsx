import React from 'react';
import { Pagination as PaginationAnt, PaginationProps } from 'antd';
import { PaginationContainer } from './styles';

interface IPagination extends PaginationProps {
  onPageChange?: (page: number, pageSize: number) => void;
}

const Pagination = (props: IPagination) => {
  const { onPageChange, ...pagination } = props;

  const { total = 0, pageSize = 1 } = pagination || {};

  const isShowPagination = Math.ceil(total / pageSize) > 1;

  return (
    isShowPagination && (
      <PaginationContainer>
        <PaginationAnt
          defaultCurrent={1}
          showSizeChanger={false}
          onChange={onPageChange}
          {...pagination}
        />
      </PaginationContainer>
    )
  );
};

export default Pagination;
