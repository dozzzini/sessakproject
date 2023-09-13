 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import {faLeftLong} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


const Button = styled.button`
    width: 50px;
    height: 50px;
    position: absolute;
    /* top: calc(50% -5px); */
    left: 20px;
    background-color: #e1eef6;
    border: none;
    font-size: 30px;
    font-weight: 600;
    color: #004e66;

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
