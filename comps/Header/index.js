import styled from "styled-components";
import Image from 'next/image';
import logo from '@/public/images/watchflix_logo.png';
import * as React from 'react';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Search, Radio, Button, Icon, Input } from "semantic-ui-react";
import { FormControl } from "@mui/material";


const FlexRow = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
`

const FlexCol = styled.div`
  display:flex;
  flex-direction:column;
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

  onInputChange=()=>{},
}) => {
  const [genreName, setGenreName] = React.useState([]);
  const handleGenre = (event) => {
    const {
      target: { value },
    } = event;
    setGenreName(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const [ratingName, setRatingName] = React.useState([]);
  const handleRating = (event) => {
    const {
      target: { value }
    } = event;
    setRatingName(
      typeof value === 'string' ? value.split(',') : value
    );
  }

  const [countryName, setCountryName] = React.useState([]);
  const handleCountry = (event) => {
    const {
      target: { value }
    } = event;
    setCountryName(
      typeof value === 'string' ? value.split(',') : value
    );
  }

  const [sortbyName, setSortbyName] = React.useState([]);
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
  const [dur, setDur] = React.useState([60, 80]);
  const handleDur = (event, newDur) => {
    setDur(newDur)
  }



  return (
    <FlexCol>
      <FlexRow>
        <Image src={logo} alt="Watchflix logo" width={182} height={45}/>
        <Search onChange={onInputChange}/>
        <Input icon='search' type='text' placeholder='Search...'/>
        <Switch/>
        <Radio toggle/>
        <Button.Group
          buttons={[
            {key: "a", icon: 'grid layout'},
            {key: "a", icon: 'list'},
          ]}/>
      </FlexRow>
      <FlexRow>  

        <FormControl sx={{ width: 300 }}>     
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
        <FormControl>
          <InputLabel id='select-duration'>Duration</InputLabel>
          <Select 
            sx={{width: 100}}
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

        <FormControl sx={{ width: 200 }}>     
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

        <FormControl sx={{ width: 200 }}>     
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

        <FormControl sx={{ width: 200 }}>     
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
                {/* <ListItemText primary={rating}/> */}
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