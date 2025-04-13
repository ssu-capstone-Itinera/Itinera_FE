import React, { useState } from 'react';
import LocationIcon from '../../assets/icons/LocationIcon.jsx';
import styled from 'styled-components';
import useScroll from '../../hooks/useScroll.js';

const sampleData = [
  { id: 1, name: '장소 1', description: '귀여운 고양이' },
  { id: 2, name: '장소 2', description: '멋진 호랑이' },
  { id: 3, name: '장소 3', description: '신나는 토끼' },
  { id: 4, name: '장소 4', description: '행복한 개구리' },
  { id: 5, name: '장소 5', description: '호기심 많은 여우' },
  { id: 6, name: '장소 6', description: '장난꾸러기 펭귄' },
];

const Home = () => {
  const [checkedMap, setCheckedMap] = useState({});
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

  return (
    <Container>
      <Title>Itinera</Title>
      <Subtitle>앱설명?</Subtitle>

      <TagWrapper>
        <Tag># 가족여행</Tag>
        <Tag># 액티비티</Tag>
        <Tag># 동물</Tag>
      </TagWrapper>

      <CardScrollWrapper
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {sampleData.map((item) => (
          <Card key={item.id}>
            <ImageWrapper>
              <CardImage src="/images/sample.png" alt="장소 이미지" />
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
                <SmallTag># 가족여행</SmallTag>
                <SmallTag># 액티비티</SmallTag>
                <SmallTag># 동물</SmallTag>
              </HashTags>

              <Description>{item.description}</Description>
            </CardContent>
          </Card>
        ))}
      </CardScrollWrapper>
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
  font-size: 24px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  margin-bottom: 100px;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 11px;
`;

const Tag = styled.button`
  border: 1px solid #000000;
  background-color: transparent;
  border-radius: 16px;
  padding: 9px 26.5px;
  font-size: 20px;
  color: #000000;
  text-align: center;
  cursor: pointer;
`;

const CardScrollWrapper = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 8px;
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
  width: 240px;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #EEEEEE;
  overflow: hidden;
  scroll-snap-align: start;
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
  gap: 10px;
`;

const Name = styled.div`
  color: #12464C;
  font-size: 18px;
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
  padding: 4px 8px;
  border-radius: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`;