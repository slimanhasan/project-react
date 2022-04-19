import React from "react";
import styled from "styled-components";


export default function MyButton({content}){

    return <StyledButton>{content}</StyledButton>

}
const StyledButton = styled.button`
        background: linear-gradient(to right, #14163c 0%, #03217b 55%);
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        width: 65%;
        height: 3rem;
        border: none;
        color: white;
        border-radius: 2rem;
        cursor: pointer;
        &:hover{
            transform: scale(1.1);
          }
        
`;

