import Head from "next/head";
import ax from "axios";
import { useState } from "react";
import styled from "styled-components";

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  :last-child {
    margin-right: 0;
  }

  @media only screen and (max-width:680px) {
    margin-bottom: 1rem;
    justify-content: center;
  }
`;

const ListItem = styled.li` 
  margin-right: ${props => props.marginR}px;
  :last-child {
    margin-right: 0;
  }
`;

const Bttn = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${props => props.bkColor};
  min-width:  9rem;
  max-width: 10rem;
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
  marginR = 30,
  onAscClick = () => {},
  onRateClick = () => {},
  ascBkColor = null,
  rateBkColor = null,
  ascChildren = null,
  rateChildren = null,
}) => {

  return (
    <List>
      <ListItem marginR={marginR}>
        <Bttn
          onClick={onAscClick}
          bkColor={ascBkColor}
        >
          {ascChildren}
        </Bttn>
      </ListItem>
      <ListItem>
        <Bttn
          onClick={onRateClick}
          bkColor={rateBkColor}
        >          
          {rateChildren}
        </Bttn>
      </ListItem>
    </List>
  );
};

export default FilterBttn;
