import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const tourattractionTagList = [
  "자연", "해변", "산", "공원", "국립공원", "호수", "폭포", "섬", "계곡", "문화역사", "박물관", "미술관", "성당", "교회",
  "사원", "절", "궁전", "문화유산", "구시가지", "테마파크", "놀이공원", "동물원", "수족관", "식물원", "지역축제", "전통시장",
  "공연장", "번화가", "온천", "스키장", "골프장", "캠핑장", "트레킹", "서핑", "스노클링", "카약", "패러글라이딩장소", "자전거도로",
  "쇼핑몰", "야시장", "전망대", "다리", "대학가", "스포츠경기장", "항구", "등대", "애완동물동반가능", "야경명소", "루프탑", "명소"
];
const subjectiveTagList = [
  "한적한", "활발한", "낭만적인", "모험적인", "힐링", "인스타감성", "여유로운", "이국적인", "전통적인"
];

const Survey2 = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Container>
      <Card>
        <Progress />
        <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>3/4</div>
        <Title>Q. 관광 명소 취향 선택</Title>
        <SubText>선호하시는 관광지의 유형을 선택해주세요</SubText>

        <Section>
          <SectionTitle>유형</SectionTitle>
            <TagList>
              {tourattractionTagList.map(tag => (
                <Tag
                  key={tag}
                  selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  # {tag}
                </Tag>
              ))}
            </TagList>
          </Section>
          <Section>
            <SectionTitle>분위기</SectionTitle>
            <TagList>
              {subjectiveTagList.map(tag => (
                <Tag
                  key={tag}
                  selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  # {tag}
                </Tag>
              ))}
            </TagList>
          </Section>

        <NavButtons>
          <Button onClick={() => navigate('/survey/2')}>이전</Button>
          <Button onClick={() => navigate('/survey/4')}>다음</Button>
        </NavButtons>
      </Card>
    </Container>
  );
};

export default Survey2;

const Container = styled.div`
  background-color: #EBFAFB;

  display: flex;
  flex-direction: column;

  //justify-content: center;
  align-items: center;
  
  padding: 100px 0px;
  min-height: 950px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 785px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Progress = styled.div`
  height: 4px;
  background: #E0E0E0;
  border-radius: 4px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 66%;
    background-color: #32C8D9;
    border-radius: 4px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: #222;
`;

const SubText = styled.p`
  margin-left: 32px;
  font-size: 18px;
  color: #424242;
  margin-bottom: 16px;
`;

const Section = styled.div`
  margin-bottom: 24px;
  margin-left: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 8px;
  color: #000;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Tag = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 14px;
  background-color: ${({ selected }) => (selected ? '#2696A3' : '#eee')};
  color: ${({ selected }) => (selected ? '#fff' : '#333')};
  cursor: pointer;
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const Button = styled.button`
  background-color: #2696A3;
  color: #EBFAFB;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 18px;
  width: 120px;
  cursor: pointer;

  &:first-child {
    background-color: #BFEEF3;
    color: #12464C;
    border: 1px solid #BFEEF3;
  }
`;
