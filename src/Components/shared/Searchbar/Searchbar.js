import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import './Searchbar.scss';

class Searchbar extends Component {
	constructor() {
		super();

		this.state = {
			search: '',
		};
	}

	handleChange(event) {
		const value = event.target.value;

		if (this.props.onChange) this.props.onChange(value);

		this.setState({
			search: value,
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
			</div>
		);
	}
}

export default Searchbar;
