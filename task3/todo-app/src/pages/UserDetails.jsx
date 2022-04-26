import React from 'react';
import Error from './Error';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../hooks/useAxios';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
	let navigate = useNavigate();
	const { id } = useParams();
	const url = `https://jsonplaceholder.typicode.com/users/${id}`;
	const { isLoading, isError, data } = useAxios(url);
	console.log(isLoading);
	if (isLoading) return <Loading />;
	if (isError.error) return <Error />;
	const { address, email, name, username } = data;
	let avatar = '';
	if (!isLoading) {
		avatar = name.replace(/[^A-Z]/g, '');
	}
	return (
		<article className="userDetails">
			<h1>User Details for {name}</h1>
			<div className="userDetails-info">
				<p>
					<strong>Avatar: </strong>
					{avatar}
				</p>
				<p>
					<strong>Username: </strong>
					{username}
				</p>
				<p>
					<strong>Adress: </strong>
					{`${address.street}, ${address.city}`}
				</p>
				<p>
					<strong>Email: </strong>
					{email}
				</p>
			</div>
			<div className="userDetails-btn-container">
				<button
					className="btn-back"
					onClick={() => {
						navigate('/');
					}}
				>
					Back
				</button>
			</div>
		</article>
	);
};

export default UserDetails;
