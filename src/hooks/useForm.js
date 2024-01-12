import { useState } from "react"


const useForm = (initialStade={}) => {

    const resetValues=()=>{
        setvalues(initialStade);
    }


    const [values, setvalues] = useState(initialStade)

    const handleInputChange=({target})=>{
        //console.log(e.target);
        setvalues({
         ...values,
         [target.name]:target.value
        })
       } 
       return [values,handleInputChange,resetValues]; 

}

export default useForm