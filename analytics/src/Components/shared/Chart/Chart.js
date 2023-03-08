import { Component, createRef } from 'react';
import { Chart, registerables } from 'chart.js';
import './Chart.scss';

Chart.register(...registerables);

class DataChart extends Component {
	constructor() {
		super();

		this.state = {};

		this.canvasRef = createRef();
	}

	componentDidMount() {
		const { labels, data } = this.props;

		if (!labels || !data) return;

		const ctx = this.canvasRef.current.getContext('2d');
		const chartData = {
			labels,
			datasets: [
				{
					label: 'test',
					fill: true,
					borderColor: 'rgb(255, 99, 132)',
					lineTension: 0.12,
					data,
					barThickness: 7,
				},
			],
		};

		const config = {
			type: 'line',
			data: chartData,
			options: {
				responsive: true,
				maintainAspectRatio: true,
			},
		};

		const chart = new Chart(ctx, config);
		this.setState({
			chart,
		});
	}

	render() {
		return <canvas className='chart' ref={this.canvasRef} />;
	}
}

export default DataChart;
