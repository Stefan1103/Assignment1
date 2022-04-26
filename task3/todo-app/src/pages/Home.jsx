import React from 'react';
import Header from '../components/Header';
import Todos from '../components/Todos';
const Home = () => {
	return (
		<div className="home">
			<Header />
			<Todos />
		</div>
	);
};

export default Home;
