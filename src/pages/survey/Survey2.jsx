import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { tourattractionTagList, subjectiveTagList } from '../../contants/tagList';

const Survey2 = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  const toggleTag = (tagValue) => {
    setSelectedTags(prev =>
      prev.includes(tagValue)
        ? prev.filter(t => t !== tagValue)
        : [...prev, tagValue]
    );
  };

  const isTourTag = (value) => tourattractionTagList.some(g => g.tags.some(t => t.value === value));
  const isSubjectiveTag = (value) => subjectiveTagList.some(t => t.value === value);

  const handleNext = () => {
    const tourattractionTagListFiltered = selectedTags.filter(tag => isTourTag(tag));
    const subjectiveTagListFiltered = selectedTags.filter(tag => isSubjectiveTag(tag));
    
    navigate('/survey/4', {
      state: {
        tourattractionTagList: tourattractionTagListFiltered,
        subjectiveTagList: subjectiveTagListFiltered,
      },
    });
  };

  return (
    <Container>
      <Card>
        <Progress />
        <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>3/4</div>
        <Title>Q. 관광 명소 취향 선택</Title>
        <SubText>선호하는 관광지의 취향을 선택해주세요</SubText>
        <Section>
          <SectionTitle>분위기</SectionTitle>
          <TagList>
            {subjectiveTagList.map(tag => (
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

        {tourattractionTagList.map((group) => (
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
          <Button onClick={() => navigate('/survey/2')}>이전</Button>
          <Button onClick={handleNext}>다음</Button>
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
  padding: 48px 56px;
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
