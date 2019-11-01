import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    pushTodoIntoArray = (newItem) => {
        let newID = this.state.todos.length ? this.state.todos[this.state.todos.length - 1].id + 1 : 0;
        let newObj = { text: newItem, id: newID };
        this.setState({ todos: [...this.state.todos, newObj] })
    };

    removeTodo = (id) => {
        let todos = [...this.state.todos];
        let indexOfItem = todos.findIndex(function (todo) {
            return todo.id === id;
        });



        if (indexOfItem !== -1) {
            todos.splice(indexOfItem, 1);
            this.setState({ todos: todos });
        }
    }
    render() {
        return (
            <div>
                <MyForm onButtonPress={this.pushTodoIntoArray}></MyForm>
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
    render() {
        let names = this.props.todos;
        let items = names.map((name) => {

            return (
                <li key={name.id}>{name.text}
                    <span onClick={this.props.removeTodo.bind(null, name.id)}>CLICK ME</span>
                </li>
            )
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