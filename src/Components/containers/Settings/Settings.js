import Button from 'Components/shared/Button';
import Toggle from 'Components/shared/Toggle';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Settings.scss';

function Settings({ closeSettings }) {
	return (
		<div className='settings-container'>
			<div className='settings'>
				<Toggle
					label='Tab Cloaker'
					enabledIcon={faEye}
					disabledIcon={faEyeSlash}
				/>
				<Button onClick={closeSettings} label='Close' />
			</div>
		</div>
	);
}

export default Settings;
