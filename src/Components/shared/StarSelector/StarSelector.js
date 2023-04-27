import {
	faQuestionCircle,
	faStar,
	faStarHalf,
	faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import './StarSelector.scss';

class StarSelector extends Component {
	constructor(props) {
		super();

		this.state = {
			stars: props.stars ?? 0,
			halfStar: false,
		};

		// if (props.onChange) props.onChange(this.state.stars);
	}

	handleChange(stars) {
		this.setState({ stars });

		if (this.props.onChange) this.props.onChange(stars);
	}

	render() {
		const { label, leftLabel, rightLabel } = this.props;
		const stars = [];

		for (let i = 0; i < Math.ceil(this.state.stars); i++) {
			const starIndex = i + 1;
			stars.push(
				<FontAwesomeIcon
					key={i}
					className={`star ${
						this.state.stars === 5 ? 'star-gold' : 'star-solid'
					}`}
					onClick={this.handleChange.bind(this, starIndex)}
					icon={
						this.state.halfStar &&
						i === Math.floor(this.state.stars)
							? faStarHalfStroke
							: faStar
					}
				/>
			);
		}

		if (this.state.stars < 5) {
			for (let i = 0; i < 5 - Math.ceil(this.state.stars); i++) {
				const starIndex = this.state.stars + i + 1;

				stars.push(
					<FontAwesomeIcon
						key={i + 5}
						icon={faStarRegular}
						className='star star-regular'
						onClick={this.handleChange.bind(this, starIndex)}
					/>
				);
			}
		}

		return (
			<div className='star-selector'>
				<div className='star-selector-header'>
					<span className='star-selector-label'>{label}</span>
				</div>
				<div className='stars-container'>
					{leftLabel && <span className='label'>{leftLabel}</span>}
					<div>{stars}</div>
					{rightLabel && <span className='label'>{rightLabel}</span>}
				</div>
			</div>
		);
	}
}

export default StarSelector;
