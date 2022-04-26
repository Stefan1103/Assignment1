import React from 'react';
import { useAxios } from '../hooks/useAxios';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
	const { id } = useParams();
	const url = `https://jsonplaceholder.typicode.com/users/${id}`;
	const { isLoading, isError, data } = useAxios(url);
	console.log(data);
	return <div>UserDetails</div>;
};

export default UserDetails;
