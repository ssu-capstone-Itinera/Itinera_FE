import styled from "styled-components";

import React, { useState, useEffect } from 'react';
import useScroll from '../../../hooks/useScroll';


import AddLocaIc from '../../../assets/icons/AddLocaIc';
import CafeIc from "../../../assets/icons/CafeIc";
import RestaurantIc from '../../../assets/icons/RestaurantIc';
import AttractionIc from '../../../assets/icons/AttrantionIc';
import SelectedIc from '../../../assets/icons/SelectedIc';

import SearchView from "./SearchView";
import CategoryView from "./CategoryView";
import SelectedView from "./SelectedView";
import PlaceDetail from "../PlaceDetail";

import GoogleMap from "../GoogleMap";

const TagData = [
  { id: 0, name: "태그1" },
  { id: 1, name: "태그2" },
  { id: 2, name: "태그3" },
  { id: 3, name: "태그4" },
];

const sampleData = [
  {
    "place": {
      "createdDate": null,
      "updatedDate": null,
      "id": 1,
      "category": "TOURATTRACTION",
      "placeGoogleId": "ChIJN2x0fu2ifDUR51BupseGYmE",
      "name": "국립중앙박물관",
      "address": "대한민국 서울특별시 용산구 서빙고로 137",
      "lat": 37.523,
      "lng": 126.980,
      "rating": 2.7,
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
      "itineraryItems": null
    },
    "placeDocument": {
      "id": null,
      "placeType": null,
      "placeId": "ChIJN2x0fu2ifDUR51BupseGYmE",
      "details": null,
      "attractionType": null,
      "apiTags": [
        "박물관"
      ],
      "subjectiveTags": [
        "전통적인"
      ],
      "searchFilters": null
    }
  },
  {
    "place": {
      "createdDate": null,
      "updatedDate": null,
      "id": 2,
      "category": "RESTAURANT",
      "placeGoogleId": "ChIJCwhNvwGjfDUR_Sq2kpWoUT4",
      "name": "경복궁 식당",
      "address": "대한민국 서울특별시 용산구 서빙고로 137",
      "lat": 37.575,
      "lng": 126.976,
      "rating": 4.7,
      "phoneNumber": "02-725-6561",
      "webSite": "https://www.minarirest.com/",
      "openingHours": [
        "월요일: 오전 10:00 ~ 오후 10:00",
        "화요일: 오전 10:00 ~ 오후 10:00",
        "수요일: 오전 10:00 ~ 오후 10:00",
        "목요일: 오전 10:00 ~ 오후 10:00",
        "금요일: 오전 10:00 ~ 오후 10:00",
        "토요일: 오전 10:00 ~ 오후 10:00",
        "일요일: 오전 10:00 ~ 오후 10:00"
      ],
      "priceLevel": "가격정보 없음",
      "description": null,
      "itineraryItems": null
    },
    "placeDocument": {
      "id": null,
      "placeType": null,
      "placeId": "ChIJN2x0fu2ifDUR51BupseGYmE",
      "details": null,
      "attractionType": null,
      "restaurantType": [
        "한식"
      ],
      "searchFilters": null
    }
  },
];

const TabData = [
  {
    id: 0, name: "직접 추가", icon: <AddLocaIc />, category: "Add",
    content: <SearchView />
  },
  {
    id: 1, name: "관광 명소", icon: <AttractionIc />, category: "TOURATTRACTION",
    content: (props) => <CategoryView category="TOURATTRACTION" {...props} />
  },
  {
    id: 2, name: "식당", icon: <RestaurantIc />, category: "RESTAURANT",
    content: (props) => <CategoryView category="RESTAURANT" {...props} />
  },
  {
    id: 3, name: "카페", icon: <CafeIc />, category: "CAFE",
    content: (props) => <CategoryView category="CAFE" {...props} />
  },
  {
    id: 4, name: "선택 완료", icon: <SelectedIc />, category: "SELECTED",
    content: (props) => <SelectedView {...props} />
  },
];


const Select = () => {
  const [checkedMap, setCheckedMap] = useState({});
  const [activeTab, setActiveTab] = useState(1);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const {
    scrollRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useScroll();

  const toggleCheckbox = (id) => {
    setCheckedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const tabClickHandler = (id) => {
    setActiveTab(id);
  }
  const activeTabData = TabData.find((tab) => tab.id === activeTab);
  const isAnyChecked = Object.values(checkedMap).some((v) => v === true);
  const selectedPlaces = sampleData.filter(item => checkedMap[item.place.id]);

  useEffect(() => {
    setSelectedPlace(null);
  }, [activeTab]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      if(!selectedPlace) return false;
        return !prev;
      }
    );
  };

  return (
    <Container>
      <SidebarL>
        <SidebarTop>
          <Information>
            <Date>
              Day1 {/* 시간 정보 받아와서 출력할 예정  */}
            </Date>
            <Area>
              서울시 용산구 {/* 구역 정보 받아와서 출력할 예정  */}
            </Area>
          </Information>
          <Tags>
            {TagData.map((tag) => (
              <TagContent key={tag.id}>
                #{tag.name}
              </TagContent>
            ))}
          </Tags>
        </SidebarTop>

        <SidebarMain>
          <TabContainer>
            {TabData.map((tab) => (
              <Tab key={tab.id}
                $isActiveTab={tab.id === activeTab}
                onClick={() => tabClickHandler(tab.id)}>
                <TabIcon
                  $isActiveTab={activeTab == tab.id}>
                  {tab.icon}
                </TabIcon>
                <TabText
                  $isActiveTab={activeTab == tab.id}>
                  {tab.name}
                </TabText>
              </Tab>
            ))}
          </TabContainer>
          <ListScrollWrapper
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {typeof activeTabData.content === 'function'
              ? activeTabData.content({
                data: sampleData, checkedMap, toggleCheckbox,
                selectedPlace, onSelectPlace: setSelectedPlace,
                onSidebarOpen: setIsSidebarOpen
              })
              : activeTabData.content}
          </ListScrollWrapper>
        </SidebarMain>

        <SidebarBottom>
          <BtnPrev>
            이전
          </BtnPrev>
          <BtnNext disabled={!isAnyChecked}>
            next
          </BtnNext>
        </SidebarBottom>
      </SidebarL>

      <MapContainer>
        {/* <GoogleMap selectedPlace={selectedPlace} places={selectedPlaces} mode="select" /> aip낭비 방지용 주석*/}
      </MapContainer>
      <SidebarR $isOpen={isSidebarOpen}>
        <ToggleButtonWrapper>
          <ToggleButton onClick={toggleSidebar}>
            {isSidebarOpen ? '▶' : '◀'}
          </ToggleButton>
        </ToggleButtonWrapper>
        <PlaceDetailWrapper>
          {isSidebarOpen && (
            <PlaceDetail selectedPlace={selectedPlace}/>
          )}
        </PlaceDetailWrapper>
      </SidebarR>
    </Container>
  );
}

export default Select

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

  width: 130px;
  height: 29px;

  font-weight: 700;
  font-size: 24px;
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
`
const Tab = styled.div`
  cursor: pointer;
  /* Frame 94 */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;

  gap: 6px;

  width: 70px;
  height: 56px;
`
const TabIcon = styled.div`
  color: ${({ $isActiveTab }) => ($isActiveTab ? '#2696A3' : '#12464C')};

`
const TabText = styled.div`
  display: flex;
  text-align: center; 
  padding: 1px 4px;

  border-radius: 8px;

  background: ${({ $isActiveTab }) => ($isActiveTab ? '#2696A3' : 'transparent')};
  color: ${({ $isActiveTab }) => ($isActiveTab ? '#ffffff' : '#12464C')};

  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
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
