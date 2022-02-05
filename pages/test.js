import styled from 'styled-components'
import HMovie from '../comp/HMovie'
import Head from 'next/head'

const Cont = styled.div`
width:100%;
height:100%;
`
export default function Test() {
  return (
    <Cont>
      <HMovie
      bgcolor="#F9E7E7"
      title="Movie Title"
      year="Year"
      contry="Country"
      text="Movie description"
      />
      <HMovie
      bgcolor=""
      />
    </Cont>
  )
}
