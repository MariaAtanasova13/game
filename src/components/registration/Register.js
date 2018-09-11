import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import { Link, withRouter } from 'react-router-dom';
import {lightGreen700} from 'material-ui/styles/colors';
import {lightGreen900} from 'material-ui/styles/colors';
import { auth } from '../../firebase';
import * as Routes from '../constants/Routes';
import { componentDidMount } from 'react-lifecycle-hoc';
import * as firebase from 'firebase';


const SignUpPage = ({ history }) =>
    <div>
        <Register history={history} />
    </div>

const INITIAL_STATE = {
    name:'',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    phone:'',
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class Register extends Component {



    constructor (props) {
        super(props);
        this.state = { ...INITIAL_STATE };

    }


    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        const rootRef = firebase.database();
        const post = rootRef.ref('users');
        var data ={
            name:this.state.name,
            username:this.state.username,
            email:this.state.email
        }
        post.push(data);

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(Routes.MENU);

            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            name,
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
        <div className="row">
            <div className="col-lg-3"/>
            <div className="col-lg-6">
                    <div className="screenreg">
                        <div className="row">
                            <header className="header">
                                <h1>Registration</h1>
                            </header>
                            <div className="col-lg-3"/>
                            <div className="col-lg-6">
                                <input className="inputform"
                                       value={this.state.name}
                                       onChange={event => this.setState(byPropKey('name', event.target.value))}
                                       type="text"
                                       placeholder="Enter your Full Name"
                                />
                                <br/>
                                <input className="inputform"
                                       value={this.state.username}
                                       onChange={event => this.setState(byPropKey('username', event.target.value))}
                                       type="text"
                                       placeholder="Enter your Username"
                                />
                                <br/>
                                <input className="inputform"
                                       value={this.state.email}
                                       onChange={event => this.setState(byPropKey('email', event.target.value))}
                                       type="email"
                                       placeholder="Enter your Email"
                                     />
                                <br/>
                                <input className="inputform"
                                       value={passwordOne}
                                       onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                                       type="password"
                                       placeholder="Enter your Password"
                                     />
                                <br/>
                                <input className="inputform"
                                       value={passwordTwo}
                                       onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                                       type="password"
                                       placeholder="Confirm Password"
                                />
                                <br/>
                                    <button className="button"
                                            disabled={isInvalid}
                                            type="submit">
                                        <img src={require("./woodsign.png")}
                                             width="150"
                                             height="80"
                                             >
                                        </img>
                                        <div className="centered">Submit</div>
                                    </button>
                            </div>
                            <div className="col-lg-3"/>
                        </div>
                        { error && <p>{error.message}</p> }
                    </div>
            </div>
            <div className="col-lg-3"/>
        </div>

            </form>
        );
    }
}





export default withRouter(SignUpPage);

export {
    Register,
};