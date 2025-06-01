export const tourattractionTagList = [
  { type: '자연', tags: [
    { value: "BEACH", label: "해변" },
    { value: "MOUNTAIN", label: "산" },
    { value: "PARK", label: "공원" },
    { value: "NATIONAL_PARK", label: "국립공원" },
    { value: "LAKE", label: "호수" },
    { value: "WATERFALL", label: "폭포" },
    { value: "ISLAND", label: "섬" },
  ]},
  { type: '문화·역사', tags: [
    { value: "MUSEUM", label: "박물관" },
    { value: "ART_MUSEUM", label: "미술관" },
    { value: "CATHEDRAL", label: "성당" },
    { value: "CHURCH", label: "교회" },
    { value: "BUDDHIST_TEMPLE", label: "사찰" },
    { value: "PALACE", label: "궁궐" },
    { value: "CULTURAL_HERITAGE_SITE", label: "문화유산" },
    { value: "HISTORIC_DISTRICT", label: "역사거리" },
  ]},
  { type: '레저·체험', tags: [
    { value: "THEME_PARK", label: "테마파크" },
    { value: "AMUSEMENT_PARK", label: "놀이공원" },
    { value: "ZOO", label: "동물원" },
    { value: "AQUARIUM", label: "아쿠아리움" },
    { value: "BOTANICAL_GARDEN", label: "식물원" },
    { value: "CAMPING_SITE", label: "캠핑장" },
    { value: "BIKE_TRAIL", label: "자전거도로" },
    { value: "GOLF_COURSE", label: "골프장" },
  ]},
  { type: '도심·생활', tags: [
    { value: "TRADITIONAL_MARKET", label: "전통시장" },
    { value: "PERFORMANCE_HALL", label: "공연장" },
    { value: "POPULAR_STREET", label: "핫플 거리" },
    { value: "SHOPPING_MALL", label: "쇼핑몰" },
    { value: "OBSERVATORY", label: "전망대" },
    { value: "BRIDGE", label: "다리" },
    { value: "UNIVERSITY_AREA", label: "대학가" },
    { value: "STADIUM", label: "경기장" },
    { value: "HARBOR", label: "항구" },
    { value: "LIGHTHOUSE", label: "등대" },
    { value: "NIGHT_VIEW_SPOT", label: "야경 명소" },
    { value: "FAMOUS_PLACE", label: "유명 장소" },
  ]}
];

export const subjectiveTagList = [
  { value: "한적한", label: "한적한" },
  { value: "활발한", label: "활발한" },
  { value: "낭만적인", label: "낭만적인" },
  { value: "모험적인", label: "모험적인" },
  { value: "힐링", label: "힐링" },
  { value: "인스타감성", label: "인스타 감성" },
  { value: "여유로운", label: "여유로운" },
  { value: "이국적인", label: "이국적인" },
  { value: "전통적인", label: "전통적인" },
];

export const rescategories = [
  {
    type: '국가별',
    tags: [
      { value: "KOREAN_RESTAURANT", label: "한식" },
      { value: "JAPANESE_RESTAURANT", label: "일식" },
      { value: "CHINESE_RESTAURANT", label: "중식" },
      { value: "WESTERN_RESTAURANT", label: "양식" },
      { value: "ASIAN_RESTAURANT", label: "아시안" },
    ]
  },
  {
    type: '스타일',
    tags: [
      { value: "FAST_FOOD", label: "패스트푸드" },
      { value: "VEGETARIAN", label: "채식" },
      { value: "BUFFET", label: "뷔페" },
      { value: "CAFE", label: "카페" }, // 겹치는 경우도 있으므로 분리 가능
    ]
  }
];

export const cafescategories = [
  {
    type: '시설·환경',
    tags: [
      { value: "ALLOWS_DOGS", label: "반려동물 동반 가능" },
      { value: "PARKING_OPTIONS", label: "주차 가능" },
      { value: "RESERVABLE", label: "예약 가능" },
    ]
  },
  {
    type: '운영 방식',
    tags: [
      { value: "CURBSIDE_PICKUP", label: "차에서 픽업 가능" },
      { value: "TAKEOUT", label: "테이크아웃 가능" },
      { value: "OUTDOOR_SEATING", label: "테라스 식사 가능" },
      { value: "DINE_IN", label: "매장 식사 가능" },
    ]
  },
  {
    type: '대상',
    tags: [
      { value: "GOOD_FOR_CHILDREN", label: "아이와 함께하기 좋음" },
      { value: "GOOD_FOR_GROUPS", label: "단체 모임 가능" },
      { value: "MENU_FOR_CHILDREN", label: "아동 메뉴 있음" },
    ]
  },
  {
    type: '제공 메뉴',
    tags: [
      { value: "SERVES_BEER", label: "맥주 제공" },
      { value: "SERVES_COCKTAILS", label: "칵테일 제공" },
      { value: "SERVES_WINE", label: "와인 제공" },
      { value: "SERVES_BREAKFAST", label: "아침 식사 제공" },
      { value: "SERVES_LUNCH", label: "점심 제공" },
      { value: "SERVES_DINNER", label: "저녁 제공" },
      { value: "SERVES_BRUNCH", label: "브런치 제공" },
      { value: "SERVES_DESSERT", label: "디저트 제공" },
      { value: "SERVES_VEGETARIAN_FOOD", label: "채식 메뉴 제공" },
    ]
  }
];