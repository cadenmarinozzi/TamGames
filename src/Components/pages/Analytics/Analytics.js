import './Analytics.scss';
import GamePlaysChart from './Charts/GamePlaysChart';
import ViewsChart from './Charts/ViewsChart';
import WeekdayViewsChart from './Charts/WeekdaysViewsChart';
import WeekendViewsChart from './Charts/WeekendViewsChart';

function Analytics() {
	return (
		<div className='analytics-charts'>
			<section className='chart-section'>
				<ViewsChart />
				<GamePlaysChart />
			</section>
			<section className='chart-section'>
				<WeekendViewsChart />
				<WeekdayViewsChart />
			</section>
		</div>
	);
}

export default Analytics;
