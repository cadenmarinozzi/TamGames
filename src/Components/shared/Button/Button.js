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
	iconElement,
	...rest
}) {
	return (
		<button
			className={`button ${disabled && 'button-disabled'} ${
				big && 'button-big'
			} ${(icon || iconElement) && 'button-icon'} ${
				cta && 'button-cta'
			} ${className} ${danger && 'button-danger'} ${
				transparent && 'button-transparent'
			}`}
			{...rest}>
			{icon && <FontAwesomeIcon icon={icon} />}
			{iconElement}
			{label}
		</button>
	);
}

export default Button;
