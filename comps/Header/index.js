import styled from 'styled-components';
import Image from 'next/image';
import logo from '@/public/images/watchflix_logo.png';
import ax from 'axios'
import { useState } from 'react';
import { TextField, Switch, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Box, Slider, FormControl, InputAdornment, IconButton } from '@mui/material';
import { bgpopup, popuptext } from '@/utils/variables';
import { useTheme } from '@/utils/provider';
//import SearchIcon from '@mui/icons-material/Search';
import { Search, Radio, Button, Icon } from 'semantic-ui-react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import GridOnIcon from '@mui/icons-material/GridOn';
import WindowIcon from '@mui/icons-material/Window';

const FlexHeader = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin:10px;
`

const FlexRow = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:${props=>props.rowbg};
  flex:1;
`

const FlexCol = styled.div`
  display:flex;
  flex-direction:column;
  background-color:${props=>props.colbg};
`

const DurationCont = styled.div`
  min-width:300px;
  margin:25px 15px 0 15px;
`;

const genre = [
  "Documentaries",
  "Children & Family Movies",
  "Dramas"
]

const rating = [
  "TV-MA",
  "TV-14",
  "R",
  "TV-PG",
  "PG-13"
]

const country = [
  "Canada"
]

const sortby = [
  "Date (newest)",
  "Date (oldest)",
  "Alphabet A-Z",
  "Alphabet Z-A",
  "Most Reviews"
]


const Header = ({
  rowbg = bgpopup,
  colbg = bgpopup,
  onInput = (event) => {},
  changeView = () => {},
  changeColor = () => {},
}) => {
  const { theme } = useTheme();

  const [genreName, setGenreName] = useState([]);
  const handleGenre = (event) => {
    const {
      target: { value },
    } = event;
    setGenreName(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const [ratingName, setRatingName] = useState([]);
  const handleRating = (event) => {
    const {
      target: { value }
    } = event;
    setRatingName(
      typeof value === 'string' ? value.split(',') : value
    );
  }

  const [countryName, setCountryName] = useState([]);
  const handleCountry = (event) => {
    const {
      target: { value }
    } = event;
    setCountryName(
      typeof value === 'string' ? value.split(',') : value
    );
  }

  const [sortbyName, setSortbyName] = useState([]);
  const handleSortby = (event) => {
    const {
      target: { value }
    } = event;
    setSortbyName(
      typeof value === 'string' ? value.split(',') : value
    );
  }

  function duration(dur) {
    return `${dur} minutes`;
  }
  const [dur, setDur] = useState([60, 80]);
  const handleDur = (event, newDur) => {
    setDur(newDur)
  }

  return (
    <FlexCol colbg={colbg[theme]}>

      <FlexHeader>
        <Image src={logo} alt='Watchflix logo' width={144} height={36} objectPosition="center"/>
          <TextField 
            label='Start your search here'
            variant='outlined' 
            size='small' 
            sx={{ml:3, width: '50%'}}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='search' edge='end'/>
              </InputAdornment>
            }
            onChange={(event) => onInput(event.target.value)}
          />
          <SearchIcon/>
        <FlexRow rowbg={rowbg[theme]}>
          <WbSunnyIcon/>
            <Switch onChange={changeColor}/>
          <Brightness2Icon/>
            <Box sx={{width:20}}/>
          <GridOnIcon/>
            <Switch onChange={changeView}/>
          <WindowIcon/>
        </FlexRow>
      </FlexHeader>

      <FlexRow>  

        <FormControl size='small' sx={{width: '20%'}}>     
          <InputLabel id='select-genre'>Genre</InputLabel>
          <Select
            labelId='select-genre'
            multiple
            value={genreName}
            onChange={handleGenre}
            input={<OutlinedInput label='Genre'/>}
            renderValue={(selected) => selected.join(', ')}
          >
            {genre.map((genre) => (
              <MenuItem key={genre} value ={genre}>
                <Checkbox checked={genreName.indexOf(genre) > -1 } />
                <ListItemText primary={genre}/>
              </MenuItem>
            ))}
            <FlexRow>
              <Button>Clear</Button>
              <Button>Apply</Button>
            </FlexRow>
          </Select>
        </FormControl>

        {/* https://mui.com/components/slider/#minimum-distance */}
        <FormControl size='small' sx={{width: '20%'}}>
          <InputLabel id='select-duration'>Duration</InputLabel>
          <Select 
            labelId='select-duration'
            multiple
            value={dur}
            onChange={handleDur}
            input={<OutlinedInput label='Duration'/>}
            renderValue={(selected) => selected.join(' - ')}
          >
            <DurationCont>
              <Slider
                value={dur}
                onChange={handleDur}
                valueLabelDisplay='auto'
                getAriaValueText={duration}
              />
            </DurationCont>
            <FlexRow>
              <Button>Clear</Button>
              <Button>Apply</Button>
            </FlexRow>
          </Select>
        </FormControl>

        <FormControl size='small' sx={{width: '20%'}}>     
          <InputLabel id='select-rating'>Rating</InputLabel>
          <Select
            labelId='select-rating'
            multiple
            value={ratingName}
            onChange={handleRating}
            input={<OutlinedInput label='Rating'/>}
            renderValue={(selected) => selected.join(', ')}
          >
            {rating.map((rating) => (
              <MenuItem key={rating} value ={rating}>
                <Checkbox checked={ratingName.indexOf(rating) > -1 } />
                <ListItemText primary={rating}/>
              </MenuItem>
            ))}
            <FlexRow>
              <Button>Clear</Button>
              <Button>Apply</Button>
            </FlexRow>
          </Select>
        </FormControl>

        <FormControl size='small' sx={{width: '20%'}}>     
          <InputLabel id='select-country'>Country</InputLabel>
          <Select
            labelId='select-country'
            multiple
            value={countryName}
            onChange={handleCountry}
            input={<OutlinedInput label='Country'/>}
            renderValue={(selected) => selected.join(', ')}
          >
            {country.map((country) => (
              <MenuItem key={country} value ={country}>
                <Checkbox checked={countryName.indexOf(country) > -1 } />
                <ListItemText primary={country}/>
              </MenuItem>
            ))}
            <FlexRow>
              <Button>Clear</Button>
              <Button>Apply</Button>
            </FlexRow>
          </Select>
        </FormControl>

        <FormControl size='small' sx={{width: '20%'}}>     
          <InputLabel id='select-sortby'>Sort By...</InputLabel>
          <Select
            labelId='select-sortby'
            // multiple
            value={sortbyName}
            // label='Sort By'
            onChange={handleSortby}
            input={<OutlinedInput label='Sortby'/>}
            // renderValue={(selected) => selected.join(', ')}
          >
            {sortby.map((sortby) => (
              <MenuItem key={sortby} value ={sortby}>
                <ListItemText primary={sortby}/>
              </MenuItem>
            ))}
            <FlexRow>
              <Button>Clear</Button>
              <Button>Apply</Button>
            </FlexRow>
          </Select>
        </FormControl>

      </FlexRow>
    </FlexCol>
  )
}

export default Header