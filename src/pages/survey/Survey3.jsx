import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { rescategories, cafescategories } from '../../contants/tagList';

const Survey3 = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTag = (tagValue) => {
    setSelectedTags(prev =>
      prev.includes(tagValue)
        ? prev.filter(t => t !== tagValue)
        : [...prev, tagValue]
    );
  };

  const { tourattractionTagList, subjectiveTagList } = location.state || {};

  const isResTag = (value) => rescategories.some(g => g.tags.some(t => t.value === value));
  const isCafeTag = (value) => cafescategories.some(g => g.tags.some(t => t.value === value));

  const handleSubmit = () => {
    const rescategoriesFiltered = selectedTags.filter(tag => isResTag(tag));
    const cafescategoriesFiltered = selectedTags.filter(tag => isCafeTag(tag));

    const userTags = {
      tourattractionTagList: tourattractionTagList,
      subjectiveTagList: subjectiveTagList,
      restaurantTypeList: rescategoriesFiltered,
      cafeTagList: cafescategoriesFiltered,
    };
    //console.log(userTags);
    localStorage.setItem('userTags', JSON.stringify(userTags));
    navigate('/plan/1');
  };


  return (
    <Container>
      <Card>
        <Progress />
        <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>4/4</div>
        <Title>Q. 식당 취향 선택</Title>
        <SubText> 선호하는 식당의 취향을 선택해주세요</SubText>

        {rescategories.map((group) => (
          <Section key={group.type}>
            <SectionTitle>{group.type}</SectionTitle>
            <TagList>
              {group.tags.map(tag => (
                <Tag
                  key={tag.value}
                  selected={selectedTags.includes(tag.value)}
                  onClick={() => toggleTag(tag.value)}
                >
                  #{tag.label}
                </Tag>
              ))}
            </TagList>
          </Section>
        ))}

        <Title>Q. 카페 취향 선택</Title>
        <SubText> 선호하는 카페의 취향을 선택해주세요</SubText>
        {cafescategories.map((group) => (
          <Section key={group.type}>
            <SectionTitle>{group.type}</SectionTitle>
            <TagList>
              {group.tags.map(tag => (
                <Tag
                  key={tag.value}
                  selected={selectedTags.includes(tag.value)}
                  onClick={() => toggleTag(tag.value)}
                >
                  #{tag.label}
                </Tag>
              ))}
            </TagList>
          </Section>
        ))}
        <NavButtons>
          <Button onClick={() => navigate('/survey/3')}>이전</Button>
          <Button onClick={handleSubmit}>제출</Button>
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
  padding: 48px 56px;
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
