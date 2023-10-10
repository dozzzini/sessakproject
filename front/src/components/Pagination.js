import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: 20px;
  /* margin: 0px 0px 10px 0px; */
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: white;
  color: black;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    color: white;
    font-weight: 500;
    background-color: #337ab7;
  }

  &[disabled] {
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    font-weight: bold;
    cursor: revert;
    transform: revert;
    background-color: #337ab7;

  }
`;

function Pagination({   totalPage,pageList,currentPage }) {
	const [ searchParams,setSearchParams] = useSearchParams()

  const numPages = totalPage;
  console.log('totalPage',totalPage)
  console.log('currentPage',typeof(+currentPage))
  
  const setPage = (newPage) => {
	setSearchParams({ total_page: newPage }); // setSearchParams를 사용하여 쿼리 값을 변경합니다.
  };

  if (numPages === 0) {
    return null; // 페이지 네이션을 보여주지 않음
  }

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(+currentPage - 1)} disabled={+currentPage === 1}>
          &lt;
        </Button>
        {pageList
          .map((page, i) => (
            <Button
              key={page}
              onClick={() => setPage(page)}
              aria-current={+currentPage === page ? 'page' : null}
            >
             <p>{page}</p> 
            </Button>
          ))}
        <Button onClick={() => setPage(+currentPage + 1)} disabled={+currentPage === pageList[totalPage-1]}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

export default Pagination;
