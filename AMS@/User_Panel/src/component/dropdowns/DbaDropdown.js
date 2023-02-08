import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom'
// import { menuData } from '../data/MenuData';
// import { Button } from '../components/Button';
import { FaTimes } from 'react-icons/fa';

const DropdownContainer = styled.div`
    position: fixed;
    z-index:999;
    width:100%;
    height:100%;
    background:#CD853F;
    display:grid;
    align-items:center;
    top:0;
    left:0;
    transition:0.3s ease-in-out;
    opacity:${({ isOpen }) => (isOpen ? '1' : '0')};
    top:${({ isOpen }) => (isOpen ? '0' : '-100%')};
`;

const Icon = styled.div`
    position:absolute;
    top:1.2rem;
    right:1.5rem;
    background:transparent;
    font-size:2rem;
    cursor:pointer;
    outline:none;
`;

const CloseIcon = styled(FaTimes)`
    color:#000d1a;
`;

const DropdownWrapper = styled.div``;

const DropdownMenu = styled.div`
    display:grid;
    grid-template-columns:1fr;
    grid-template-rows:repeat(4,80px);
    text-align:center;
    margin-bottom:4rem;
        @media screen and (max-width:480px) {
            grid-template-rows:repeat(4,60px);
        }
`;

const DropdownLink = styled(Link)`
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    font-size:1.5rem;
    text-decoration:none;
    list-style:none;
    color:#fff;
    cursor:pointer;
    transition:0.2s ease-in-out;

        &:hover{
            color:#000d1a;
        }
`;
const BtnWrap = styled.div`
    display:flex;
    justify-content:center;
`;

const DbaDropdown = ({ isOpen, toggle }) => {
    return <>
        <DropdownContainer isOpen={isOpen} onclick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <DropdownWrapper>
                <DropdownMenu>
                    <DropdownLink to='/Dba' onClick={toggle}>
                        Dashboard
                    </DropdownLink>
                    <DropdownLink to='/Dba/Add_Student' onClick={toggle}>
                        Add Student
                    </DropdownLink>
                    <DropdownLink to='/Dba/Add_Teacher' onClick={toggle}>
                        Add Teacher
                    </DropdownLink>
                    <DropdownLink to='/Dba/All_Students' onClick={toggle} >
                        All Student
                    </DropdownLink>
                    <DropdownLink to='/Dba/All_Teachers' onClick={toggle} >
                        All Teacher
                    </DropdownLink>
                    <DropdownLink to='/Dba/All_Fees_Details' onClick={toggle} >
                        Fees Details
                    </DropdownLink>
                </DropdownMenu>
            </DropdownWrapper>
        </DropdownContainer>
    </>
}


export default DbaDropdown
