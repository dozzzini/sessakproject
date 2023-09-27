import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SettingBtn =styled.div`
    /* cursor: pointer; */
    width: 30px;
    height: 30px;
    border: none;
    /* padding-bottom:5px;
    border-radius: 5px; */
    background-color:wheat;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center;  */
   
`;
const Nav = styled.div`
    height: 90vh;
`

// const PageNation = styled.div`
//     margin-top: 50px;
// `;
const NewCategoryItem = styled.input`
    width: 150px;
    height: 30px;
    padding: 5px;
    text-align: center;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
`
const AddCategoryBtn = styled.button`
    cursor: pointer;
    width: 50px;
    height: 40px;
    border: none;
    border-radius: 15px;
    &:hover{
        background-color: #ff5f2e;
    }
`
const Sidebar = styled.div`
    margin-top: -10px;
    margin-left: -250px;
    display: flex;
    height: 95vh;
    width: 360px;
    /* border: 12px solid purple; */
    /* background-color: #004e66; */
    /* border: 2px solid red; */
    /* cursor: pointer; */
    
    .title{
        font-weight: 100;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        background-color: #fcbe32;
        width: 100%;
        /* border: 2px solid violet; */
        
    }
  
    .categoryBox{
        height: 90vh;
        display: flex;
        justify-content: start;
        align-items: start;
        border-radius: 0%;

    }
    @media screen and (min-width: 414px) and (max-width: 700px){

        margin-top: -10px;
        margin-left: -250px;
        display: flex;
        height: 910px;
        width: 310px;
        background-color: #004e66;
        border-radius: 5px;
    }
    div{      
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        background-color: #fcbe32;
        width: 310px;
    }
    .title{
        display: flex;
        flex-direction: row;
        /* justify-content: start; */
        background-color: #004e66;
        /* border: 2px solid red; */
        color: white;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        span{
            margin:0 auto;
            font-size: 40px;
        }
    }
    .categoryBox{
        /* border: 2px solid darkblue; */
        /* height: 800px; */
        /* display: flex; */
        align-items: start;
        border-radius: 0%;
    }
     .categoryItem{
        /* text-decoration: none; */
        padding: 8px;
        font-size: 15px;
        cursor: pointer;
        &:hover{
            background-color: whitesmoke;
            opacity: 0.73;
            color: black;
        }
    }
    .categoryAdd{
        /* margin-left: 7px; */
        margin: 10px auto;
        text-align: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
    }
    .categoryAdd:hover{
        background-color:  #ff5f2e ;
    }
`

const Category = () => {
    const [open, setOpen] = useState(true);
    const [newCategory, setNewCategory] = useState(""); // 새 카테고리를 저장할 state 추가
    const [isInputVisible, setInputVisible] = useState(false); // 입력 창의 가시성을 관리하는 state
    const [categories, setCategories] = useState(["인기글", "왁자지껄"]); // 기존 카테고리 목록을 저장할 state 추가
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // 입력 폼이 열렸을 때 외부 클릭을 감지하여 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
            setOpen(false);
            setInputVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        }, []);

    const handleCategoryItemPopulur = (e) => {
        // 클릭 이벤트 버블링을 막음
        e.stopPropagation();
    
        // 페이지 이동 로직 추가
        // 예를 들어, 인기글을 클릭하면 /popular 로 이동하도록 설정
        navigate("/popular");
    };
    const handleCategoryItemSooda = (e) => {
        // 클릭 이벤트 버블링을 막음
        e.stopPropagation();
    
        // 페이지 이동 로직 추가
        // 예를 들어, 인기글을 클릭하면 /popular 로 이동하도록 설정
        navigate("/sooda");
    };
    
    
    const handleCategoryItemClick = (category) => {
        // 카테고리 항목을 클릭했을 때의 로직 추가
        // 예를 들어, 해당 카테고리 페이지로 이동하도록 설정
        navigate(`/${category}`);
    };

    const addCategory = () => {
        // 새 카테고리를 목록에 추가하는 함수
        if (newCategory.trim() !== "") {
            setCategories([...categories, newCategory]);
            setNewCategory(""); // 입력 창 초기화
            setInputVisible(false); // 입력이 완료되면 입력 창을 숨김
        
            axios.post("/api/categories", { newCategory: newCategory },
                {headers: 
                    {
                        'Content-Type': 'application/json',
                    },
                    'withCredentials': true,

                },
            )
            .then((response) => {
                console.log("카테고리 추가 성공:", response.data);
            })
            .catch((error) => {
                console.error("카테고리 추가 오류:", error);
            });
        }
    };

    return( 
        
        <SettingBtn onClick={() => {
            setOpen(!open)
        }}>
        {open ?
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" height={'28px'} aria-hidden="true" style={{cursor:'pointer'}}>
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" />
            </svg>
            : 
            <Sidebar>
                <Nav className={open ? 'active' : ''}> 
                    <div className='title'>
                        <FontAwesomeIcon 
                        style={{cursor:'pointer'}}
                        icon= {faCircleXmark} 
                        onClick={ () => {
                            setOpen(true); // "X" 버튼을 누르면 사이드바를 열고
                            setInputVisible(false); // 입력 창을 숨김
                        }}
                        />
                        <span style={{fontSize: '30px'}}>카테고리</span>
                    </div>
                    <div className='categoryBox'>
                    {categories.map((category, index) => (
                <div
                key={index}
                className="categoryItem"
                onClick={() => {
                    handleCategoryItemClick(category);
                }}
                >
                {category}
                </div>
            ))}
            <div>
            {!isInputVisible ? (
                <button
                    onClick={(e) =>
                       { e.stopPropagation(); // 이벤트 버블링 막음

                        setInputVisible(true)}}
                    className="categoryAdd"
                >
                +
                </button>
                ) : (
                <div ref={inputRef}>
                    <NewCategoryItem
                    type="text"
                    placeholder="새 카테고리"
                    value={newCategory}
                    onChange={(e) =>{
                        setNewCategory(e.target.value)}}
                        onClick={(e) => 
                            e.stopPropagation()}
                    />
                    <AddCategoryBtn onClick={(e) => {
                        e.stopPropagation();
                        addCategory()}}>추가
                    </AddCategoryBtn>
                </div>
                )}
                        </div>
                    </div>
                </Nav>
            </Sidebar>
        }
        </SettingBtn> 
    );
};

export default Category;