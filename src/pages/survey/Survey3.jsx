import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const rescategories = [
  "NONE", "KOREAN_RESTAURANT", "JAPANESE_RESTAURANT", "CHINESE_RESTAURANT", "WESTERN_RESTAURANT",
  "ASIAN_RESTAURANT", "FAST_FOOD", "VEGETARIAN", "BUFFET", "CAFE"
];

const cafescategories = [
  "ALLOWS_DOGS", "CURBSIDE_PICKUP", "DINE_IN", "GOOD_FOR_CHILDREN", "GOOD_FOR_GROUPS", "MENU_FOR_CHILDREN",
  "PARKING_OPTIONS", "RESERVABLE", "SERVES_BEER", "SERVES_COCKTAILS", "SERVES_WINE", "SERVES_BREAKFAST",
  "SERVES_LUNCH", "SERVES_DINNER", "SERVES_BRUNCH", "SERVES_DESSERT", "SERVES_VEGETARIAN_FOOD"
];

const Survey3 = () => {
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
        <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>4/4</div>
        <Title>Q. 식당 취향 선택</Title>
        <SubText> 선호하시는 식당의 유형을 선택해주세요</SubText>
        
        <Section>
          <SectionTitle>유형</SectionTitle>
          <TagList>
            {rescategories.map(tag => (
              <Tag
                key={tag}
                selected={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              >
                #{tag}
              </Tag>
            ))}
          </TagList>
        </Section>

        <Title>Q. 카페 취향 선택</Title>
        <SubText> 선호하시는 카페의 유형을 선택해주세요</SubText>
        <Section>
          <SectionTitle>유형</SectionTitle>
          <TagList>
            {cafescategories.map(tag => (
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
          <Button onClick={() => navigate('/survey/3')}>이전</Button>
          <Button>제출</Button>
        </NavButtons>
      </Card>
    </Container>
  );
};

export default Survey3;

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
  background: #d0e5e9;
  border-radius: 4px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
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
  gap: 8px;
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
