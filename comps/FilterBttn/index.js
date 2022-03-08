import Head from "next/head";
import ax from "axios";
import { useState } from "react";
import styled from "styled-components";

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  :last-child {
    margin-right: 0;
  }
`;

const ListItem = styled.li`
  width: 100%;  
  // margin-right: 2%;
  // :last-child {
  //   margin-right: 0;
  // }
`;

const Bttn = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.bkColor};
  min-width: 6rem;
  max-width: ${props => props.mwidth}rem;
  border: none;
  border-radius: 12px;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);

  :hover {
    cursor: pointer;
  }
`;

var timer = null;

const FilterBttn = ({
  onAscClick = () => {},
  onRateClick = () => {},
  ascBkColor = null,
  rateBkColor = null,
  ascChildren = null,
  rateChildren = null,
  mAWidth = 8,
  mDWidth = 10,

}) => {
  const [data, setData] = useState([]);
  const [sbr, setSbr] = useState(false);
  const [sbr_type, setSbrType] = useState("asc");
  const [director, setDirector] = useState(false);

  return (
    <List>
      {/* <input onChange={(e)=>inputFilter(e.target.value)} />
      <button style ={{backgroundColor:sbr?"pink":"white"}} onClick ={()=>setSbr(!sbr)}>Sort By Ratings</button> */}
      <ListItem>
        <Bttn
          // onClick={() => setSbrType(sbr_type === "asc" ? "desc" : "asc")}
          onClick={onAscClick}
          bkColor={ascBkColor}
          mwidth={mAWidth}
        >
          {ascChildren}
        </Bttn>
      </ListItem>
      <ListItem>
        <Bttn
          // style={{ backgroundColor: director ? "green" : "white" }}
          onClick={onRateClick}
          bkColor={rateBkColor}
          // onClick={() => setDirector(!director)}
          mwidth={mDWidth}
        >          
          {rateChildren}
        </Bttn>
      </ListItem>
    </List>
  );
};

export default FilterBttn;
