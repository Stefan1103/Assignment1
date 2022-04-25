import React from 'react';

const Todo = ({ userId, id, title, completed, deleteHandler, toggleTodoHandler }) => {
	return (
		<div className="todo-container">
			<div className="todo-title">
				<p>
					{' '}
					<b>Title</b> : {title}
				</p>
				<p>
					<b>completed: </b>
					{completed ? 'true' : 'false'}
				</p>
			</div>
			<div className="todo-btn-container">
				<button className="btn-delete" onClick={() => deleteHandler(id)}>
					Delete
				</button>
				<button className="btn-main" onClick={() => toggleTodoHandler(id, completed)}>
					Done/NotDone
				</button>
			</div>
		</div>
	);
};

export default Todo;
