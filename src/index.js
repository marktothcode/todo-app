import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    pushItemIntoArray = (newItem) => {      
        this.setState({ todos: [...this.state.todos, newItem]})                    
    };
    render() {
        return (
        <div>
        <MyForm onButtonPress={this.pushItemIntoArray}></MyForm>
        <List todos={this.state.todos}></List>
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
        this.setState({newValue : ''})
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
                    value = {this.state.newValue}
                />
                <button onClick={this.sendValueToApp}></button>
            </form>

        )
    }
}

class List extends React.Component {
    render() {
        let names = this.props.todos;
        return (
            <ul>
                {names.map(function(name, index){
                    return <li onClick={console.log('it has been clicked')} key={ index }>{name}</li>;
                  })}
            </ul>
        )
    }
};

ReactDOM.render(
    <App>       
    </App>    
    ,
    document.getElementById('root')
);