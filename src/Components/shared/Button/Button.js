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
	disabledInvert,
	iconElement,
	...rest
}) {
	return (
		<button
			className={`button ${disabledInvert && 'button-disabled-invert'} ${
				disabled && 'button-disabled'
			} ${big && 'button-big'} ${
				(icon || iconElement) && 'button-icon'
			} ${cta && 'button-cta'} ${className} ${
				danger && 'button-danger'
			} ${transparent && 'button-transparent'}`}
			{...rest}>
			{icon && <FontAwesomeIcon icon={icon} />}
			{iconElement}
			{label}
		</button>
	);
}

export default Button;
