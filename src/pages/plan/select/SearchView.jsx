import styled from "styled-components";

import React from 'react';

import SearchIc from "../../../assets/icons/SearchIc";

const SearchView = () => {
    return (
        <SearchWrapper>
            <SearchOpt>검색 옵션 </SearchOpt>
            <SearchMain>
                <SearchIc />
                <InputBox type="text" placeholder="장소 검색" />
            </SearchMain>
        </SearchWrapper>
    );
}

export default SearchView

const SearchWrapper = styled.div`
    display: flex;
    padding: 8px 32px;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    
`
const SearchOpt = styled.div`
    display: flex;
    padding: 0px 8px;
    align-items: center;
    gap: 16px;
    align-self: stretch;
`
const SearchMain = styled.div`
    display: flex;
    width: 446px;
    height: 64px;
    padding: 16px;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;

    border-radius: 16px;
    background: #FFF;
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.20);

    &:focus-within{
        outline: 3px solid #12464C;

    }
`
const InputBox = styled.input`
    display: flex;
    flex: 1 0 0;

	width: 100%;
	height: 25px;
	border: none;

    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    outline: none;
	color: #12464C;

	&::placeholder{
		color: #9E9E9E;
	}

    &::focus{
		color: #12464C;
	}
`;
