import Navbar from './Components/containers/Navbar';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Home from 'Components/pages/Home';
import ClusterRush from 'Components/pages/Games/ClusterRush';
import MotoX3M from 'Components/pages/Games/MotoX3M';
import Slope from 'Components/pages/Games/Slope/Slope';
import { addSiteView } from 'modules/web';
import { Component } from 'react';
import Button from 'Components/shared/Button';
import { getCookie } from 'modules/cookies';
import Superhot from 'Components/pages/Games/Superhot';
import Stack from 'Components/pages/Games/Stack';
import RollingForests from 'Components/pages/Games/RollingForests';
import SubwaySurfers from 'Components/pages/Games/SubwaySurfers';
import RetroBowl from 'Components/pages/Games/RetroBowl';
import ScrapMetal from 'Components/pages/Games/ScrapMetal';
import JustFall from 'Components/pages/Games/JustFall';
import Minecraft from 'Components/pages/Games/Minecraft';
import DriftHunters from 'Components/pages/Games/DriftHunters';
import Footer from 'Components/containers/Footer';
import JetpackJoyriders from 'Components/pages/Games/JetpackJoyriders';
import IvILOL from 'Components/pages/Games/1v1LOL';
import GreyBox from 'Components/pages/Games/GreyBox';
import AmongUs from 'Components/pages/Games/AmongUs';
import WorldsHardestGame from 'Components/pages/Games/WorldsHardestGame';
import PaperIO from 'Components/pages/Games/PaperIO';
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
						<Route
							path='/worldsHardestGame'
							element={<WorldsHardestGame />}
						/>
						<Route path='/paperIO' element={<PaperIO />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		);
	}
}

export default App;
