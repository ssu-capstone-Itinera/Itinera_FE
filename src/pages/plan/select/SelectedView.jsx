import styled from "styled-components";


import DotIcon from '../../../assets/icons/DotIcon';
import Marker from "../../../assets/icons/Marker";

const SelectedView = ({ data, checkedMap, toggleCheckbox, selectedPlace, onSelectPlace, onSidebarOpen}) => {
  const selected = data.filter((item) => checkedMap[item.id]);

  const handleClick = (item) => {
    if (selectedPlace?.place?.placeGoogleId !== item.place.placeGoogleId) {
      onSelectPlace(item);
      onSidebarOpen(true);
    }
  }

  return selected.map((item) => (
    <List key={item.id}>
      <ListContent>
        <Location
          $isActiveItem={selectedPlace?.place?.placeGoogleId === item.place.placeGoogleId}
          onClick={() => handleClick(item)}>
          <LocationText>
            {selectedPlace?.place?.placeGoogleId === item.place.placeGoogleId
              ? <Marker />
              : <DotIcon />}
            <Name>{item.place?.name}</Name>
          </LocationText>

          <CheckboxWrapper>
            <HiddenCheckbox
              checked={checkedMap[item.id] || false}
              onChange={() => toggleCheckbox(item.id)}
            />
            <StyledCheckbox $checked={checkedMap[item.id] || false} />
          </CheckboxWrapper>
        </Location>

        {/* <Description>{item.description}</Description> */}
      </ListContent>
    </List>
  ));
};
export default SelectedView;

const List = styled.div`
  /* 리스트*/

  /* Auto layout */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 16px;

  //width: 489px;
  height: 64px;
  
  flex: 0 0 auto;
  background-color: #ffffff;
  border-bottom: 1px solid #EEEEEE;

  overflow: hidden;
  scroll-snap-align: start;
`
const ListContent = styled.div`
  display: flex;
  
  padding: 8px 16px;
`
const Location = styled.div`
cursor: pointer;
  /* 선택 시 범위 */

  /* Auto layout */
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
  gap: 16px;

  width: 440px;
  height: 48px;
  border-radius: 16px;
  
  background: ${({ $isActiveItem }) => ($isActiveItem ? '#EBFAFB' : 'transparent')};

  ${({ $isActiveItem }) => !$isActiveItem && `
    &:hover {
      background: #FEFBEA;
    }
  `}

  ${({ $isActiveItem }) => $isActiveItem && `background: #F0F8F9;`}

`
const LocationText = styled.div`
  /* 선택 시 범위 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  width: 440px;
  height: 48px;
`
const Name = styled.div`
  /* 장소 이름 */

  /* Body/18px */
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;

  /* Primary/Darker */
  color: #12464C;
`

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
