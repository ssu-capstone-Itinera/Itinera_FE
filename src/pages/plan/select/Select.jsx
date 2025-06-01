import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { fetchPlaces } from "../../../api/recommend"
import { fetchDetail } from "../../../api/getPlaceDetail";

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

import {
  tourattractionTagList,
  subjectiveTagList,
  rescategories,
  cafescategories,
} from '../../../contants/tagList'

const tagMap = [
  ...tourattractionTagList.flatMap(group => group.tags),
  ...subjectiveTagList,
  ...rescategories.flatMap(group => group.tags),
  ...cafescategories.flatMap(group => group.tags),
];

const Select = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentDay = location.state?.currentDay || 1;

  const mainTourPlaces = JSON.parse(localStorage.getItem('mainTourPlace') || '[]');
  const mainTourPlace = mainTourPlaces[currentDay - 1] || '서울';

  const userTags = JSON.parse(localStorage.getItem('userTags') || '{}');
  const selectedValues = [
    ...userTags.tourattractionTagList,
    ...userTags.subjectiveTagList,
    ...userTags.restaurantTypeList,
    ...userTags.cafeTagList,
  ];
  const tagData = selectedValues.map(value => tagMap.find(tag => tag.value === value)).filter(Boolean);

  // post /api/v1/place
  const [placeData, setPlaceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const requestBody = {
      mainTourPlace,
      ...userTags
    };
    console.log(requestBody);

    const getPlaces = async () => {
      setIsLoading(true);
      try {
        const res = await fetchPlaces(requestBody);
        console.log(res);

        const placeList = res.placeResponseList || [];
        const deduplicatedData = Array.from(
          new Map(placeList.map(item => [item.placeGoogleId, item])).values()
        );
        setPlaceData(deduplicatedData);
        console.log(deduplicatedData);
      } catch (error) {
        console.error('장소 추천 실패', error);
      } finally {
        setIsLoading(false);
      }
    };
    getPlaces();

  }, [currentDay]);


  const [customSelectedPlaces, setCustomSelectedPlaces] = useState([]);

  //get /api/vi/place/{googleId}
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeDetail, setPlaceDetail] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);



  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      if (!selectedPlace) return false;
      return !prev;
    }
    );
  };

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

  const [checkedMap, setCheckedMap] = useState({});
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

  const [activeTab, setActiveTab] = useState(1);
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
  useEffect(() => {
    setIsSidebarOpen(false);
    setSelectedPlace(null);
  }, [activeTab]);

  const selectedPlaces = [
    ...placeData.filter(p => checkedMap[p.placeGoogleId]),
    ...customSelectedPlaces.filter(p => checkedMap[p.placeGoogleId]),
  ];
  //console.log(selectedPlaces);

  const handleNext = () => {
    if (selectedPlaces.length < 2) return;
    navigate('/plan/2', {
      state: {
        selected: selectedPlaces,
        currentDay: currentDay,
        tagData: tagData,
      },
    });
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
          {isLoading ? (
            <span style={{ marginLeft: '12px' }}>로딩 중입니다...</span>
          ) : placeData ? (
            <>
              {activeTabData.content({
                category: activeTabData.category,
                data: activeTab === 4 ? selectedPlaces : placeData,
                checkedMap, toggleCheckbox,
                selectedPlace, setSelectedPlace,
                setIsSidebarOpen,
              })}</>
          ) : <span style={{ marginLeft: '12px' }}>추천 결과가 없습니다.</span>}
        </SidebarMain>

        <SidebarBottom>
          <BtnPrev onClick={() => navigate('/survey/1')}>
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
              detail={placeDetail} //조건부 입력, 추천된 것/검색결과
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
