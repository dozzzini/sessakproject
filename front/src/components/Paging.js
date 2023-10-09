import ReactPaginate from 'react-paginate';
import React, { useState } from "react";
import styles from './pagediv.module.css';

const Paging = ({totalPage, handlePageChange, currentPage}) => {
	const [page, setPage] = useState(1);

    // const handlePageChange = (selectedPage) => {
    //   setPage(selectedPage.selected +1);
    // };
	const itemsPerPage = 7; // 페이지당 아이템 수
	// const totalItems = totalPages.length; // 전체 아이템 수
	// const totalPages = Math.ceil(totalItems / itemsPerPage);
	
    return(
        <div className={styles.Paging}>
            <ReactPaginate 
				  pageCount={totalPage.length} //전체 페이지
				  pageRangeDisplayed={10}	//보여지는 페이지 번호 범위
				  marginPagesDisplayed={1}	//이전/다음 버튼의 개수
				  breakLabel={""}
				  previousLabel={"<"}
				  nextLabel={">"}
				//   onPageChange={handlePageChange} // 페이지 변경 이벤트 핸들러
				  containerClassName={styles.pagination_ul}
				  activeClassName={styles.currentPage}
				  previousClassName={styles.pageLabel_btn}
				  nextClassName={styles.pageLabel_btn}
            />
			 <div>
        {/* 페이지 번호를 렌더링하고 클릭 시 페이지를 변경합니다. */}
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === currentPage} // 현재 페이지는 비활성화됩니다.
          >
            {index + 1}
          </button>
        ))}
      </div>
        </div>

    )
};

export default Paging;