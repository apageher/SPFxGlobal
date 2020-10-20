import * as React from 'react';  
import {useParams } from "react-router-dom";  
   const MYDetailsWithParam = () => {  
    let { name } = useParams();  
    return <div>My Details With Paramter<br></br><b>{name}</b></div>;  
   };  
   export default MYDetailsWithParam; 