import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import React from 'react';
import { useTheme } from "@/utils/provider";
import CommentForm from '@/comps/CommentForm';

import Comment from '@/comps/Comment';
import ReviewSection from '@/comps/ReviewSection';



export default function Home() {

  const {theme, setTheme} = useTheme();
  
  const Cont = styled.div`
  width: 100%;
  height: 100%;
`;

const [contacts, updateContacts] = useState([]);

const addContact = (contact) => {
  updateContacts([...contacts, contact]);
};


  return (
    <Cont>
    <ReviewSection></ReviewSection>
    <Comment contacts={contacts}/>
   
    <CommentForm addContact={addContact}>  </CommentForm>

    </Cont>
  )
}
