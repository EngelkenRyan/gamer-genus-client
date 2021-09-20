import React from 'react';
import {
    Route,
    Switch,
    BrowserRouter as Router,
} from 'react-router-dom';
import SavedGamesMine from '../Components/Savedgames/SavedGamesMine'


type NavigationProps = {
    token: string,
    clearToken: () => void,
}

type NavigationVars = {
}

class Navigationbar extends React.Component<NavigationProps, NavigationVars> {
    constructor (props: NavigationProps) {
        super(props)
        this.state = {
        }
    };

    render() {
        return(
            <Switch>
            <Route exact path='/savedgamesmine'><SavedGamesMine token={this.props.token}/></Route>
            </Switch>
        )
    }
    }



export default Navigationbar; 