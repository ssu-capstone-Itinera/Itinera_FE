import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const rescategories = {
  종류: ['한식', '일식', '양식', '중식'],
  분위기: ['자유로운'],
};

const cafescategories = {
  //카페 
  종류: ['애견 동반', '루프탑', '커피 전문', '베이커리 전문'],
  분위기: ['심각함'],
};

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
        <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>3/3</div>
        <Title>Q. 식당 유형 선택</Title>
        <SubText> 선호하시는 식당의 유형을 선택해주세요</SubText>

        {Object.entries(rescategories).map(([rescategories, tags]) => (
          <Section key={rescategories}>
            <SectionTitle>{rescategories}</SectionTitle>
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

        <Title>Q. 카페 유형 선택</Title>
        <SubText> 선호하시는 카페의 유형을 선택해주세요</SubText>
        {Object.entries(cafescategories).map(([cafescategories, tags]) => (
          <Section key={cafescategories}>
            <SectionTitle>{cafescategories}</SectionTitle>
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
          <Button onClick={() => navigate('/survey/2')}>이전</Button>
          <Button>제출</Button>
        </NavButtons>
      </Card>
    </Container>
  );
};

export default Survey3;

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
