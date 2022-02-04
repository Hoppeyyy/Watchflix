import Head from 'next/head';
import ax from 'axios';
import styled from 'styled-components';

const Cont = styled.div`
  width: ${props => props.conWidth};
  display: flex;
  flex-direction: row;
  justify-contents: flex-start;
  align-items: center;
`

const Rect = styled.div`
  width: 6px; height: 28px;
  border-radius: 10px;
  background-color: #E50914;
  margin-right: 10px;
`

const Title = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin: 0; padding: 0;
`

const 

const DetailTit = ({
  conWidth = "100%",
  title = "Alive"


}) => {

  return (
    <Cont
      width = {conWidth}
    >
      <Rect />

      <Title>
        {title}
      </Title>




    </Cont>
  )
}

export default DetailTit;
