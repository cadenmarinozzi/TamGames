import ClusterRush from 'assets/images/clusterRush.jpeg';
import GetTam from 'assets/images/GetTam.png';
import Button from 'Components/shared/Button';
import MotoX3M from 'assets/images/motoX3M.png';
import Slope from 'assets/images/slope.jpeg';
import Searchbar from 'Components/shared/Searchbar';
import { Component } from 'react';
import './Home.scss';

const games = [
	{
		title: 'GetTam',
		description:
			'GetTam is a 2048 inspired tile game where you combine tiles to get tam.',
		image: GetTam,
		url: 'https://lankmann.github.io/GetTam/',
		top: true,
	},
	{
		title: 'Cluster Rush',
		description:
			'Cluster Rush is a fast-paced truck jumping game with loads of levels!',
		image: ClusterRush,
		url: '/clusterRush',
	},
	{
		title: 'Moto X3M',
		description: `Play Moto X3M, a level based moto game where
		you dodge obstacles to get to the end!`,
		image: MotoX3M,
		url: '/motoX3M',
	},
	{
		title: 'Slope',
		description: `Slope is a ball runner game where you roll to the end.`,
		image: Slope,
		url: '/slope',
	},
];

class Home extends Component {
	constructor() {
		super();

		this.state = {
			search: '',
		};
	}

	handleSearchChange(value) {
		this.setState({
			search: value,
		});
	}

	render() {
		const currentGames = games.filter((value) => {
			if (this.state.search === '') {
				return value;
			} else if (
				value.title
					.toLowerCase()
					.includes(this.state.search.toLowerCase())
			) {
				return value;
			}
		});

		return (
			<div className='home'>
				<div className='title-container'>
					<div className='title'>
						<h1>Tam</h1>
						<h1 className='title-primary'>Games</h1>
					</div>
					<h4>The #1 unblocked games site</h4>
				</div>
				<div className='seperator-line' />
				<Searchbar
					placeholder='Search for a game'
					onChange={this.handleSearchChange.bind(this)}
				/>
				<div
					className={`games ${
						currentGames.length === 0 && 'games-empty'
					}`}>
					{currentGames.length === 0 && (
						<div className='empty-games'>
							No games found! Try changing your search query.
						</div>
					)}
					{currentGames.map((game) => {
						return (
							<a href={game.url}>
								<div className='game'>
									{game.top && (
										<div className='top-tag'>#1</div>
									)}
									<div className='game-info'>
										<img
											className='game-image'
											src={game.image}
											alt={game.title}
										/>
										<h3>{game.title}</h3>
										<span>{game.description}</span>
									</div>

									<Button label='Play' />
								</div>
							</a>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Home;
