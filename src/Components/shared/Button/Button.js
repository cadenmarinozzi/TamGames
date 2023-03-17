import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.scss';

function Button({
	label,
	className,
	big,
	icon,
	danger,
	transparent,
	cta,
	disabled,
	...rest
}) {
	return (
		<button
			className={`button ${disabled && 'button-disabled'} ${
				big && 'button-big'
			} ${icon && 'button-icon'} ${cta && 'button-cta'} ${className} ${
				danger && 'button-danger'
			} ${transparent && 'button-transparent'}`}
			{...rest}>
			{icon && <FontAwesomeIcon icon={icon} />}
			{label}
		</button>
	);
}

export default Button;
