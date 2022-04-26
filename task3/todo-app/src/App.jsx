import './sass/app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails';
import Error from './pages/Error';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/UserDetails/:id" element={<UserDetails />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</Router>
	);
}

export default App;
