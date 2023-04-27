import { Component } from 'react';
import { getGamePlays, getSiteViews } from 'modules/web';
import Chart from 'Components/shared/Chart';
import './GamePlaysChart.scss';

class GamePlaysChart extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async componentDidMount() {
		let views = await getGamePlays();

		const data = [];
		const labels = [];

		// sort by views
		views = Object.entries(views).sort((a, b) => {
			return a[1] - b[1];
		});

		// add views to data and labels
		views.forEach((view) => {
			data.push(view[1]);
			labels.push(view[0]);
		});

		this.setState({
			data,
			labels,
		});
	}

	render() {
		return (
			this.state.data &&
			this.state.labels && (
				<Chart
					label='Game Plays'
					type='bar'
					data={this.state.data}
					labels={this.state.labels}
				/>
			)
		);
	}
}

export default GamePlaysChart;
