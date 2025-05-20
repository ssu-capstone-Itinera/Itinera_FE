import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const categories = {
  자연적: ['해변', '산', '공원', '국립공원', '호수'],
  문화적: ['박물관', '미술관', '성당', '교회', '절'],
  엔터테인먼트: ['테마파크', '놀이공원', '동물원', '수족관'],
  도시적: ['쇼핑몰', '전망대', '다리', '대학가'],
  기타: ['자전거 여행', '골프장', '여행 명소', '지역 명소'],
  분위기: ['낭만적인', '활동적인', '전통적인'],
};

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
        <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>2/3</div>
        <Title>Q. 관광 명소 유형 선택</Title>
        <SubText>사용자가 선호하는 관광명소의 유형 선택</SubText>

        {Object.entries(categories).map(([category, tags]) => (
          <Section key={category}>
            <SectionTitle>{category}</SectionTitle>
            <TagList>
              {tags.map(tag => (
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
        ))}

        <NavButtons>
          <Button onClick={() => navigate('/survey/1')}>이전</Button>
          <Button onClick={() => navigate('/survey/3')}>다음</Button>
        </NavButtons>
      </Card>
    </Container>
  );
};

export default Survey2;

const Container = styled.div`
  background-color: #EBFAFB;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 700px;
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
