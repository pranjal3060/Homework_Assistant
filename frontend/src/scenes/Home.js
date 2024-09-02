import React, { Component } from 'react';
import axios from "axios/index";

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            text: ""
        }
    }

    submit() {
        this.props.app.text = this.state.text;
        axios.post('http://localhost:5000/post?string=' + this.state.text)
            .then(function (response) {
                alert("Loaded");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="App">
                <br/>
                <p>Welcome to Homework Helper! Paste your notes below :)</p>
                <textarea style={{width:"50vw", height:"40vh"}} value={this.state.text} onChange={e => this.setState({text: e.target.value})}/>
                <br/>
                <button onClick={() => this.submit()}>Submit</button>

            </div>
        );
    }
}


