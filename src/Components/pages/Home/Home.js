import ClusterRush from 'assets/images/clusterRush.jpeg';
import GetTam from 'assets/images/GetTam.png';
import Button from 'Components/shared/Button';
import MotoX3M from 'assets/images/motoX3M.png';
import Slope from 'assets/images/slope.jpeg';
import Superhot from 'assets/images/superhot.jpg';
import Searchbar from 'Components/shared/Searchbar';
import Stack from 'assets/images/Stack.jpg';
import RollingForests from 'assets/images/rollingForests.png';
import SubwaySurfers from 'assets/images/subwaySurfers.jpg';
import RetroBowl from 'assets/images/retroBowl.jpeg';
import ScrapMetal from 'assets/images/scrapMetal.png';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
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
	{
		title: 'Superhot',
		description: `Dodge bullets and shoot enemies in slow motion in this level based game.`,
		image: Superhot,
		url: '/superhot',
	},
	{
		title: 'Stack',
		description: `Stack is a simple stacking game where you stack blocks to get to the top.`,
		image: Stack,
		url: '/stack',
	},
	{
		title: 'Rolling Forests',
		description: `Rolling Forests is a infinite runner game where you dodge the forest to get a high score.`,
		image: RollingForests,
		url: '/rollingForests',
	},
	{
		title: 'Subway Surfers',
		description: `Subway Surfers is a endless runner game where you dodge trains and collect coins.`,
		image: SubwaySurfers,
		url: '/subwaySurfers',
	},
	{
		title: 'Retro Bowl',
		description: `Retro Bowl is a retro pixel football game where you move characters and score touchdowns!`,
		image: RetroBowl,
		url: '/retroBowl',
	},
	{
		title: 'Scrap Metal',
		description: `Drive around in a selection of cars in this 3D driving game!`,
		image: ScrapMetal,
		url: '/scrapMetal',
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
					{currentGames.map((game, index) => {
						const gameDiv = (
							<div className='game'>
								{game.top && <div className='top-tag'>#1</div>}
								<div className='game-info'>
									<img
										className='game-image'
										src={game.image}
										alt={game.title}
									/>
									<h3>{game.title}</h3>
									<span>{game.description}</span>
								</div>
								<Button label='Play' icon={faPlay} />
							</div>
						);

						return game.url.startsWith('http') ? (
							<a key={index} href={game.url}>
								{gameDiv}
							</a>
						) : (
							<Link key={index} to={game.url}>
								{gameDiv}
							</Link>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Home;
