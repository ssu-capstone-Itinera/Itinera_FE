import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useScroll from '../../../hooks/useScroll';

import { fetchPlaces } from '../../../api/recommend'
import { fetchDetail } from '../../../api/getPlaceDetail'

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

const spAllPlaces = [
  {
    "placeId": 0,
    "placeGoogleId": "ChIJCwhNvwGjfDUR_Sq2kpWoUT4",
    "name": "경복궁 식당",
    "address": "대한민국 서울특별시 용산구 서빙고로 137",
    "rating": 4.7,
    "lat": 37.575,
    "lng": 126.976,
    "category": "RESTAURANT",
  },
  {
    "placeId": 1,
    "placeGoogleId": "ChIJN2x0fu2ifDUR51BupseGYmE",
    "name": "국립중앙박물관",
    "address": "대한민국 서울특별시 용산구 서빙고로 137",
    "rating": 2.7,
    "lat": 37.523,
    "lng": 126.980,
    "category": "TOURATTRACTION",
  },
];

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
      "언제부턴가 멋진 특별전들이 기획이 되면서 자주 가게 되는 것 같아요. 합스부르크 왕가 전도 좋았고 이번 ‘비엔나1900 꿈꾸는 예술가들‘전도 좋았어요.\n휠체어, 유모차 타고 즐기기도 좋고 청각장애인을 위한 해설, 시각장애인을 위한 전시 및 해설도 더해져서 누구에게나 접근 가능한 박물관이 되어 가고 있네요!", "서울로 하루 머물고  돌아오는길에 들렀어요.\n여기는 방문해보시길 강추합니다.\n다못봤어요. 넓고 관람할곳도많고 유로전시관은 보지도 못했어요. 체력이안되서요.\n10시30분쯤 도착했는데 좌회전신호 5번기다리고 좌회전해서 들어갔어요\n\n주말이라그런지 경찰관분이 교통지도해주셔서 그나마 원활히 들어갔다고 생각합니다.\n지하주차장에 겨우 자리 한군데비어있어서 주차를 했는데 좀 일찍 가시면 더 나을듯싶어요.\n곳곳에 편의점 카페가 잘되어있어서 뭘 가져가지않아도되요.\n박물관 실내 곳곳에 쉬어갈 곳들이 정말 잘되어있고 아주 쾌적해요.\n재방문의사 10000%입니다.\n아이들. 친구들끼리 연인끼리와도 저는 좋을듯싶습니다.\n\n특히 굿즈 스토어 꼭 들려보세요. 제가 가본 박물관 중 원탑인데 왜 국입중앙박물관 굿즈가 인기가 많은지 알겠어요.\n\n참고로 유모차 휠체어 가는길과 엘레베이터 잘되어있어요.", "볼거많고\n\n입장 공짜, 락커 공짜로 이용가능합니다.\n\n깨끗하고, 쾌적해서 카페 혹은 미술관에 있는 느낌을 줍니다.\n\n신경 많이 썼더군요\n\n훌륭했음!!", "딸아이와 함께 오랫만에 데이트를 했습니다~\n국립중앙박물관..처음 갔습니다.\n다~아 무료관람 이지만..\n집이 멀어서 박물관 근처에서 점심 먹으려고\n갔는데..정말 주변에 밥먹을곳이 한군데도 없어요ㅠ\n지하철로 다시 들어가서 길을건너 10~15분\n정도 걸어가야 음식점들이 있는데..비싸고..친절 하지 않아서 처음부터\n실망 했습니다.\n제가 방문한 날은 토요일 다행히도 야외에서 민속공연(나주삼색유산놀이)이 열려서\n재미있게 보고 박물관도 구경했습니다.\n주말이라서 저녁 8 시에 폐장 했기에\n3층까지 잘 보고 왔습니다.", "1층 상설 2층 기부관까지 보는데 3시간 걸려서 3층 해외관은 다음기회로 넘김\n\n평일날 갈껄 주말에 가니 애기들이랑 외국인 반반임\n\n애들 없는거 맞음? like 주말 동탄 스타필드\n\n이정도 퀄리티에 입장료는 무료인게 ㄹㅇ 말도 안됨\n\n근데 개인적으로 단점 두개만 말하거 싶음...\n\n모든 역사 통으로 집어넣는다고 ㅈㄴ 큰 역사적 반환점이나 이정도 취급으로 끝날 유물이 이닌데 싶은건 좀 작게 집어주는 느낌(임진왜란이나 직지심체요절, 백제금동대향로 같은)\n\n그리고 관람 가이드 라인이 없는게 좀 그랬음 일본 미술관갔을때는 ㄱ관람 순서 번호랑 바닥에 따로 라인 다 그려줬었는데 ㅇㅇ;; (한일 갈라치기 아님)\n사람들이 마구마구 왔다갔다 하는게 관람 몰입도가 낮고 사고 위험도 있을것 같음...\n\n그래도 가이드만 수십명이라 애들 데리고 다니면서 역사 겁나 가르쳐주는건 호감이였음 확실히 보는거랑 그냥 공부하는거랑 응애때는  공부하는데 확실히 도움될듯"
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

const TagData = [ //사용자 선택 태그
  { id: 0, name: "태그1" },
  { id: 1, name: "태그2" },
  { id: 2, name: "태그3" },
  { id: 3, name: "태그4" },
];

const Select = () => {
  const totalDays = 3;
  const location = useLocation();
  const currentDay = location.state?.currentDay || 1;

  // post /api/v1/place
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [placeData, setPlaceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customSelectedPlaces, setCustomSelectedPlaces] = useState([]);




  const loadPlaces = async (cursorParam = null) => {
    setIsLoading(true);
    const requestBody = {
      "mainTourPlace": "string",
      "radius": 0,
      "tourattractionTagList": [
        "자연"
      ],
      "subjectiveTagList": [
        "한적한"
      ],
      "restaurantTypeList": [
        "NONE"
      ],
      "restaurantPriceRangeList": [
        "NONE"
      ],
      "cafeTagList": [
        "ALLOWS_DOGS"
      ]
    };
    const requestPayload = {
      ...requestBody,
      cursor: cursorParam  // cursor 필드를 추가
    };

    try {
      const res = await fetchPlaces(requestPayload);
      console.log('API 응답 도착:', res);

      const {
        placeResponseList = [],
        nextCursor,
      } = res;

      setPlaceData((prev) => [...prev, ...placeResponseList]);
      setCursor(nextCursor);
      setHasMore(!!nextCursor);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlaces();
  }, []);

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

  //get /api/vi/place/{googleId}
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeDetail, setPlaceDetail] = useState(null); // 👈 상세 정보
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    if (!selectedPlace) return;

    const fetchDetailData = async () => {
      setIsDetailLoading(true);
      try {
        const detail = await fetchDetail(selectedPlace.placeGoogleId);
        setPlaceDetail(detail);
      } catch (err) {
        console.error('상세 정보 로딩 실패:', err);
      } finally {
        setIsDetailLoading(false);
      }
    };

    fetchDetailData();
  }, [selectedPlace]);


  const [checkedMap, setCheckedMap] = useState({});
  const [activeTab, setActiveTab] = useState(1);

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



  const handleAddCustomPlace = (place) => {
    setCustomSelectedPlaces((prev) => {
      if (prev.find(p => p.placeGoogleId === place.placeGoogleId)) return prev;
      return [...prev, place];
    });
  };

  const handleRemoveCustomPlace = (placeGoogleId) => {
    setCustomSelectedPlaces((prev) =>
      prev.filter((p) => p.placeGoogleId !== placeGoogleId)
    );
  };
  const TabData = [
    {
      id: 0, name: "직접 추가", icon: <AddLocaIc />, category: "MYPLACE",
      content: (props) =>
        <SearchView
          {...props}
          handleAddCustomPlace={handleAddCustomPlace}
          handleRemoveCustomPlace={handleRemoveCustomPlace}
        />
    },
    {
      id: 1, name: "관광 명소", icon: <AttractionIc />, category: "TOURATTRACTION",
      content: (props) => <CategoryView {...props} />
    },
    {
      id: 2, name: "식당", icon: <RestaurantIc />, category: "RESTAURANT",
      content: (props) => <CategoryView {...props} />
    },
    {
      id: 3, name: "카페", icon: <CafeIc />, category: "CAFE",
      content: (props) => <CategoryView {...props} />
    },
    {
      id: 4, name: "선택 완료", icon: <SelectedIc />, category: "SELECTED",
      content: (props) => <SelectedView {...props} />
    },
  ];
  const tabClickHandler = (id) => {
    setActiveTab(id);
  };
  
  const activeTabData = TabData.find((tab) => tab.id === activeTab);
  const selectedPlaces = [
    ...spAllPlaces.filter(p => checkedMap[p.placeGoogleId]),
    ...customSelectedPlaces.filter(p => checkedMap[p.placeGoogleId]),
  ];
  //console.log(selectedPlaces)

  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedPlaces.length < 2) return;

    navigate('/plan/order', {
      state: {
        selected: selectedPlaces,
        totalDays: totalDays,
        currentDay: currentDay,
      },
    });
  };

  useEffect(() => {
    setSelectedPlace(null);
  }, [activeTab]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      if (!selectedPlace) return false;
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
                  $isActiveTab={activeTab === tab.id}>
                  {tab.icon}
                </TabIcon>
                <TabText
                  $isActiveTab={activeTab === tab.id}>
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
            {activeTabData.content({
              category: activeTabData.category,
              data: activeTab === 4 ? selectedPlaces : spAllPlaces,
              checkedMap, toggleCheckbox,
              selectedPlace, setSelectedPlace,
              setIsSidebarOpen,
            })}
          </ListScrollWrapper>
        </SidebarMain>

        <SidebarBottom>
          <BtnPrev onClick={() => navigate('/survey/1')}>
            {/* 설문 정보를 저장하는지 모르니까 일단 제일 처음으로 */}
            이전
          </BtnPrev>
          <BtnNext
            disabled={selectedPlaces.length < 2}
            onClick={handleNext}>
            다음
          </BtnNext>
        </SidebarBottom>
      </SidebarL>

      <MapContainer>
        <GoogleMap selectedPlace={selectedPlace} places={selectedPlaces} mode="select" />
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
              detail={spSelected}
              loading={isDetailLoading} />
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
