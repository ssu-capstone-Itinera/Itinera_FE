import { useState } from 'react';
import LocationIcon from '../../assets/icons/LocationIcon.jsx';
import styled from 'styled-components';
import useScroll from '../../hooks/useScroll.js';
import { useNavigate } from 'react-router-dom';
import Pic1 from '../../assets/images/pic1.webp';
import Pic2 from '../../assets/images/pic2.jpeg'
import Pic3 from '../../assets/images/pic3.webp'
import Pic4 from '../../assets/images/pic4.jpg'
import Pic5 from '../../assets/images/pic5.jpg'
import Pic6 from '../../assets/images/pic6.jpg'

const sampleData = [
  { id: 1, name: '경복궁', description: '조선 왕조의 위엄을 느낄 수 있는 서울의 대표 명소', tags: ['#서울', '#역사', '#궁궐'], image: Pic1 },
  { id: 2, name: '해운대 해수욕장', description: '부산의 푸른 바다를 즐길 수 있는 인기 여행지', tags: ['#부산', '#바다', '#휴양'], image: Pic2 },
  { id: 3, name: '남이섬', description: '자연과 낭만이 공존하는 대표 데이트 코스', tags: ['#춘천', '#자연', '#데이트'], image: Pic3 },
  { id: 4, name: '제주도 성산일출봉', description: '일출 명소로 유명한 제주도의 랜드마크', tags: ['#제주', '#일출', '#자연경관'], image: Pic4 },
  { id: 5, name: '안동 하회마을', description: '전통과 고즈넉함이 살아있는 한국의 유산', tags: ['#안동', '#전통마을', '#문화유산'], image: Pic5 },
  { id: 6, name: '강릉 경포대', description: '동해안의 아름다움을 만끽할 수 있는 뷰포인트', tags: ['#강릉', '#동해', '#풍경'], image: Pic6 },
];

const Home = () => {
  const [checkedMap, setCheckedMap] = useState({});
  const [selectedTag, setSelectedTag] = useState(null);
  const navigate = useNavigate();
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

  const allTags = [...new Set(sampleData.flatMap(item => item.tags))];
  const filteredData = selectedTag ? sampleData.filter(item => item.tags.includes(selectedTag)) : sampleData;

  return (
    <Container>
      <Title>Itinera</Title>
      <Subtitle>당신만의 여행 목록을 자유롭게 구성해보세요!</Subtitle>

      <TagWrapper>
        {allTags.map((tag, index) => (
          <Tag
            key={index}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={tag === selectedTag ? 'selected' : ''}
          >
            {tag}
          </Tag>
        ))}
      </TagWrapper>

      <CardScrollWrapper
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {filteredData.map((item) => (
          <Card key={item.id}>
            <ImageWrapper>
              <CardImage src={item.image} alt={`${item.name} 이미지`} />
            </ImageWrapper>
            <CardContent>
              <Location>
                <LocationText>
                  <LocationIcon />
                  <Name>{item.name}</Name>
                </LocationText>

                <CheckboxWrapper>
                  <HiddenCheckbox
                    checked={checkedMap[item.id] || false}
                    onChange={() => toggleCheckbox(item.id)}
                  />
                  <StyledCheckbox $checked={checkedMap[item.id] || false} />
                </CheckboxWrapper>
              </Location>

              <HashTags>
                {item.tags.map((tag, index) => (
                  <SmallTag key={index}>{tag}</SmallTag>
                ))}
              </HashTags>

              <Description>{item.description}</Description>
            </CardContent>
          </Card>
        ))}
      </CardScrollWrapper>

      <ActionBanner>
        <BannerTitle>나만의 여행을 만들어보세요!</BannerTitle>
        <p>여행지를 선택해 나만의 여행 컬렉션을 구성해보세요.</p>
        <BannerButton onClick={() => navigate('/survey/1')}>
          여행 만들기
        </BannerButton>
      </ActionBanner>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: #EBFAFB;
  padding: 40px;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 50px;
  color: #12464C;
  margin-bottom: 6px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 80px;
  text-align: center;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 16px;
`;

const Tag = styled.button`
  border: none;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 16px;
  color: #12464C;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  &.selected {
    background-color: #12464C;
    color: white;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

const CardScrollWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 12px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &.active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  flex: 0 0 auto;
  width: 260px;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #dddddd;
  overflow: hidden;
  cursor: pointer;
  scroll-snap-align: start;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  background-color: #f2f2f2;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LocationText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.div`
  color: #12464C;
  font-size: 18px;
  font-weight: 600;
`;

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
  width: 18px;
  height: 18px;
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

const HashTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
`;

const SmallTag = styled.span`
  background-color:#EBFAFB;
  color: #2696A3;
  font-weight: 600;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.5;
`;

const ActionBanner = styled.div`
  margin-top: 60px;
  background-color: #ffffff;
  border: 2px dashed #B3E5E6;
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  color: #12464C;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const BannerTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 8px;
`;

const BannerButton = styled.button`
  margin-top: 16px;
  background-color: #12464C;
  color: white;
  border: none;
  padding: 10px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0e3b40;
  }
`;