import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Cont = styled.div`
  width: 40%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 481px) and (max-width: 870px) {
    width: 80%;
  }

  @media only screen and (min-width: 1px) and (max-width: 480px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 3rem;
  border: solid 1px #b08584;
  border-radius: 30px;
  padding: 1rem 1.5rem;
  background-color: #fff;
  position: relative;
  margin-right: 2rem;
  box-sizing: border-box;

  @media only screen and (min-width: 1px) and (max-width: 870px) {
    // width: 80%;
    margin: 1rem;
  }
`;

const Bttn = styled.button`
  width: 24px; height: 24px;
  position: absolute;
  top: 50%;
  right: 52px;
  margin-top: -12px;
  border: none;
  cursor: pointer;
  background-image: url('/images/Icon_search.svg');
  background-repeat: no-repeat;
  transition: all 0.3s;

  @media only screen and (min-width: 1px) and (max-width: 870px) {
    right: 32px;
  }
`;

const SearchBar = ({ onClick = () => {} }) => {
  const r = useRouter();
  const [search, setSearch] = useState();

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
          setSearch(e.target.value);
        }}
      />
      <Link href={{ pathname: "/", query: { search: search } }}>
        <Bttn
          onClick={() => {
            if (r.pathname == "/") {
              onClick(search);
            }
          }}
        />
          {/* {" "}
          Search{" "}
        </Bttn> */}
      </Link>
    </Cont>
  );
};

export default SearchBar;
