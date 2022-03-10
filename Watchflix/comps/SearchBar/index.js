import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
const Cont = styled.div`
  width: 40%;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 3rem;
  border: solid 1px #b08584;
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
`;

const Bttn = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
`;

const SearchBar = ({ 
  onChange = () => {},
  onClick = () => {},
}) => {
  
  const r = useRouter();
  const [search, setSearch] = useState()
   
    return (
      <Cont action="/?searh=movie" method="get">
        <label htmlFor="header-search">
          <span className="visually-hidden">
            Search for a Movie Title or Genre...
          </span>
        </label>
        <SearchInput
          type="text"
          id="header-search"
          placeholder="Search for a Movie Title or Genre..."
          name="s"
          onChange={(e) => {
            setSearch(e.target.value)
          }}         
        />
        <Link href={{pathname:'/', query:{search:search}}}>
        <Bttn onClick={
          ()=>{
            if(r.pathname == '/'){
            onClick(search)
            }
          }
        }> Search </Bttn>
          </Link>
        
      </Cont>
    );
};

export default SearchBar;
