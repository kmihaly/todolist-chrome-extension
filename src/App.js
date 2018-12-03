import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import TextInput from "./components/TextInput";
import ToDoList from './components/ToDoList';
import './App.css';

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
  
	return result;
  };

class App extends Component {

	state = {
		todos: [],
		idCount: '0',
	}

	onDragEnd(result) {
		console.log('ondragend called');
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const todos = reorder(
            this.state.todos,
            result.source.index,
            result.destination.index
        );

        this.setState(
			{ todos, }
		);
		
		localStorage.setItem('todos', JSON.stringify(todos));
    }


	createTodo(toDoName) {
		this.setState(
			prevState => {
				const newToDos = prevState.todos.slice().concat({
					name: toDoName,
					id: prevState.idCount
				});

				localStorage.setItem('todos', JSON.stringify(newToDos));
				localStorage.setItem('idCount', JSON.stringify(prevState.idCount + 1));
				console.log('new id: ' + prevState.idCount);


				return {
					todos: newToDos,
					id: prevState.idCount++,
				};
			}
		)
	}

	deleteToDo(currentId) {
		this.setState(
			(prevState) => {
				const newToDos = prevState.todos.slice().filter(el => el.id !== currentId)
				
				localStorage.setItem('todos', JSON.stringify(newToDos));

				return {
					todos: newToDos,
				}
			}
		);
	}

	componentDidMount() {
		const todos = JSON.parse(localStorage.getItem('todos')) || [];
		const idCount = localStorage.getItem('idCount') || 0;
		this.setState({
			todos,
			idCount
		});
	}

	render() {
		return (
			<div className='App Basicbgr'>
				<Card className='main-container'>
					<TextInput 
						handleSubmit={this.createTodo.bind(this)}
					/>
					{/* <button onClick={this.createTodo.bind(this, this.state.input)}>ADD TODO</button> */}
					<ToDoList 
						data={this.state.todos} 
						handleClick={this.deleteToDo.bind(this)} 
						onDragEnd={this.onDragEnd.bind(this)}
					/>
				</Card>
			</div>
		);
	}
}

export default App;
