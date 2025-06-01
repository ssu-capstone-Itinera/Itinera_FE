import styled from "styled-components";

import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { fetchDetail } from "../../../api/getPlaceDetail";

import useScroll from '../../../hooks/useScroll';

import HeartIc from "../../../assets/icons/HeartIc";
import CafeIc from "../../../assets/icons/CafeIc";
import RestaurantIc from '../../../assets/icons/RestaurantIc';
import AttractionIc from '../../../assets/icons/AttrantionIc';
const categoryIcons = {
  TOURATTRACTION: <AttractionIc />,
  RESTAURANT: <RestaurantIc />,
  CAFE: <CafeIc />,
};

import DragIc from "../../../assets/icons/DragIc";

import PlaceDetail from "../PlaceDetail";

import GoogleMap from "../GoogleMap";

const spSelected = [
  {
    "id": 0,
    "category": "TOURATTRACTION",
    "placeGoogleId": "ChIJN2x0fu2ifDUR51BupseGYmE",
    "name": "국립중앙박물관",
    "address": "대한민국 서울특별시 용산구 서빙고로 137",
    "lat": 37.523,
    "lng": 126.980,
    "location": "string",
    "rating": 4.7,
    "phoneNumber": "02-2077-9000",
    "webSite": "https://www.museum.go.kr/",
    "openingHours": [
      "월요일: 오전 10:00 ~ 오후 6:00",
      "화요일: 오전 10:00 ~ 오후 6:00",
      "수요일: 오전 10:00 ~ 오후 9:00",
      "목요일: 오전 10:00 ~ 오후 6:00",
      "금요일: 오전 10:00 ~ 오후 6:00",
      "토요일: 오전 10:00 ~ 오후 9:00",
      "일요일: 오전 10:00 ~ 오후 6:00"
    ],
    "priceLevel": "가격정보 없음",
    "description": null,
    "reviews": [
      "string"
    ],
    "cafeTags": [
      "ALLOWS_DOGS"
    ],
    "restaurantType": "NONE",
    "tourattractionTags": [
      "자연"
    ],
    "subjectiveTags": [
      "한적한"
    ]
  }

];

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentDay, tagData, } = location.state;

  const mainTourPlaces = JSON.parse(localStorage.getItem('mainTourPlace') || '[]');
  const mainTourPlace = mainTourPlaces[currentDay - 1] || '서울';

  const getInitialPlaces = () => {
    const saved = localStorage.getItem('orderedPlaces');
    if (saved && !location.state?.selected) {
      return JSON.parse(saved);
    } else if (location.state?.selected) {
      return location.state.selected;
    }
    return [];
  };
  const [places, setPlaces] = useState(getInitialPlaces);

  useEffect(() => {
    localStorage.setItem('orderedPlaces', JSON.stringify(places));
  }, [places]);

  const handleNext = () => {
    if (places == null) return;
    navigate('/plan/3', {
      state: {
        currentDay: currentDay,
        tagData: tagData,
      }
    });
  };

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    scrollRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useScroll();

  const handleClick = (item) => {
    if (selectedPlace?.placeGoogleId === item.placeGoogleId) {
      // 이미 선택된 장소를 다시 누르면 닫기
      setSelectedPlace(null);
      setIsSidebarOpen(false);
    } else {
      // 새 장소를 선택하면 열기
      setSelectedPlace(item);
      if (item?.category != "MY_PLACE")
        setIsSidebarOpen(true);
    }
  }

  //get /api/vi/place/{googleId}
  const [placeDetail, setPlaceDetail] = useState(null); // 👈 상세 정보
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    if (!selectedPlace?.placeGoogleId || (selectedPlace?.category === "MY_PLACE")) return;
    console.log(selectedPlace?.placeGoogleId);

    const fetchDetailData = async () => {
      setIsDetailLoading(true);
      try {
        const detail = await fetchDetail(selectedPlace.placeGoogleId);
        //const parsedRes = JSON.parse(detail);
        const parts = detail.split(/(?=\{)/g); // 각 JSON 객체로 나누기
        const places = parts.map(json => JSON.parse(json));
        setPlaceDetail(places[0]);
        console.log(places[0]);
      } catch (err) {
        console.error('상세 정보 로딩 실패:', err);
      } finally {
        setIsDetailLoading(false);
      }
    };

    fetchDetailData();
  }, [selectedPlace?.placeGoogleId]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const willBeClosed = prev === true; // 지금 열려있으면 닫히는 상태로 바뀜
      if (willBeClosed) {
        setSelectedPlace(null); // 닫힐 때만 선택 상태 초기화
        return false;
      } else {
        if (!selectedPlace) return false;
        return true;
      }
    });
  };

  const dragStartFromHandle = useRef(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // 아이템 이동 핸들러
  const handleDragStart = (e, index) => {
    if (!dragStartFromHandle.current) {
      e.preventDefault(); // 아이콘이 아닌 경우 드래그 막기
      return;
    }
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    setSelectedPlace(null);
  };

  const handleDragEnter = (e, targetIndex) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const newList = [...places];
    const draggedItem = newList.splice(draggedIndex, 1)[0];
    newList.splice(targetIndex, 0, draggedItem);
    setDraggedIndex(targetIndex);
    setPlaces(newList);
  };

  const handleDragEnd = () => {
    dragStartFromHandle.current = false;
    setDraggedIndex(null);
  };


  return (
    <Container>
      <SidebarL>
        <SidebarTop>
          <Information>
            <Date>
              Day{currentDay}
            </Date>
            <Area>
              {mainTourPlace}
            </Area>
          </Information>
          <Tags>
            {tagData.map((tag, index) => (
              <TagContent key={index}>
                #{tag.label}
              </TagContent>
            ))}
          </Tags>
        </SidebarTop>

        <SidebarMain>
          <TabContainer>
            여행지 방문 순서 조정
          </TabContainer>
          <ListScrollWrapper
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {places.map((item, index) => (
              <List key={item.placeGoogleId}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}>
                <ListContent>
                  <Location
                    $isActiveItem={selectedPlace?.placeGoogleId === item.placeGoogleId}
                    onClick={() => handleClick(item)}>
                    <LocationText>
                      {categoryIcons[item.category] ?? <HeartIc />}
                      <Name>{item.name}</Name>
                    </LocationText>
                    <DragHandle
                      onMouseDown={() => {
                        dragStartFromHandle.current = true;
                      }}
                    >
                      <DragIc />
                    </DragHandle>
                  </Location>
                </ListContent>
              </List>
            ))}
          </ListScrollWrapper>
        </SidebarMain>

        <SidebarBottom>
          <BtnPrev onClick={() => navigate('/plan/1', {
            state: {
              currentDay: currentDay,
            },
          })}>
            이전
          </BtnPrev>
          <BtnNext onClick={handleNext}>
            다음
          </BtnNext>
        </SidebarBottom>
      </SidebarL>

      <MapContainer>
        <GoogleMap selectedPlace={selectedPlace} places={places} mode="order" /> api 낭비 방지용 주석
      </MapContainer>
      <SidebarR $isOpen={isSidebarOpen}>
        <ToggleButtonWrapper>
          <ToggleButton onClick={toggleSidebar}>
            {isSidebarOpen ? '▶' : '◀'}
          </ToggleButton>
        </ToggleButtonWrapper>
        <PlaceDetailWrapper>
          {isSidebarOpen && (
            <PlaceDetail
              detail={placeDetail}
              loading={isDetailLoading} />
          )}
        </PlaceDetailWrapper>
      </SidebarR>
    </Container>
  );
}

export default Order

const Container = styled.div`
    /* 화면 범위 */
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    //align-items: center;

    /* Primary/Light */
    background: #EBFAFB;
    //padding: 32px;

    min-height: 885px;
`


const SidebarL = styled.div`
  /* 좌측 사이드바 */

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 504px;
  height: 885px;

  /* Primary/Normal :active */
  background: #28A0AE;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

`


const SidebarTop = styled.div`
  /* Frame 4407 */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 32px;
  gap: 24px;

  width: 504px;
  height: 177px;
`
const Information = styled.div`
  /* Frame 4395 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 44px;

  width: 440px;
  height: 33px;
`
const Date = styled.div`
  /* Day 1 */

  width: 71px;
  height: 33px;

  /* Heading/28px */
  font-weight: 700;
  font-size: 28px;
  line-height: 33px;

  color: #FFFFFF;
`
const Area = styled.div`
  /* 서울시 용산구 */

  width: fit-content;
  height: 29px;

  font-weight: 700;
  font-size: 28px;
  line-height: 29px;

  color: #FFFFFF;
`
const Tags = styled.div`
  /* Frame 4401 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  padding: 0px 8px;
  gap: 16px;

  width: 440px;
  height: 65px;
`
const TagContent = styled.div`
  /* Frame 4403 */
  padding: 4px 8px;
  height: 29px;

  /* Primary/Light */
  background: #EBFAFB;
  border-radius: 8px;

  color: #12464C
`


const SidebarMain = styled.div`
  display: flex;
  flex-direction: column;

  gap: 16px;

  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  background: #ffffff;

  height: 628px;
`
const TabContainer = styled.div`
  display: flex;  
  justify-content: space-between;
  align-items: center;

  padding: 0 32px;
  height: 64px;

  //background: inherit;
  border-bottom: 1px solid #EEEEEE;

  color: var(--Primary-Darker, #12464C);

    /* Heading/24px */
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`
const ListScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 504px;
  max-height: 548px;

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
const DragHandle = styled.div`
  cursor: grab;
  padding-left: 8px;
  &:active {
    cursor: grabbing;
  }
`
const List = styled.div`
  /* 리스트*/

  /* Auto layout */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 16px;

  //width: 489px;
  height: 64px;
  
  flex: 0 0 auto;
  background-color: #ffffff;
  border-bottom: 1px solid #EEEEEE;

  overflow: hidden;
  scroll-snap-align: start;
`
const ListContent = styled.div`
  display: flex;
  
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
  height: 48px;
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
  height: 48px;
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


const SidebarBottom = styled.div`
  /* Frame 78 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 24px;

  width: 504px;
  height: 80px;


  background: #FFFFFF;
  /* Shadow/soft */
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.2);

`
const BtnPrev = styled.button`
  cursor: pointer;
  /* 버튼 */

  /* Auto layout */
  padding: 0px 24px;
  gap: 8px;

  width: 120px;
  height: 48px;

  background: #FFFFFF;
  border-radius: 8px;
  border: none;

  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #12464C;


`
const BtnNext = styled.button`
  /* 버튼 */

  /* Auto layout */
  padding: 0px 24px;
  gap: 8px;

  width: 120px;
  height: 48px;

  /* gray/300 */
  background: #E0E0E0;
  border-radius: 8px;
  border: none;


  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #9E9E9E;

  background: ${({ disabled }) => (disabled ? '#E0E0E0' : '#28A0AE')};
  color: ${({ disabled }) => (disabled ? '#9E9E9E' : '#ffffff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  
  &:hover {
    background: ${({ disabled }) => disabled ? '#E0E0E0' : '#1E7882'};
  }

  &:active {
    transform: ${({ disabled }) => (disabled ? 'none' : 'scale(0.97)')};
    background: ${({ disabled }) => disabled ? '#E0E0E0' : '#165A62'};
  }

`



const MapContainer = styled.div`
  position: absolute; 
  left: 504px;
  width: calc(1920px - 504px);
  height: 885px;
`



const SidebarR = styled.div`
  position: absolute; 
  top:0;
  right :0 ;

  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;

  width: ${({ $isOpen }) => ($isOpen ? '528px' : '14px')};
  height: 885px;
  z-index: 100;
  pointer-events: none;
`
const ToggleButton = styled.div`

  display: flex;
  height: 107px;
  padding: 0px 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //aspect-ratio: 24/107;
  border-radius: 8px 0px 0px 8px;
  background: #FFF;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.25);
`
const ToggleButtonWrapper = styled.div`
  z-index: 102;
  pointer-events: auto;
`
const PlaceDetailWrapper = styled.div`
  z-index: 101;
  pointer-events: auto;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.25);
`
