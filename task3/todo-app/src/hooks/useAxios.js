import axios from 'axios';
import { useState, useEffect } from 'react';

export const useAxios = (url) => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ isError, setIsError ] = useState({ error: false, status: null, statusText: '' });
	const [ data, setData ] = useState([]);

	const getData = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(url);
			const result = await response.data;
			setData(result);
			setIsLoading(false);
		} catch (error) {
			console.log('THERE IS AN ERROR :', error);
			setIsError({ error: true, status: '', statusText: 'ERROR...' });
		}
	};
	useEffect(() => {
		getData();
	}, []);
	return { isLoading, isError, data };
};
