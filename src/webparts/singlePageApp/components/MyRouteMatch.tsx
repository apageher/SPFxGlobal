import {useRouteMatch,} from 'react-router-dom';  
import * as React from 'react';  
export default function MyRouteMatch(props) {  
    let match = useRouteMatch("/MyRoutemtch/:name");  
    return <div>My Details With Paramter{match.params.name}</div>;  
  }  