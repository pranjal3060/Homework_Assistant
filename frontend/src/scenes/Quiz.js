import React, { Component } from 'react';
import axios from 'axios';

export default class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            array: [],
            showAnswers: false,
            finished: false
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:5000/get`)
            .then(res => {
                this.setState({
                    array: res.data,
                    answers: res.data.map(obj => null),
                    results: res.data.map(obj => false),
                });
            });
    }

    addToArray(val, index) {
        var copy = this.state.answers;
        copy[index] = val;
        this.setState({
            answers: copy
        });
        this.submitAnswers();
    }

    submitAnswers() {
        this.setState({
            results: this.state.array.map((obj, i) => this.state.answers[i] !== null && obj.answer.toLowerCase() === this.state.answers[i].toLowerCase())
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.results && this.state.results.filter(obj => obj).length === this.state.results.length && <p>You win</p>}
                <div className="Quiz">
                    <table>
                        <tr>
                            <th>Question</th>
                            <th>Result</th>
                            {this.state.showAnswers && <th>Answer</th>}
                        </tr>
                    {this.state.array.map((obj, i) => {
                        var width = (this.state.array[i].answer.length * 8);
                        var split = obj.question.split("_____");
                        return <tr>
                            <td>
                                <label>{split[0]}</label>
                                <textarea onChange={e => this.addToArray(e.target.value, i)} style={{resize: 'none', width: width + "px", height:"15px"}}/>
                                <label>{split[1]}</label>
                            </td>
                                <td style={{width: 100}}>{this.state.results[i] ? "Correct" : ""}</td>
                                {this.state.showAnswers && <td style={{width: 100}}>{obj.answer}</td>}
                        </tr>
                    })}
                    </table>
                    <br/>
                    <button style={{width: '100%'}} onClick={() => this.setState({showAnswers: !this.state.showAnswers})}>{this.state.showAnswers ? "Hide answers" : "Show answers"}</button>
                </div>
            </div>
        );
    }
}