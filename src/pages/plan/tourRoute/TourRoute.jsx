import styled from "styled-components";

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useScroll from '../../../hooks/useScroll';

import CafeIc from "../../../assets/icons/CafeIc";
import RestaurantIc from '../../../assets/icons/RestaurantIc';
import AttractionIc from '../../../assets/icons/AttrantionIc';

import AddLocaIc from '../../../assets/icons/AddLocaIc';
import CarIc from "../../../assets/icons/CarIc";
import BusIc from "../../../assets/icons/BusIc";
import WalkIc from "../../../assets/icons/WalkIc";

import RouteDetail from "./RouteDetail";

import GoogleRouteMap from "../GoogleRouteMap";

const TagData = [
  { id: 0, name: "태그1" },
  { id: 1, name: "태그2" },
  { id: 2, name: "태그3" },
  { id: 3, name: "태그4" },
];

const TabData = [
  {
    id: 0, name: "대중교통", icon: <BusIc />, travelMode: "TRANSIT",
    content: (props) => <GoogleRouteMap mode="route" travelMode="TRANSIT"
      onRoutesExtracted={(data) => setRoutes(data)}
      {...props} />
  },
  {
    id: 1, name: "자가용", icon: <CarIc />, travelMode: "DRIVING",
    content: () => <div>DRIVING</div> //(props) => <GoogleRouteMap travelMode="DRIVING" {...props} />
  },
  {
    id: 2, name: "도보", icon: <WalkIc />, travelMode: "WALKING",
    content: () => <div>WALKING</div>//(props) => <GoogleRouteMap travelMode="WALKING" {...props} />
  },
  {
    id: 3, name: "자전거", icon: <AddLocaIc />, travelMode: "BICYCLING",
    content: () => <div>BICYCLING</div>//(props) => <GoogleRouteMap travelMode="BICYCLING" {...props} />
  },
];

const TourRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalDays, currentDay } = location.state;
  const [places, setPlaces] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('orderedPlaces');
    if (stored) {
      setPlaces(JSON.parse(stored));
    }
  }, []);
  //console.log(places)

  const [activeTab, setActiveTab] = useState(0);
  const activeTabData = TabData.find((tab) => tab.id === activeTab);
  const tabClickHandler = (id) => {
    setActiveTab(id);
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {
    scrollRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useScroll();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const willBeClosed = prev === true; // 지금 열려있으면 닫히는 상태로 바뀜
      if (willBeClosed) {
        return false;
      } else {
        return true;
      }
    });
  };

  const resetTripData = () => {
  localStorage.removeItem('tripPlan');
  localStorage.removeItem('tripPlaces');
  localStorage.removeItem('orderedPlaces');
  console.log('여행 데이터 초기화 완료');
};

  const handleNextDay = () => {
    const savedPlaces = JSON.parse(localStorage.getItem('tripPlaces') || '[]');
    const updatedPlaces = [...savedPlaces, places];
    localStorage.setItem('tripPlaces', JSON.stringify(updatedPlaces));

    console.log(updatedPlaces);
    //resetTripData();

    navigate('/plan/select', {
      state: {
        currentDay: currentDay + 1,
        totalDays,
      },
    });
  };

  const handleSaveAll = () => {
    const savedPlaces = JSON.parse(localStorage.getItem('tripPlaces') || '[]');
    const updatedPlaces = [...savedPlaces, places];
    localStorage.setItem('tripPlaces', JSON.stringify(updatedPlaces));
    console.log(updatedPlaces);

    // 전체 일정 저장 처리
    console.log("전체 일정 저장됨!");
    navigate('/plan/final', {
      state: {
        currentDay: currentDay + 1,
        totalDays,
      },
    });
  };

  return (
    <Container>
      <SidebarL>
        <SidebarTop>
          <Information>
            <Date>
              Day{currentDay} {/* 시간 정보 받아와서 출력할 예정  */}
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
            {places.map((item) => (
              <List key={item.placeGoogleId}>
                <ListContent>
                  <Location>
                    <LocationText>
                      {item.category === "TOURATTRACTION"
                        ? <AttractionIc />
                        : (item.category === "RESTAURANT"
                          ? <RestaurantIc />
                          : <CafeIc />)}
                      <Name>{item.name}</Name>
                    </LocationText>
                  </Location>
                </ListContent>
              </List>
            ))}
          </ListScrollWrapper>
        </SidebarMain>

        <SidebarBottom>
          <BtnPrev onClick={() => navigate('/plan/order', {
            state: {
              currentDay: currentDay,
              totalDays,
            },
          }

          )}>
            이전
          </BtnPrev>
          {currentDay < totalDays ? (
            <BtnNext onClick={handleNextDay}>Day{currentDay + 1}</BtnNext>
          ) : (
            <BtnNext onClick={handleSaveAll}>최종 확인</BtnNext>
          )}
        </SidebarBottom>
      </SidebarL>

      <MapContainer>
        {activeTabData.content({
          places: places,
          onRoutesExtracted: (grouped) => {
            setRoutes(prev => [...prev, grouped]);
          },
          currentDay: currentDay
        })}
      </MapContainer>
      <SidebarR $isOpen={isSidebarOpen}>
        <ToggleButtonWrapper>
          <ToggleButton onClick={toggleSidebar}>
            {isSidebarOpen ? '▶' : '◀'}
          </ToggleButton>
        </ToggleButtonWrapper>
        <PlaceDetailWrapper>
          {isSidebarOpen && (
            <RouteDetail routes={routes} />
          )}
        </PlaceDetailWrapper>
      </SidebarR>
    </Container>
  );
}

export default TourRoute

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

  color: var(--Primary-Darker, #12464C);

    /* Heading/24px */
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
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
