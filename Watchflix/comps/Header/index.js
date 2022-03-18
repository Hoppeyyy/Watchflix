import styled from "styled-components";
import ax from "axios";
import { useState } from "react";
import { bgpopup, popuptext } from "@/utils/variables";
import { useTheme } from "@/utils/provider";
import { Search, Radio, Button, Icon } from "semantic-ui-react";
import FormControlLabel from '@mui/material/FormControlLabel';
import { basicColor, whiteblack } from "@/utils/variables";
import ToggleBttn from '@/comps/ToggleBttn';
import ToggleSlide from '@/comps/ToggleSlide';
import FilterBttn from '@/comps/FilterBttn';
import SearchBar from '@/comps/SearchBar';
import AuthBtn from '@/comps/AuthBtn';


const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.colbg};  
  width: 100%;
  padding: 2rem 1rem;   
`;

const FlexHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  @media only screen and (min-width: 681px) and (max-width: 870px) {
    flex-direction: column;
    justify-content: center;
  }
  @media only screen and (max-width: 680px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const LogoCont = styled.a`
  display: block;
  margin: 0 1rem;
`
const AuthBox = styled.div`
display:flex;
flex-direction:row;
`
const Image = styled.img`
  min-width: 144px;
  height: 36px;
  object-position:"left center",
  object-fit: contain;
  display: block;
`

const SecondRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.rowbg};
  flex-wrap: wrap;
  
  @media only screen and (max-width:680px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.rowbg};
  flex-wrap: wrap;
  @media only screen and (max-width: 820px) {
  //   flex-direction: column;
  //   justify-content: center;
  // }
`;

const SwitchCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
`

const BttnCont = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  @media only screen and (max-width: 680px) {
    width: 100%;
  }
`


const Header = ({
  rowbg = bgpopup,
  colbg = bgpopup,
  width = 30,
  src = "/images/watchflix_logo.svg",
  onInput=()=>{},
  onSearchClick = () => {},
  handleView = () => {},
  handleColor = () => {},
  isView,
  isColor,
  onAscClick = () => {},
  onRateClick = () => {},
  AuthSignClick = () =>{},
  AuthLogClick = () =>{},
  ascBkColor,
  rateBkColor,
  ascChildren,
  rateChildren,

}) => {
  // const { theme } = useTheme();
  const { theme, setTheme } = useTheme();
  const [label, setLabel] = useState();
  //const [label2, setLabel2] = useState(false);


  return (
    <FlexCol>
{/* =================== FIRST ROW STARTS =================== */}
      <FlexHeader>
        <LogoCont
          href="/"
        >
          <Image
            src={src}
            alt="Watchflix logo"          
          />
        </LogoCont>

        <SearchBar 
          onChange = {onInput}
          onClick = {onSearchClick}
        />

        <AuthBox>
          <AuthBtn
          text="Sign Up"
          marginL = "0"
          AuthClick={AuthSignClick}
          />
          <AuthBtn
          text="Log In"
          AuthClick={AuthLogClick}
          />
          
        </AuthBox>
      </FlexHeader>

{/* =================== SECOND ROW STARTS =================== */}
      <SecondRow>
        <BttnCont>
          <FilterBttn 
            onAscClick = {onAscClick}
            onRateClick = {onRateClick}
            ascBkColor = {ascBkColor}
            rateBkColor = {rateBkColor}
            ascChildren = {ascChildren}
            rateChildren = {rateChildren}
          />
          
        </BttnCont>

        <FlexRow>
          <SwitchCont>
            <ToggleSlide 
              isOn={isView}
              handleToggle={handleView}
              style ={{marginRight: "20px"}}
              src='/images/icon_view.svg'
              id="toggleOne"
            />

            <ToggleSlide 
              isOn={isColor}
              handleToggle={handleColor}
              id="toggleTwo"
              src='/images/icon_lightdark.svg'
              marginR = '0'
            />            

          </SwitchCont>
        </FlexRow>

      </SecondRow> 
    </FlexCol> 
  );
};

export default Header;