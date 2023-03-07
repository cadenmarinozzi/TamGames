import { faSearch, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import './Searchbar.scss';

class Searchbar extends Component {
	constructor(props) {
		super();

		this.state = {
			search: '',
			sortOpen: false,
			sort: props.value ?? 'Rating', // rating, newest, name, views
		};
	}

	componentDidMount() {
		document.addEventListener('click', (event) => {
			if (this.state.sortOpen) {
				if (!event.target.className.includes('searchbar-sort')) {
					this.setState({
						sortOpen: false,
					});
				}
			}
		});
	}

	handleChange(event) {
		const value = event.target.value;

		if (this.props.onChange) this.props.onChange(value);

		this.setState({
			search: value,
		});
	}

	toggleSortDropdown() {
		this.setState({
			sortOpen: !this.state.sortOpen,
		});
	}

	selectSort(event) {
		const value = event.target.value;

		if (this.props.onSortChange) this.props.onSortChange(value);

		this.setState({
			sort: value,
		});
	}

	render() {
		return (
			<div className='searchbar'>
				<FontAwesomeIcon
					className='search-icon'
					icon={faSearch}
					size='xs'
				/>
				<input
					placeholder={this.props.placeholder}
					onChange={this.handleChange.bind(this)}
				/>
				<div className='searchbar-sort'>
					<FontAwesomeIcon
						className='searchbar-sort-icon'
						icon={faSort}
						onClick={this.toggleSortDropdown.bind(this)}
					/>
					{this.state.sortOpen && (
						<div className='searchbar-sort-dropdown'>
							<span>Sort by:</span>
							<select
								className='searchbar-sort-selector'
								onChange={this.selectSort.bind(this)}>
								<option
									value='Newest'
									selected={this.state.sort === 'Newest'}>
									Newest
								</option>
								<option
									value='Rating'
									selected={this.state.sort === 'Rating'}>
									Rating
								</option>
								<option
									value='Views'
									selected={this.state.sort === 'Views'}>
									Views
								</option>
								<option
									value='Name'
									selected={this.state.sort === 'Name'}>
									Name
								</option>
							</select>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Searchbar;
