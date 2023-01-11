import Navbar from './Components/containers/Navbar';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from 'Components/pages/Home';
import ClusterRush from 'Games/ClusterRush';
import './App.scss';
import MotoX3M from 'Games/MotoX3M';
import Slope from 'Games/Slope/Slope';

function App() {
	return (
		<HashRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/clusterRush' element={<ClusterRush />} />
				<Route path='/motoX3M' element={<MotoX3M />} />
				<Route path='/slope' element={<Slope />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
