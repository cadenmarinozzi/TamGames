import { Component } from 'react';
import { getSiteViews } from 'modules/web';
import Chart from 'Components/shared/Chart';
import './WeekendViewsChart.scss';

function getCompareDate(date) {
	const dateData = new Date(date);
	const compareDate = dateData[Symbol.toPrimitive]('number');

	return compareDate;
}

class WeekendViewsChart extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async componentDidMount() {
		let views = await getSiteViews();

		const data = [];
		const labels = [];

		// sort views by date
		views = Object.entries(views)
			.filter((day) => {
				const date = new Date(day[0]);
				const dayOfWeek = date.getDay();

				return dayOfWeek === 0 || dayOfWeek === 6;
			})
			.sort((a, b) => {
				const aDate = getCompareDate(a[0]);
				const bDate = getCompareDate(b[0]);

				return aDate - bDate;
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
					dontHighlightWeekends
					label='Weekend Views'
					data={this.state.data}
					labels={this.state.labels}
				/>
			)
		);
	}
}

export default WeekendViewsChart;
