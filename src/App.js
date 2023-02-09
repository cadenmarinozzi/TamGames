import Navbar from './Components/containers/Navbar';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
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
import JustFall from 'Games/JustFall';
import Minecraft from 'Games/Minecraft';
import DriftHunters from 'Games/DriftHunters';
import Footer from 'Components/containers/Footer';
import JetpackJoyriders from 'Games/JetpackJoyriders';
import IvILOL from 'Games/1v1LOL';
import GreyBox from 'Games/GreyBox';
import './App.scss';
import AmongUs from 'Games/AmongUs';

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
			<BrowserRouter>
				<Navbar />
				<div className='content'>
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
						<Route
							path='/subwaySurfers'
							element={<SubwaySurfers />}
						/>
						<Route path='/scrapMetal' element={<ScrapMetal />} />
						<Route path='/justFall' element={<JustFall />} />
						<Route path='/minecraft' element={<Minecraft />} />
						<Route
							path='/driftHunters'
							element={<DriftHunters />}
						/>
						<Route
							path='/jetpackJoyriders'
							element={<JetpackJoyriders />}
						/>
						<Route path='/1v1LOL' element={<IvILOL />} />
						<Route path='/greyBox' element={<GreyBox />} />
						<Route path='/amongUs' element={<AmongUs />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		);
	}
}

export default App;
