import React from "react";
import styled from "styled-components";

export default function({type,placeholder}){


    return (
        <StyledInput type={type} placeholder={placeholder}></StyledInput>
    );
}
const StyledInput=styled.input`

    background:rgba(255,255,255,0.15);
    box-shadow:0 8px 32px 0 rgba(31,38,135,0.37);
    border-radius:2rem;
    height:3rem;
    width:80%;
    padding:1rem;
    border:none;
    outline:none;
    color:black;
    font-size:1rem;
    font-weight:bold;
    &:focus{
        display:inline-block;
        box-shadow:0 0 0 0.2rem #b9abe0;
        background-filter:blur(12rem);
        border-radius:2rem;
    }
    &::placeholder{
        color:#b9abe099;
        font-weight:100;
        font-size:1rem;
    }  

`;