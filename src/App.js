import Navbar from './Components/containers/Navbar';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from 'Components/pages/Home';
import ClusterRush from 'Games/ClusterRush';
import MotoX3M from 'Games/MotoX3M';
import Slope from 'Games/Slope/Slope';
import { addSiteView } from 'modules/web';
import { Component } from 'react';
import Button from 'Components/shared/Button';
import { getCookie } from 'modules/cookies';
import Superhot from 'Games/Superhot';
import Stack from 'Games/Stack';
import RollingForests from 'Games/RollingForests';
import SubwaySurfers from 'Games/SubwaySurfers';
import RetroBowl from 'Games/RetroBowl';
import ScrapMetal from 'Games/ScrapMetal';
import './App.scss';

class App extends Component {
	constructor() {
		super();

		this.state = {
			tabChanged: false,
			cloak: false,
		};
	}

	componentDidMount() {
		document.addEventListener('visibilitychange', (event) => {
			if (document.visibilityState === 'visible') {
				if (!this.state.tabChanged) {
					this.setState({
						tabChanged: false,
						cloak: true,
					});
				}

				return;
			}

			if (this.state.tabChanged) {
				this.setState({
					tabChanged: true,
				});
			}
		});
	}

	render() {
		addSiteView();

		return this.state.cloak && getCookie('tabCloaker') === 'true' ? (
			<>
				<iframe
					title='Google Drive'
					className='cloak-screen'
					src='https://google.com/drive/'
				/>
				<Button
					className='uncloak-button'
					onClick={() => {
						this.setState({
							cloak: false,
						});
					}}
					label='Back'
				/>
			</>
		) : (
			<HashRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/clusterRush' element={<ClusterRush />} />
					<Route path='/motoX3M' element={<MotoX3M />} />
					<Route path='/slope' element={<Slope />} />
					<Route path='/superhot' element={<Superhot />} />
					<Route path='/stack' element={<Stack />} />
					<Route path='/retroBowl' element={<RetroBowl />} />
					<Route
						path='/rollingForests'
						element={<RollingForests />}
					/>
					<Route path='/subwaySurfers' element={<SubwaySurfers />} />
					<Route path='/scrapMetal' element={<ScrapMetal />} />
				</Routes>
			</HashRouter>
		);
	}
}

export default App;
