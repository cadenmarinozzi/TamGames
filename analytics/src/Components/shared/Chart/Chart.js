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
		const { labels, data, label } = this.props;

		if (!labels || !data) return;

		const ctx = this.canvasRef.current.getContext('2d');
		const chartData = {
			labels,
			datasets: [
				{
					label,
					pointBackgroundColor: (context) => {
						// highlight weekends
						const index = context.dataIndex;
						const value = context.dataset.data[index];
						const date = new Date(labels[index]);
						const day = date.getDay();

						if (day === 0 || day === 6) {
							return 'rgb(255, 0, 0)';
						}

						return 'rgb(255, 99, 132, 0.2)';
					},
					segment: {
						backgroundColor: (ctx) => {
							const p0 = ctx.p0;
							const p1 = ctx.p1;

							// highlight weekends
							const date = new Date(labels[p0['$context'].index]);
							const day = date.getDay();
							const date2 = new Date(
								labels[p1['$context'].index]
							);
							const day2 = date2.getDay();

							if (
								(day === 0 && day2 === 6) ||
								(day === 6 && day2 === 0)
							) {
								return 'rgb(255, 0, 0)';
							}

							return 'rgb(255, 99, 132, 0.2)';
						},
					},
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
