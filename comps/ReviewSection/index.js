import styled from "styled-components";
import ax from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@/utils/provider";
import Comment from "../Comment";
import Image from "next/image";
import down_arrow from "@/public/images/down-arrow.png";
import up_arrow from "@/public/images/up-arrow.png";
import CommentForm from "../CommentForm";
import { v4 as uuidv4 } from "uuid";
import { bkColor, hovColor, basicColor, divcolor } from "@/utils/variables";
import Divider from "../Divider";

const arrows = { down_arrow, up_arrow };

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  aligh-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const LeftLine = styled.hr`
  margin: 0px;
  background-color: ${(props) => props.bkcolor};
  border-radius: 10px;
  border: none;
  flex: 1;
  height: 20px;
`;

const RightLine = styled.hr`
  margin: 0px;
  background-color: ${(props) => props.bkcolor};
  border-radius: 10px;
  border: none;
  flex: 6;
  height: 20px;
`;

const HeaderCont = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Title = styled.h3`
  padding-left: 20px;
  padding-right: 20px;
  flex: 1.5;
  color: ${(props) => props.color};
`;

const Dropdown = styled.div`
  font-size: 30px;
  padding-right: 20px;
  cursor: pointer;
`;

const CmtCont = styled.div`
  width: 100%;

`;

const UserComments = styled.ul``;

const PostBtn = styled.button`
  width: 100px;
  height: 30px;
`;

const CommentBox = styled.input`
  width: 100px;
  height: 50px;
`;

const ReviewSection = ({
  text = "Reviews",
  down = down_arrow,
  up = up_arrow,
}) => {
  const [open, setOpen] = useState(true);
  const { theme, setTheme } = useTheme();
  const onClick = () => setOpen(!open);

  // const [selected, setSelected] = useState(arrows.down_arrow)
  // const onArrowClick = () => setSelected(!selected)

  const [items, setItems] = useState([]);

  const createItems = () => {
    setItems((oldItems) => [
      ...oldItems,
      {
        id: 1,
        title: "new item",
        itemId: uuidv4(),
      },
    ]);
  };

  const [value, setValue] = useState("");

  const saveValue = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Cont>
      <HeaderCont>
        <LeftLine bkcolor={divcolor[theme]}></LeftLine>
        <Title color={basicColor[theme]}>{text}</Title>
        {/* <Dropdown onClick={onClick}>&#x25BC;</Dropdown> */}

        <Dropdown>
          {open ? (
            <Image
              src={down_arrow}
              width={33}
              height={18}
              onClick={onClick}
            ></Image>
          ) : (
            <Image
              src={up_arrow}
              width={33}
              height={18}
              onClick={onClick}
            ></Image>
          )}
        </Dropdown>
        <RightLine bkcolor={divcolor[theme]}></RightLine>
      </HeaderCont>

      <CmtCont>
        <form onSubmit={onSubmit}>
          <UserComments>
            {items.map((item) => (
              <Comment comment={value} key={item.id}>
                {"subtitle"}
              </Comment>
            ))}

            {open ? <Comment /> : null}
          </UserComments>

          {/* <CommentBox value={value} 
        onChange={e=>{setValue(e.currentTarget.value)}} 
        > */}

          <Divider text="Add review" />

          <CommentBox value={value} onChange={saveValue}></CommentBox>
          <PostBtn type="submit" onClick={createItems}>
            Post
          </PostBtn>
        </form>
      </CmtCont>

      {/* <CommentForm></CommentForm> */}
    </Cont>
  );
};

export default ReviewSection;
