import styled from "styled-components";
import ax from "axios";
import { useState } from "react";
import {
  Switch,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Box,
  Slider,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { bgpopup, popuptext } from "@/utils/variables";
import { useTheme } from "@/utils/provider";

// import SearchIcon from '@mui/icons-material/Search';
import { Search, Radio, Button, Icon } from "semantic-ui-react";
import FormControlLabel from '@mui/material/FormControlLabel';
import { basicColor, whiteblack } from "@/utils/variables";
import ToggleBttn from '@/comps/ToggleBttn';
import ToggleSlide from '@/comps/ToggleSlide';
import FilterBttn from '@/comps/FilterBttn';
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

const SearchBar = styled.input`
  width: 40%;
  height: 3rem;
  border: solid 1px #B08584;
  border-radius: 30px;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  margin-right: 2rem;

  @media only screen and (min-width: 1px) and (max-width: 870px) {
    width: 80%;
    margin: 1rem;
  }  
`

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

const DurationCont = styled.div`
  min-width: 300px;
  margin: 25px 15px 0 15px;
`;

const BttnCont = styled.div`
  width: ${props => props.width}%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Text = styled.h3`
`

const genre = ["Documentaries", "Children & Family Movies", "Dramas"];

const rating = ["TV-MA", "TV-14", "R", "TV-PG", "PG-13"];

const country = ["Canada"];

const sortby = [
  "Date (newest)",
  "Date (oldest)",
  "Alphabet A-Z",
  "Alphabet Z-A",
  "Most Reviews",
];

const Header = ({
  rowbg = bgpopup,
  colbg = bgpopup,
  width = 30,
  src = "/images/watchflix_logo.png",
  onInput=()=>{},
  handleView = () => {},
  handleColor = () => {},
  isView,
  isColor,
  onAscClick = () => {},
  onRateClick = () => {},
  AuthSignClick = () =>{},
  AuthLogClick = () =>{},
  ascBkColor = null,
  rateBkColor = null,
  ascChildren = null,
  rateChildren = null,

}) => {
  // const { theme } = useTheme();
  const { theme, setTheme } = useTheme();
  const [label, setLabel] = useState();
  //const [label2, setLabel2] = useState(false);


  const [genreName, setGenreName] = useState([]);
  const handleGenre = (event) => {
    const {
      target: { value },
    } = event;
    setGenreName(typeof value === "string" ? value.split(",") : value);
  };

  const [ratingName, setRatingName] = useState([]);
  const handleRating = (event) => {
    const {
      target: { value },
    } = event;
    setRatingName(typeof value === "string" ? value.split(",") : value);
  };

  const [countryName, setCountryName] = useState([]);
  const handleCountry = (event) => {
    const {
      target: { value },
    } = event;
    setCountryName(typeof value === "string" ? value.split(",") : value);
  };

  const [sortbyName, setSortbyName] = useState([]);
  const handleSortby = (event) => {
    const {
      target: { value },
    } = event;
    setSortbyName(typeof value === "string" ? value.split(",") : value);
  };

  function duration(dur) {
    return `${dur} minutes`;
  }

  const [dur, setDur] = useState([60, 80]);
  const handleDur = (event, newDur) => {
    setDur(newDur);
  };



  return (
    <FlexCol>
{/* =================== HEADER STARTS =================== */}
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
          placeholder="Search for a Movie..."
          onChange={onInput}
        >         
        </SearchBar>
        <AuthBox>
     <Text>Welcome User</Text>
      <AuthBtn
      text="Log Out"
      AuthClick={AuthLogClick}
      />
        </AuthBox>
      </FlexHeader>
{/* =================== HEADER ENDS =================== */}

      <FlexRow>
        <BttnCont width={width}>
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
      </FlexRow>
    </FlexCol>
  );
};

export default Header;
