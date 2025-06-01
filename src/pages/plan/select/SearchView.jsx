import styled from "styled-components";
import { useState, useEffect } from 'react';

import { fetchSearchPlaces } from "../../../api/searchPlace";
import useScroll from '../../../hooks/useScroll';

import DotIcon from '../../../assets/icons/DotIcon';
import Marker from "../../../assets/icons/Marker";

import SearchIc from "../../../assets/icons/SearchIc";

const SearchView = ({ checkedMap, toggleCheckbox, selectedPlace, setSelectedPlace, setIsSidebarOpen, handleAddCustomPlace, handleRemoveCustomPlace }) => {
    const {
        scrollRef,
        handleMouseDown,
        handleMouseLeave,
        handleMouseUp,
        handleMouseMove,
    } = useScroll();

    const [searchType, setSearchType] = useState("myPlace_keyword");
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // 중복 요청 방지


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = async () => {
        if (!query) return;

        const requestBody = {
            searchType: searchType,
            myPlaceAddress: searchType === "myPlace_address" ? query.trim() : "",
            myPlaceQuery: searchType === "myPlace_keyword" ? query.trim() : ""
        };
        console.log(requestBody)

        try {
            const res = await fetchSearchPlaces(requestBody);
            console.log(res)

            setSearchResults(res.myPlaceSuggest);
        } catch (err) {
            console.error('검색 실패:', err);
            if (err.state === 500)
                alert(err.message);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = (item) => {
        if (selectedPlace?.placeGoogleId === item.placeGoogleId) {
            setSelectedPlace(null);
        } else {
            // 새 장소를 선택하면 열기
            setSelectedPlace(item);
        }
    }
    
    const handleCustomSelect = (place) => {
        if (searchType === 'myPlace_address') {
            const userName = prompt("장소 이름을 입력해 주세요", place.address);
            place.name = userName || "마이 플레이스";

            setSearchResults(prev =>
                prev.map(p => p.placeGoogleId === place.placeGoogleId ? { ...p, name: userName } : p)
            );
        }

        // 현재 체크 상태 확인
        const isChecked = checkedMap[place.placeGoogleId];

        if (!isChecked) {
            const refinedPlace = {
                address: place.address,
                category: place.category,
                lat: place.lat,
                lng: place.lng,
                name: place.name,
                placeGoogleId: place.placeGoogleId,
                placeId: place.id,
                rating: place.rating,
            };
            console.log(refinedPlace);
            handleAddCustomPlace?.(refinedPlace);
        }
        else {
            handleRemoveCustomPlace(place.placeGoogleId);
        }

        // 부모 상태 토글
        toggleCheckbox(place.placeGoogleId);

        // 체크 ON → 부모에게 전달
        if (!isChecked) {
            handleAddCustomPlace?.(place);
        } else {
            handleRemoveCustomPlace?.(place.placeGoogleId);
        }
    };

    return (
        <SearchWrapper>
            <SearchOpt>
                <Label>
                    <Radio
                        type="radio"
                        value="myPlace_keyword"
                        checked={searchType === "myPlace_keyword"}
                        onChange={(e) => setSearchType(e.target.value)}
                    />    키워드로 검색
                </Label>
                <Label>
                    <Radio
                        type="radio"
                        value="myPlace_address"
                        checked={searchType === "myPlace_address"}
                        onChange={(e) => setSearchType(e.target.value)}
                    />
                    주소로 검색
                </Label>
            </SearchOpt>
            <SearchMain>
                <SearchIc />
                <InputBox
                    type="text"
                    placeholder={searchType === "myPlace_keyword" ? "키워드 검색" : "주소 검색"}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown} />
            </SearchMain>
            <ListScrollWrapper
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {searchResults.length > 0 && (
                    <ResultList>
                        {searchResults.map((place) => (

                            <List key={place.placeGoogleId}>
                                <ListContent>
                                    <Location
                                        $isActiveItem={selectedPlace?.placeGoogleId === place.placeGoogleId}
                                        onClick={() => handleClick(place)}>
                                        <LocationText>
                                            {selectedPlace?.placeGoogleId === place.placeGoogleId
                                                ? <Marker />
                                                : <DotIcon />}
                                            <Name>{place.name}</Name>
                                        </LocationText>
                                        <CheckboxWrapper>
                                            <HiddenCheckbox
                                                checked={checkedMap[place.placeGoogleId] || false}
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={() => handleCustomSelect(place)}
                                            />
                                            <StyledCheckbox $checked={checkedMap[place.placeGoogleId] || false} />
                                        </CheckboxWrapper>
                                    </Location>
                                </ListContent>
                            </List>
                        ))}
                    </ResultList>
                )}
            </ListScrollWrapper>
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
const ListScrollWrapper = styled.div`
  overflow-y: scroll;

  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  -webkit-overflow-scrolling: touch;

  &.active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-thumb {
    background: #E0E0E0;
    border: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #ffffff;  /*스크롤바 뒷 배경 색상*/
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
const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #12464c;
`;

const Radio = styled.input`
  accent-color: #28a0ae;
`;
const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 504px;
  height: 415px;
`;
const List = styled.div`
  /* 리스트*/

  /* Auto layout */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 16px;

  //width: 489px;
  height: fit-content;
  
  flex: 0 0 auto;
  background-color: #ffffff;
  border-bottom: 1px solid #EEEEEE;

  overflow: hidden;
  scroll-snap-align: start;
`
const ListContent = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 8px 16px;
`
const Location = styled.div`
cursor: pointer;
  /* 선택 시 범위 */

  /* Auto layout */
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
  gap: 16px;

  width: 440px;
  height: fit-content;
  border-radius: 16px;
  
  background: ${({ $isActiveItem }) => ($isActiveItem ? '#EBFAFB' : 'transparent')};

  ${({ $isActiveItem }) => !$isActiveItem && `
    &:hover {
      background: #FEFBEA;
    }
  `}

  ${({ $isActiveItem }) => $isActiveItem && `background: #F0F8F9;`}

`
const LocationText = styled.div`
  /* 선택 시 범위 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  width: 440px;
  min-height: 48px;
  height: fit-content;
`
const Name = styled.div`
  /* 장소 이름 */

  /* Body/18px */
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;

  /* Primary/Darker */
  color: #12464C;
`

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs(() => ({
    type: 'checkbox',
}))`
  display: none;
`;

const StyledCheckbox = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid #12464C;
  border-radius: 4px;

  display: inline-block;
  background-color: ${({ $checked }) => ($checked ? '#12464C' : 'transparent')};
  
  position: relative;
  transition: all 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 5px;
    
    width: 4px;
    height: 8px;
    
    border: solid white;
    border-width: 0 2px 2px 0;
    
    transform: rotate(45deg);
    
    display: ${({ $checked }) => ($checked ? 'block' : 'none')};
  }
`;
