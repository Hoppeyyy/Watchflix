import styled from "styled-components";
import Head from "next/head";
import { useEffect, useState} from "react";
import { useTheme, useResult} from "@/utils/provider";
import { useRouter } from "next/router";
import ax from "axios";
import { v4 as uuidv4 } from "uuid";
import { setRequestMeta } from "next/dist/server/request-meta";
import Auth from '../comps/Auth'
import Header from "@/comps/Header";

export default function Comptest(){
  return(
    <div>
      <Header/>
    </div>
  );
}