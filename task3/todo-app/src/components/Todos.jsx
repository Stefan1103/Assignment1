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
	const [ searchFilterState, setSearchFilterState ] = useState(null);
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
		if (e.target.value === 'completed') {
			const completeTodos = prevTodos.filter((todo) => todo.completed === true);
			const opt = selectFilter.current.options[selectFilter.current.options.selectedIndex].value;
			setSelectedFilter(opt);
			setSearchFilterState(completeTodos);
			setDisplayTodos(completeTodos);
			return;
		}
		if (e.target.value === 'uncompleted') {
			const uncompleteTodos = prevTodos.filter((todo) => todo.completed === false);
			const opt = selectFilter.current.options[selectFilter.current.options.selectedIndex].value;
			setSearchFilterState(uncompleteTodos);
			setSelectedFilter(opt);
			setDisplayTodos(uncompleteTodos);
		} else {
			const opt = selectFilter.current.options[selectFilter.current.options.selectedIndex].value;
			setSelectedFilter(opt);
			setSearchFilterState(prevTodos);
			setDisplayTodos(prevTodos);
		}
	};
	const deleteHandler = (id) => {
		const sameArr = getCommonElements(displayTodos, prevTodos);
		const newDisplayTodos = sameArr.filter((todo) => todo.id !== id);
		const deleteIdTodo = prevTodos.filter((todo) => todo.id !== id);

		const notCommonElements = getNotCommonElements(deleteIdTodo, newDisplayTodos);
		const newPrevTodos = [ ...newDisplayTodos, ...notCommonElements ];
		const newfilterState = searchFilterState ? searchFilterState.filter((todo) => todo.id !== id) : [ ...newPrevTodos ];
		setDisplayTodos(newDisplayTodos);
		setSearchFilterState(newfilterState);
		setPrevTodos(newPrevTodos);

		if (prevTodos.length <= 1) {
			alert('The page will refresh you have deleted all content !');
			window.location.reload();
		}
	};
	const toggleTodoHandler = (id, completed) => {
		const sameArr = getCommonElements(displayTodos, prevTodos);
		const newDisplayTodos = sameArr.map((todo) => {
			if (todo.id === id) {
				let newCompleted = !completed;
				return { ...todo, completed: newCompleted };
			}
			return todo;
		});
		const deleteIdTodo = prevTodos.filter((todo) => todo.id !== id);
		const notCommonElements = getNotCommonElements(deleteIdTodo, newDisplayTodos);
		const newPrevTodos = [ ...newDisplayTodos, ...notCommonElements ];
		const toggledTodo = newDisplayTodos.filter((todo) => todo.id === id);

		const newfilterState = searchFilterState
			? !completed ? searchFilterState.filter((todo) => todo.id !== id) : [ ...toggledTodo, ...searchFilterState ]
			: [ ...newPrevTodos ];
		setSearchFilterState(newfilterState);
		setPrevTodos(newPrevTodos);
		setDisplayTodos(newDisplayTodos);
	};
	const handleSearch = (e) => {
		const { value } = e.target;
		if (!value) {
			const newDisplayTodos = searchFilterState ? [ ...searchFilterState ] : [ ...prevTodos ];
			selectFilter.current.value = selectedFilter;
			setDisplayTodos(newDisplayTodos);
			return;
		}
		const newDisplayTodos = displayTodos.filter((todo) => todo.title.includes(value));
		setDisplayTodos(newDisplayTodos);
	};
	function getCommonElements(arr1, arr2) {
		return arr1.filter((element) => arr2.includes(element));
	}
	function getNotCommonElements(arr1, arr2) {
		return arr1.filter((element) => !arr2.includes(element));
	}
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
