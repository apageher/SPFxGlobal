import * as React from 'react';  
import { Route, NavLink } from 'react-router-dom';    
import {useParams} from 'react-router-dom';  
//const MyDetails = ({ match }) => <p>{match.params.name}</p>;    
const MyDetails = () => {  
    let { name } = useParams();  
    return <div>My Details With Paramter<br></br><b>{name}</b></div>;  
   };    
export default class MyNestedRoute extends React.Component {    
    public render(): React.ReactElement {    
        return (    
            <div>    
                <p>Contact Us Component</p>    
                <strong>Select contact name</strong>    
                <ul>    
                    <li><NavLink to="/MyRouteNewDetails/Madhan">Madhan</NavLink></li>    
                    <li><NavLink to="/MyRouteNewDetails/Thurai">Thurai</NavLink></li>    
                </ul>    
                <Route path="/MyRouteNewDetails/:name" component={MyDetails}></Route>    
            </div>    
        );    
    }    
}    