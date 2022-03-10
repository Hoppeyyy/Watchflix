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
  margin-left:5px;
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
  background-color: ${props => props.bkColor};
  min-width:  ${props => props.minWidth}rem;
  max-width: ${props => props.maxWidth}rem;
  border: none;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;

  :hover {
    transform: scale(0.95);
    transition-duration: 0.3s;
  }
`;


const FilterBttn = ({
  onAscClick = () => {},
  onRateClick = () => {},
  ascBkColor = null,
  rateBkColor = null,
  ascChildren = null,
  rateChildren = null,
  minWidthL = 8,
  maxWidthL = 8,
  minWidthR = 9.75,
  maxWidthR = 10,
}) => {

  return (
    <List>
      <ListItem>
        <Bttn
          onClick={onAscClick}
          bkColor={ascBkColor}
          maxWidth={maxWidthL}
          minWidth={minWidthL}
        >
          {ascChildren}
        </Bttn>
      </ListItem>
      <ListItem>
        <Bttn
          onClick={onRateClick}
          bkColor={rateBkColor}
          maxWidth={maxWidthR}
          minWidth={minWidthR}
        >          
          {rateChildren}
        </Bttn>
      </ListItem>
    </List>
  );
};

export default FilterBttn;
