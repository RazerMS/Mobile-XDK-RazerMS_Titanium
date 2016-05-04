<!--
# license: Copyright © 2011-2016 MOLPay Sdn Bhd. All Rights Reserved. 
-->

# molpay-mobile-xdk-titanium

This is the complete and functional MOLPay Titanium payment module that is ready to be implemented into Titanium project through simple copy and paste procedures. An example application project (MOLPayXDKExample) is provided for MOLPayXDK Titanium integration reference.

This plugin provides an integrated MOLPay payment module that contains a wrapper 'MOLPayXDK.js' and an upgradable core as the 'molpay-mobile-xdk-www' folder, which the latter can be separately downloaded at https://github.com/MOLPay/molpay-mobile-xdk-www and update the local version.

## Recommended configurations

    - Titanium SDK Version: 5.2.2.GA ++

    - Node.js Version: 5.3.0 ++

    - Minimum Android target version: Android 4.1

    - Minimum iOS target version: 7.0

## Installation

    Step 1 - Import MOLPay modules
    Drag and drop MOLPayXDK.js and molpay-mobile-xdk-www folder into the Resources folder in the application project folder (same level as the app.js) to perform all imports. Please copy both file and folder into the project.

    Step 2 - Create a host container Titanium Window object
    var hostWin = Ti.UI.createWindow();

    Step 3 - Instantiate MOLPay object
    var molpay = require('MOLPayXDK');

    Step 4 - Create a view container Titanium View object for MOLPay payment UI
    var molpayView = Titanium.UI.createView();

    Step 5 - Add MOLPay view into the Host Window container
    hostWin.add(molpayView);

## Payment module callback

    var molpayCallback = function (transactionResult) {
        alert('molpayCallback transactionResult = '+transactionResult);
    };

## Prepare the Payment detail object

    var paymentDetails = {
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
        'mp_request_type' : '' // For transaction request use only, do not use this on payment process
    };

## Start the payment module

    Step 1 - Pass the molpayview Titanium View Container to MOLPay object
    molpay.setMolpayView(molpayView);

    Step 2 - Start the payment UI with payment details and callback function
    molpay.startMolpay(paymentDetails, molpayCallback);

    Step 3 - Host open Window
    hostWin.open();

## Close the payment module UI

    molpay.closeMolpay();

    * Notes: closeMolpay does not close remove the UI, the host application must implement it's own mechanism to close the payment module UI, 

    * Example: Implementing MOLPay closing mechanism at host app
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
        hostWin.remove(molpayView);
    });
    hostWin.add(closeButton);

    * The close event will also return a final result.

## Transaction status request service (optional)

    Step 1 - Create a hidden host container Titanium Window object
        var molpayView = Titanium.UI.createView({
            width: 0,
            height: 0
        });

    Step 2 - Repeat Installation procedures from 3 - 5.

    Step 3 - Start the status request procedure.
    molpay.transactionRequest(paymentDetails, molpayCallback);

## Support

Submit issue to this repository or email to our support@molpay.com

Merchant Technical Support / Customer Care : support@molpay.com<br>
Sales/Reseller Enquiry : sales@molpay.com<br>
Marketing Campaign : marketing@molpay.com<br>
Channel/Partner Enquiry : channel@molpay.com<br>
Media Contact : media@molpay.com<br>
R&D and Tech-related Suggestion : technical@molpay.com<br>
Abuse Reporting : abuse@molpay.com