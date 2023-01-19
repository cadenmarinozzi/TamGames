import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.scss';

function Button({ label, className, icon, transparent, cta, ...rest }) {
	return (
		<button
			className={`button ${icon && 'button-icon'} ${
				cta && 'button-cta'
			} ${className} ${transparent && 'button-transparent'}`}
			{...rest}>
			{icon && <FontAwesomeIcon icon={icon} />}
			{label}
		</button>
	);
}

export default Button;
