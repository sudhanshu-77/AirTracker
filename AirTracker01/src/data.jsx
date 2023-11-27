import { createContext, useContext, useState } from "react"

const DataContext = createContext()
const DataProvider = ({children})=>{
    const [data,setData] = useState([])
    const [dataw,setDataw] = useState([])
return(
 <>
 <DataContext.Provider value={{data,setData,dataw,setDataw}}>
    {children}
 </DataContext.Provider>
 </>   
)
}
const useData = () => useContext(DataContext)
export {useData,DataProvider}