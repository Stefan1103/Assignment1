import React from 'react';
import { Link } from 'react-router-dom';

const Todo = ({ userId, id, title, completed, deleteHandler, toggleTodoHandler }) => {
	return (
		<div className="todo-container">
			<Link to={`UserDetails/${userId}`} className="todo-title">
				<p>
					{' '}
					<b>Title</b> : {title}
				</p>
				<p>
					<b>completed: </b>
					{completed ? 'true' : 'false'}
				</p>
			</Link>
			<div className="todo-btn-container">
				<button className="btn-delete" onClick={() => deleteHandler(id)}>
					Delete
				</button>
				<button className="btn-main" onClick={() => toggleTodoHandler(id, completed)}>
					Toggle
				</button>
			</div>
		</div>
	);
};

export default Todo;
