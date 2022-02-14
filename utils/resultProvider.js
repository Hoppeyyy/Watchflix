import {useContext, createContext, useState} from 'react';



//the variables you want to provide to all the pages/components wrapped around this provider
const initialStates = {
    result:{},
    setResult:()=>{},
}

const MyContext = createContext(initialStates);

export default function AppProvider({children}){

    const [result,setResult] = useState({});
    console.log("Result",result);
    return <MyContext.Provider value={{result,setResult}}>
        {children}
    </MyContext.Provider>
}

//use the Context to create Hooks like useTheme
export function useResult(){
    const {result, setResult} = useContext(MyContext);
    return{result, setResult};
}