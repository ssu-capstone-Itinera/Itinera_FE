import styled from "styled-components";
import { useState, useEffect } from 'react';
import { fetchSearchPlaces } from "../../../api/searchPlace";

import SearchIc from "../../../assets/icons/SearchIc";

const spKeywordPlaces = [
    {
        "placeId": null,
        "category": null,
        "lat": 37.4710418,
        "lng": 126.6249717,
        "placeGoogleId": "ChIJMaYFsLh5ezURJhkSWVqHfjI",
        "name": "써브웨이 인천신포점",
        "rating": null,
    },
    {
        "placeId": null,
        "category": null,
        "lat": 37.5134514,
        "lng": 126.9428577,
        "placeGoogleId": "ChIJCxbquC-ffDURGCF_PIl9Tuk",
        "name": "써브웨이 노량진역점",
        "address": null,
    },
    {
        "placeId": null,
        "category": null,
        "lat": 37.509564,
        "lng": 127.0215808,
        "placeGoogleId": "ChIJU3nesUmhfDURZkHdVbVYwj0",
        "name": "써브웨이 논현역점",
        "address": null,
        "rating": null,
    },
];

const spAddresslaces = [
    {
        "placeId": null,
        "placeGoogleId": "ChIJR0xyt1ehfDUR61CHldf58nU",
        "name": "대한민국 서울특별시 강남구 테헤란로 123",
        "address": null,
        "rating": null,
        "category": null,
        "lat": 37.499564,
        "lng": 127.0315094,
    },
];

const SearchView = ({ checkedMap, toggleCheckbox, selectedPlace, setSelectedPlace, setIsSidebarOpen, handleAddCustomPlace, handleRemoveCustomPlace }) => {
    const [searchType, setSearchType] = useState("myPlace_keyword");
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [cursor, setCursor] = useState(null); // 다음 요청의 시작 지점
    const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지
    const [isLoading, setIsLoading] = useState(false); // 중복 요청 방지


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = async (cursorParam = null) => {
        if (!query) return;

        const requestBody = {
            searchType: searchType,
            addressText: searchType === "myPlace_address" ? query.trim() : "",
            keywordText: searchType === "myPlace_keyword" ? query.trim() : ""
        };
        const requestPayload = {
            ...requestBody,
            cursor: cursorParam  // cursor 필드를 추가
        };

        console.log(requestPayload)


        if (searchType === 'myPlace_keyword') {
            console.log('📍 장소 검색:', query);
            setSearchResults(spKeywordPlaces);
        } else {
            console.log('🏠 주소 검색:', query);
            setSearchResults(spAddresslaces);
        }

        // try {
        //     const res = await fetchSearchPlaces({ requestBody });

        //     // 결과 배열 형태 확인
        //     if (Array.isArray(res)) {
        //         setSearchResults(res);
        //     } else {
        //         console.warn('예상치 못한 응답 구조:', res);
        //         setSearchResults([]);
        //     }

        // } catch (err) {
        //     console.error('검색 실패:', err);
        //     setSearchResults([]);
        // }
        try {
            const res = await fetchSearchPlaces(requestBody);
            
            if (Array.isArray(res)) {
                console.log('API 응답 도착:', res);
            } else {
                console.warn('예상치 못한 응답 구조:', res);
            }

            const {
                myPlaceSuggest = [],
                nextCursor,
            } = res;

            setSearchResults((prev) => [...prev, ...myPlaceSuggest]);
            setCursor(nextCursor);
            setHasMore(!!nextCursor);
        } catch (e) {
            console.error('검색 실패:', err);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollContainer = document.documentElement;
            const nearBottom = scrollContainer.scrollTop + window.innerHeight >= scrollContainer.scrollHeight - 300;

            if (nearBottom && hasMore && !isLoading) {
                loadPlaces(cursor);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [cursor, hasMore, isLoading]);

    const handleClick = (item) => {
        if (selectedPlace?.placeGoogleId === item.placeGoogleId) {
            // 이미 선택된 장소를 다시 누르면 닫기
            setSelectedPlace(null);
            setIsSidebarOpen(false);
        } else {
            // 새 장소를 선택하면 열기
            if (searchType === 'myPlace_address') {
                setSelectedPlace(item);        // 지도만 표시
                setIsSidebarOpen(false);        // 디테일 패널 열지 않음
            } else {
                setSelectedPlace(item);        // 기본 장소
                setIsSidebarOpen(true);         // 디테일 패널 열기
            }
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

        if(!isChecked){
             const updatePlace = {
                ...place,
                category: "MYPLACE",
             }
             handleAddCustomPlace?.(updatePlace);
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
            {searchResults.length > 0 && (
                <ResultList>
                    {searchResults.map((place) => (
                        <PlaceCard key={place.placeGoogleId} onClick={() => handleClick(place)}>
                            <TopRow>
                                {/* 체크박스: 부모의 checkedMap 사용 */}
                                <input
                                    type="checkbox"
                                    checked={checkedMap[place.placeGoogleId] || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={() => handleCustomSelect(place)}
                                />
                                <PlaceName>{place.name}</PlaceName>
                            </TopRow>
                        </PlaceCard>

                    ))}
                </ResultList>
            )}
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
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const PlaceCard = styled.div`
  padding: 12px;
  border-radius: 12px;
  background: #f5f5f5;
  box-shadow: 0 0 6px rgba(0,0,0,0.1);
  font-size: 16px;
`;

const TopRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const PlaceName = styled.div`
    font-weight: bold;
`;
