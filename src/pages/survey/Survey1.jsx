import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Survey = () => {
    const navigate = useNavigate();
    const [tripDays, setTripDays] = useState(1);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const savedDays = parseInt(localStorage.getItem('tripDays')) || 1;
        setTripDays(savedDays);
        setLocations(Array(savedDays).fill('')); // 일자별 입력칸 초기화
    }, []);

    const handleChange = (value, index) => {
        const updated = [...locations];
        updated[index] = value;
        setLocations(updated);
    };

    const handleNext = () => {
        const hasEmpty = locations.some((loc) => loc.trim() === '');
        if (hasEmpty) {
            alert('모든 일자의 여행지를 입력해주세요.');
            return;
        }
        localStorage.setItem('mainTourPlace', JSON.stringify(locations));
        //console.log(locations); (2) ['서울', '서울']
        navigate('/survey/3');
    };

    return (
        <Container>
            <Card>
                <div>
                    <Progress />
                    <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>2/4</div>
                </div>
                <Question>
                    <Title>Q. 여행지 </Title>
                    <SubText>일자별 여행할 지역을 작성해주세요</SubText>
                    {locations.map((loc, i) => (
                        <Section key={i} style={{ marginBottom: '12px' }}>
                            <SectionTitle>Day {i + 1}</SectionTitle>
                            <Input
                                type="text"
                                value={loc}
                                onChange={(e) => handleChange(e.target.value, i)}
                                placeholder="예: 용산, 강릉, 부산"
                            />
                        </Section>
                    ))}
                </Question>

                <NavButtons>
                    <Button onClick={() => navigate('/survey/1')}>이전</Button>
                    <Button onClick={handleNext}>다음</Button>
                </NavButtons>
            </Card>
        </Container>
    );
};

export default Survey;

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
  width: 700px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    gap: 8px;
`;

const Progress = styled.div`
  height: 4px;
  width: 100%;
  background: #E0E0E0;
  border-radius: 4px;
  margin-bottom: 24px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 25%;
    background-color: #32C8D9;
    border-radius: 4px;
  }
`;


const Question = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: #222;
`;

const SubText = styled.p`
  margin-left: 32px;
  font-size: 16px;
  color: #424242;
  margin-bottom: 16px;
`;

const Section = styled.div`
  margin-bottom: 24px;
  margin-left: 32px;
`;

const SectionTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #424242;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #407b80;
  border-radius: 12px;
  flex: 1;
  font-size: 14px;
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