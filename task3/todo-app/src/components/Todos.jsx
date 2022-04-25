import React from 'react';
import { useState, useEffect } from 'react';
import Loading from '../pages/util/Loading';
import Error from '../pages/util/Error';
import Todo from './Todo';
import { useAxios } from '../hooks/useAxios';

const Todos = () => {
	const url = 'https://jsonplaceholder.typicode.com/todos';
	const [ displayTodos, setDisplayTodos ] = useState([]);

	const { isLoading, isError, data } = useAxios(url);
	useEffect(
		() => {
			setDisplayTodos(() => {
				return data;
			});
		},
		[ data ],
	);
	if (isLoading) return <Loading />;
	if (isError.error) return <Error />;

	const filterTodos = (e) => {
		console.log(e.target.value);
		if (e.target.value === 'completed') {
			const completeTodos = data.filter((todo) => todo.completed === true);
			console.log(completeTodos);
			setDisplayTodos(completeTodos);
			return;
		}
		if (e.target.value === 'uncompleted') {
			const uncompleteTodos = data.filter((todo) => todo.completed === false);
			console.log(uncompleteTodos);
			setDisplayTodos(uncompleteTodos);
			return;
		} else {
			setDisplayTodos(data);
			return;
		}
	};
	const deleteHandler = (id) => {
		const newDisplayTodos = displayTodos.filter((todo) => todo.id !== id);
		setDisplayTodos(newDisplayTodos);
		console.log(displayTodos);
	};
	const toggleTodoHandler = (id, completed) => {
		const newDisplayTodos = displayTodos.map((todo) => {
			if (todo.id === id) {
				let newCompleted = !completed;
				return { ...todo, completed: newCompleted };
			}
			return todo;
		});
		setDisplayTodos(newDisplayTodos);
	};
	return (
		<main>
			<section>
				<article>
					<div className="drop-container">
						<label htmlFor="options">show todos :</label>

						<select name="options" id="options" onChange={(value) => filterTodos(value)}>
							<option value="all">all</option>
							<option value="uncompleted">uncompleted</option>
							<option value="completed">completed</option>
						</select>
					</div>
					<div className="todo-list-container">
						{displayTodos.map((user) => {
							return <Todo key={user.id} toggleTodoHandler={toggleTodoHandler} deleteHandler={deleteHandler} {...user} />;
						})}
					</div>
				</article>
			</section>
		</main>
	);
};

export default Todos;