import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    pushItemIntoArray = (newItem) => {
        this.setState({ todos: [...this.state.todos, newItem] })
    };

    removeTodo = (event) => {
        let todos = [...this.state.todos];
        let indexOfItem = todos.indexOf(event.target.textContent)

        if (indexOfItem !== -1) {
            todos.splice(todos, 1);
            this.setState({ todos: todos });
        }
    }

    render() {
        return (
            <div>
                <MyForm onButtonPress={this.pushItemIntoArray}></MyForm>
                <List todos={this.state.todos} removeTodo={this.removeTodo}></List>
            </div>
        )
    }
};

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newValue: ''
        };
    }

    storeCurrentUserInput = (event) => {
        let newValue = event.target.value;
        this.setState({ newValue: newValue })
    };

    sendValueToApp = (e) => {
        this.props.onButtonPress(this.state.newValue);
        this.setState({ newValue: '' })
        e.preventDefault();
    }

    render() {
        return (
            <form>
                <h1>Hello</h1>
                <p>Enter your todo:</p>
                <input
                    type="text"
                    onChange={this.storeCurrentUserInput}
                    value={this.state.newValue}
                />
                <button onClick={this.sendValueToApp}></button>
            </form>
        )
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let names = this.props.todos;
        let items = names.map((name, index) => {
            return <li onClick={this.props.removeTodo} key={index}>{name}</li>;
        })
        return (
            <ul>
                {
                    names.length > 0 ?
                        items
                        : null
                }
            </ul>
        )
    }
};

ReactDOM.render(
    <App />
    ,
    document.getElementById('root')
);