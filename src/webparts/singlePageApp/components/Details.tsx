import * as React from 'react';  
export default class MYDetails  extends React.Component {    
    constructor(props) {  
        super(props);  
      }  
    public render(): React.ReactElement {  
       // const {text, match: {params}} = this.props;  
      console.log(this.props) ;  
        return (  
          <div>  
          <h1>My Details Component</h1>  
          </div>  
        );  
      }   
}  