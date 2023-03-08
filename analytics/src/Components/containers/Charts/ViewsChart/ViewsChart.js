import { Component } from 'react';
import { getSiteViews } from 'modules/web';
import Chart from 'Components/shared/Chart';
import './ViewsChart.scss';

function getCompareDate(date) {
	const dateData = new Date(date);
	const compareDate = dateData[Symbol.toPrimitive]('number');

	return compareDate;
}

class ViewsChart extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async componentDidMount() {
		let views = await getSiteViews();

		// views: {
		//     "2021-05-01": 1,
		//     "2021-05-02": 1,
		// }

		const data = [];
		const labels = [];

		// sort views by date
		views = Object.entries(views).sort((a, b) => {
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
				<Chart data={this.state.data} labels={this.state.labels} />
			)
		);
	}
}

export default ViewsChart;
