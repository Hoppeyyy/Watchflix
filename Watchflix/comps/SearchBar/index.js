import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@/utils/provider";
import Link from "next/link";
import { inputFocus} from "@/utils/variables";


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
  background: #fff;
  position: relative;
  box-sizing: border-box;

  : focus {
    background-color: ${props => props.inFocus} ;
  }

  @media only screen and (min-width: 1px) and (max-width: 870px) {
    margin: 1rem;
  }
`;

const Bttn = styled.button`
  width: 24px; height: 24px;
  position: absolute;
  top: 50%;
  right: 2rem;
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
  const { theme, setTheme } = useTheme();

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
        inFocus = {inputFocus[theme]}
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
