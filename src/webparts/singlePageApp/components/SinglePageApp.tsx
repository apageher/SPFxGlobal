import * as React from 'react';
import styles from './SinglePageApp.module.scss';
import { Route, Link, Switch, BrowserRouter as Router, HashRouter } from 'react-router-dom';
import { ISinglePageAppProps } from './ISinglePageAppProps';
import PageNotFound from './PageNotFound';
import MyHome from './MyHomeComponent';
import MYDetails from './Details';
import MYDetailsWithParam from './DetailsWithParameter';
import MyRouteMatch from './MyRouteMatch';
import MyNestedRoute from './NestedRoute';

export default class SinglePageApp extends React.Component<ISinglePageAppProps, {}> {
  public render(): React.ReactElement<ISinglePageAppProps> {
    return (
      <div className={styles.singlePageApp}>
        <div className={styles.container}>
          <HashRouter>
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav mr-auto">
                  <li><Link to={'/'} className="nav-link"> MY Home </Link></li>
                  <li><Link to={'/MyDetails'} className="nav-link">My Details</Link></li>
                  <li><Link to={'/MyDetailsParam'} className="nav-link">My Details with Parameter</Link></li>
                  <li><Link to={'/MyRoutemtch'} className="nav-link">My Route Match</Link></li>
                  <li><Link to={'/MyRouteNewDetails'} className="nav-link">My Route New Details</Link></li>
                </ul>
              </nav>
              <hr />
              <Switch>
                <Route sensitive exact path="/" component={MyHome} />
                <Route path="/MyDetails" component={(props) => <MYDetails text="Hello, " {...props} />} />
                {/*   
            <Redirect from="/old-route" to="/new-route" /> 
          <Route 
            exact 
            path="/props-through-render" 
            render={props => ( 
              <PropsPage {...props} title={`Props through render`} /> 
            )} 
          /> 
           
          */}
                <Route path="/MyDetailsParam/:name" component={MYDetailsWithParam} />
                <Route path="/MyRoutemtch/:name" component={MyRouteMatch} />
                <Route path="/MyRouteNewDetails" component={MyNestedRoute} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          </HashRouter>
        </div>
      </div>
    );
  }
}  