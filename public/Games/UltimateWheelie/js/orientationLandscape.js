// JavaScript Document
jQuery(window).bind('orientationchange', function (e) {
	switch (window.orientation) {
		case 0:
			$('.turnDeviceNotificationLandscape').css('display', 'block');
			// The device is in portrait mode now
			break;

		case 180:
			$('.turnDeviceNotificationLandscape').css('display', 'block');
			// The device is in portrait mode now
			break;

		case 90:
			// The device is in landscape now
			$('.turnDeviceNotificationLandscape').css('display', 'none');
			break;

		case -90:
			// The device is in landscape now
			$('.turnDeviceNotificationLandscape').css('display', 'none');
			break;
	}
});

$(document).ready(function () {
	if (window.innerHeight > window.innerWidth) {
		$('.turnDeviceNotificationLandscape').css({ display: 'block' });
	}
});
