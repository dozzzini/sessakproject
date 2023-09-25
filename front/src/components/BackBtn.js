 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import {faLeftLong} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


const Button = styled.button`
    width: 50px;
    height: 40px;
    position: absolute;
    top: 50px;
    left:60px;
    background-color: #e1eef6;
    border: none;
    font-size: 30px;
    font-weight: 600;
    color: #004e66;
    &:hover{
        background-color: #fcbe32;
        border-radius: 5px;
        color: #ff5f2e;
    }
    @media screen and (min-width: 414px)and (max-width: 700px){
        left: 20px;
    }

`;



 const BackBtn = () => {
    const navigate = useNavigate();

    return (
        <>
             <Button onClick={()=> {navigate(-1)}}>
                <FontAwesomeIcon icon={faLeftLong} />
            </Button>
        </>
    )
};

export default BackBtn;
