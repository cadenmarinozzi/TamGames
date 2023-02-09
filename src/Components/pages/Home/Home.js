import ClusterRush from 'assets/images/clusterRush.jpeg';
import GetTam from 'assets/images/GetTam.png';
import Button from 'Components/shared/Button';
import MotoX3M from 'assets/images/motoX3M.png';
import Slope from 'assets/images/slope.jpeg';
import Superhot from 'assets/images/superhot.jpg';
import Searchbar from 'Components/shared/Searchbar';
import Stack from 'assets/images/stack.jpg';
import RollingForests from 'assets/images/rollingForests.png';
import SubwaySurfers from 'assets/images/subwaySurfers.jpg';
import RetroBowl from 'assets/images/retroBowl.jpeg';
import ScrapMetal from 'assets/images/scrapMetal.png';
import JustFall from 'assets/images/justFall.png';
import Minecraft from 'assets/images/minecraft.png';
import CrossyRoad from 'assets/images/crossyRoad.png';
import DriftHunters from 'assets/images/driftHunters.png';
import JetpackJoyriders from 'assets/images/jetpackJoyriders.jpg';
import WorldsHardestGame from 'assets/images/worldsHardestGame.jpg';
import IvILOL from 'assets/images/1v1LOL.png';
import GreyBox from 'assets/images/greyBox.png';
import AmongUs from 'assets/images/amongUs.png';
import PaperIO from 'assets/images/paperIO.png';
import Mario from 'assets/images/mario.png';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { faCancel, faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getGamePlays, getGameRatings, rateGame } from 'modules/web';
import StarSelector from 'Components/shared/StarSelector';
import './Home.scss';

const games = [
	{
		title: 'GetTam',
		description:
			'GetTam is a 2048 inspired tile game where you combine tiles to get tam.',
		image: GetTam,
		url: 'https://lankmann.github.io/GetTam/',
		redirect: true,
	},
	{
		title: 'Cluster Rush',
		description:
			'Cluster Rush is a fast-paced truck jumping game with loads of levels!',
		image: ClusterRush,
		url: '/clusterRush',
	},
	{
		title: 'Jetpack Joyriders',
		description:
			'Jetpack Joyriders is a fast-paced jetpack game where you dodge obstacles and collect coins!',
		image: JetpackJoyriders,
		url: '/jetpackJoyriders',
	},
	{
		title: 'Just Fall',
		description: `Basically just fall guys...`,
		image: JustFall,
		url: '/justFall',
	},
	{
		title: 'Among Us',
		description: `Play Among Us in your browser!`,
		image: AmongUs,
		url: '/amongUs',
	},
	{
		title: 'Minecraft',
		description: `Online Minecraft in your browser!`,
		image: Minecraft,
		url: '/minecraft',
	},
	{
		title: 'Drift Hunters',
		description: `Drift through corners in this realistic 3D drifting game!`,
		image: DriftHunters,
		url: '/driftHunters',
	},
	{
		title: 'Moto X3M',
		description: `Play Moto X3M, a level based moto game where
		you dodge obstacles to get to the end!`,
		image: MotoX3M,
		url: '/motoX3M',
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
		title: 'Crossy Road',
		description: `Dodge traffic and cross the road!`,
		image: CrossyRoad,
		url: '/crossyRoad',
	},
	{
		title: '1v1LOL',
		description: `1v1.LOL is a battle royale game where you fight to be the last one standing!`,
		image: IvILOL,
		url: '/1v1LOL',
	},
	{
		title: 'Mario',
		description: `Play Mario in your browser!`,
		image: Mario,
		url: '/mario',
	},
	{
		title: 'Worlds Hardest Game',
		description: `The hardest game in the world!`,
		image: WorldsHardestGame,
		url: '/worldsHardestGame',
	},
	{
		title: 'PaperIO',
		description: `Eat up the map in this fast paced io game!`,
		image: PaperIO,
		url: '/paperIO',
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
		title: 'Grey Box',
		description: `Grey Box is a 3D puzzle game where you move blocks and experiment with bugs.`,
		image: GreyBox,
		url: '/greyBox',
		newest: true,
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

	async componentDidMount() {
		const gamePlays = await getGamePlays();
		const gameRatings = await getGameRatings();
		this.setState({
			gamePlays,
			gameRatings,
		});
	}

	handleSearchChange(value) {
		this.setState({
			search: value,
		});
	}

	render() {
		let currentGames = games.filter((value) => {
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

		if (!this.state.gamePlays)
			return <span className='loading-games'>Loading games...</span>;

		currentGames = currentGames.sort((a, b) => {
			const gameTitle = a.title.replace(' ', '');
			const gameTitle2 = b.title.replace(' ', '');

			const gameRatings = this.state.gameRatings?.[gameTitle] ?? {};
			let averageRating = 0;

			const nPeople = Object.values(gameRatings).reduce(
				(a, b) => a + b,
				0
			);

			for (const [rating, n] of Object.entries(gameRatings)) {
				averageRating += rating * n;
			}

			averageRating /= nPeople;
			averageRating = Math.round(averageRating);

			const gameRatings2 = this.state.gameRatings?.[gameTitle2] ?? {};
			let averageRating2 = 0;

			const nPeople2 = Object.values(gameRatings2).reduce(
				(a, b) => a + b,
				0
			);

			for (const [rating, n] of Object.entries(gameRatings2)) {
				averageRating2 += rating * n;
			}

			averageRating2 /= nPeople2;
			averageRating2 = Math.round(averageRating2);

			return averageRating2 - averageRating;
		});

		const newestGame = currentGames.find((value) => value.newest);

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
						const top = index === 0;

						const gameStars = [];
						const gameTitle = game.title.replace(' ', '');
						const gamePlays = this.state.gamePlays[gameTitle] ?? 0;
						const gameRatings =
							this.state.gameRatings?.[gameTitle] ?? {};
						let averageRating = 0;

						const nPeople = Object.values(gameRatings).reduce(
							(a, b) => a + b,
							0
						);

						for (const [rating, n] of Object.entries(gameRatings)) {
							averageRating += rating * n;
						}

						averageRating /= nPeople;
						averageRating = Math.round(averageRating);

						for (let i = 0; i < averageRating; i++) {
							gameStars.push(
								<FontAwesomeIcon
									key={i}
									className={
										averageRating === 5
											? 'star-gold'
											: 'star-solid'
									}
									icon={faStar}
								/>
							);
						}

						if (averageRating < 5) {
							for (let i = 0; i < 5 - averageRating; i++) {
								gameStars.push(
									<FontAwesomeIcon
										key={i + 5}
										icon={faStarRegular}
										className='star-regular'
									/>
								);
							}
						}

						const gameDiv =
							this.state.currentlyRating === gameTitle ? (
								<div className='rate-game'>
									<h3>{game.title}</h3>
									<StarSelector
										className='rating-selector'
										label='Rating'
										onChange={async (rating) => {
											await rateGame(gameTitle, rating);

											this.setState({
												currentlyRating: null,
											});
										}}
									/>
									<Button
										className='cancel-button'
										danger
										label='Cancel'
										icon={faCancel}
										onClick={() => {
											this.setState({
												currentlyRating: null,
											});
										}}
									/>
								</div>
							) : (
								<div className='game'>
									{top && <div className='top-tag'>#1</div>}
									<div className='game-info'>
										<img
											className='game-image'
											src={game.image}
											alt={game.title}
										/>
										<div className='game-title-container'>
											<h3>{game.title}</h3>{' '}
											<div className='game-stars'>
												{gameStars}
											</div>
										</div>
										<span>{game.description}</span>
									</div>
									<div className='game-buttons'>
										{game.redirect ? (
											<Button
												label='Play'
												cta
												icon={faPlay}
												onClick={() => {
													window.location.replace(
														game.url
													);
												}}
											/>
										) : (
											<Link to={game.url}>
												<Button
													label='Play'
													cta
													icon={faPlay}
												/>
											</Link>
										)}
										<Button
											label='Rate'
											icon={faStar}
											onClick={() => {
												this.setState({
													currentlyRating: gameTitle,
												});
											}}
										/>
									</div>
								</div>
							);

						return gameDiv;
					})}
				</div>
			</div>
		);
	}
}

export default Home;
