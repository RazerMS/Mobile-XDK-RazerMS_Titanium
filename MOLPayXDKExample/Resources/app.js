// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#FFFFFF');

var hostWin = Ti.UI.createWindow();
hostWin.backgroundColor = '#72529b';

var molpay = require('MOLPayXDK');

// Close button
closeButton = Titanium.UI.createButton({
	title: 'Close',
	top: 0,
	width: 100,
	height: 50,
	right: 0,
	backgroundColor: '#72529b',
	color: 'white'
});
closeButton.addEventListener('click', function () {
	molpay.closeMolpay();
	// hostWin.remove(molpayView);
});
hostWin.add(closeButton);

// Create a view for MOLPay payment UI
var molpayView = Titanium.UI.createView({
	backgroundColor:'red',
	top: 50,
	bottom: 0,
	left: 0,
	right: 0
});

// Create an invisible view for MOLPay transaction request
// var molpayView = Titanium.UI.createView({
// 	backgroundColor:'red',
// 	width: 0,
// 	height: 0
// });

hostWin.add(molpayView);

// Disable android back during payment process
hostWin.addEventListener('androidback', function(e) {
	e.cancelBubble = true;
});

// MOLPay payment details
var paymentDetails = {
	// ------- SDK required data ----------
	'mp_amount' : '1.10', // Mandatory String. A value not less than '1.00'
	'mp_username' : '', // Mandatory String. Values obtained from MOLPay
	'mp_password' : '', // Mandatory String. Values obtained from MOLPay
	'mp_merchant_ID' : '', // Mandatory String. Values obtained from MOLPay
	'mp_app_name' : '', // Mandatory String. Values obtained from MOLPay
	'mp_order_ID' : '', // Mandatory String. Payment values
	'mp_currency' : 'MYR', // Mandatory String. Payment values
	'mp_country' : 'MY', // Mandatory String. Payment values
	'mp_verification_key' : '', // Mandatory String. Values obtained from MOLPay
	'mp_channel' : '', // Optional String.
	'mp_bill_description' : '', // Optional String.
	'mp_bill_name' : '', // Optional String.
	'mp_bill_email' : '', // Optional String.
	'mp_bill_mobile' : '', // Optional String.
	'mp_channel_editing' : false, // Optional String.
	'mp_editing_enabled' : false, // Optional String.
	'mp_transaction_id' : '', // For transaction request use only, do not use this on payment process
	'mp_request_type' : '' // Optional, set 'Status' when performing a transactionRequest
	// 'mp_bin_lock' : ['414170', '414171'], // Optional for credit card BIN restrictions
	// 'mp_bin_lock_err_msg' : 'Only UOB allowed' // Optional for credit card BIN restrictions
	// 'mp_is_escrow' : '' // Optional for Escrow, put "1" to enable escrow
	// 'mp_filter' : '0', // Optional for debit card payment only 
	// 'mp_custom_css_url' : Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'custom.css').nativePath // Optional for custom UI
};

var molpayCallback = function (transactionResult) {
	// Ti.API.info('molpayCallback transactionResult = ');//+transactionResult
	alert('molpayCallback transactionResult = '+transactionResult);
};

molpay.setMolpayView(molpayView);
molpay.startMolpay(paymentDetails, molpayCallback);
// molpay.transactionRequest(paymentDetails, molpayCallback);

hostWin.open();

