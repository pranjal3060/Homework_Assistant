import React, { Component } from 'react';

export default class Home extends Component {
    constructor() {
        super();
        this.text = "";
        this.array = [
            {question: "King James died in ____", answer: "1620"},
            {question: "I like ____", answer: "pizza"},
            {question: "Nico is ___", answer: "cool"},
            {question: "Cata ___", answer: "lit"},
        ]
    }
}
