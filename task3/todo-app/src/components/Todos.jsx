import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Loading from './Loading';
import Error from '../pages/Error';
import Todo from './Todo';
import { useAxios } from '../hooks/useAxios';

const Todos = () => {
	const url = 'https://jsonplaceholder.typicode.com/todos';
	const [ displayTodos, setDisplayTodos ] = useState([]);
	const [ selectedFilter, setSelectedFilter ] = useState('all');
	const [ prevTodos, setPrevTodos ] = useState();
	const selectFilter = useRef();

	const { isLoading, isError, data } = useAxios(url);
	useEffect(
		() => {
			setDisplayTodos(data);
			setPrevTodos(data);
		},
		[ data ],
	);
	if (isLoading) return <Loading />;
	if (isError.error) return <Error />;

	const filterTodos = (e) => {
		console.log(e.target.value);
		if (e.target.value === 'completed') {
			const completeTodos = prevTodos.filter((todo) => todo.completed === true);
			const opt = selectFilter.current.options[selectFilter.current.options.selectedIndex].value;
			setSelectedFilter(opt);
			console.log(selectFilter.current.options[selectFilter.current.options.selectedIndex]);
			setDisplayTodos(completeTodos);
			return;
		}
		if (e.target.value === 'uncompleted') {
			const uncompleteTodos = prevTodos.filter((todo) => todo.completed === false);
			const opt = selectFilter.current.options[selectFilter.current.options.selectedIndex].value;
			setSelectedFilter(opt);
			setDisplayTodos(uncompleteTodos);
		} else {
			setSelectedFilter('all');
			setDisplayTodos(prevTodos);
		}
	};
	const deleteHandler = (id) => {
		const newDisplayTodos = displayTodos.filter((todo) => todo.id !== id);
		setDisplayTodos(newDisplayTodos);
		setPrevTodos(newDisplayTodos);
		if (displayTodos.length <= 1) {
			alert('The page will refresh you have deleted all content !');
			window.location.reload();
		}
	};
	const toggleTodoHandler = (id, completed) => {
		const newDisplayTodos = displayTodos.map((todo) => {
			if (todo.id === id) {
				let newCompleted = !completed;
				return { ...todo, completed: newCompleted };
			}
			return todo;
		});
		setPrevTodos(newDisplayTodos);
		setDisplayTodos(newDisplayTodos);
	};
	const handleSearch = (e) => {
		const { value } = e.target;
		if (!value) {
			const newDisplayTodos = [ ...prevTodos ];
			selectFilter.current.value = selectedFilter;
			setDisplayTodos(newDisplayTodos);
			return;
		}
		const newDisplayTodos = displayTodos.filter((todo) => todo.title.includes(value));
		setDisplayTodos(newDisplayTodos);
	};
	return (
		<main>
			<section>
				<article>
					<div className="search-options">
						<div className="search-todo">
							<input onChange={handleSearch} type="text" placeholder="Search..." />
						</div>
						<div className="drop-container">
							<label htmlFor="options">show todos :</label>

							<select ref={selectFilter} name="options" id="options" onChange={(value) => filterTodos(value)}>
								<option value="all">all</option>
								<option value="uncompleted">uncompleted</option>
								<option value="completed">completed</option>
							</select>
						</div>
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
