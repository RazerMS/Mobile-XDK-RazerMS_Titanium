var isInternalDebugging=!1,molpaySdkUrl="molpay-mobile-xdk-www/index.html",mpopenmolpaywindow="mpopenmolpaywindow://",mptransactionresults="mptransactionresults://",mpcloseallwindows="mpcloseallwindows://",molpayresulturl="https://www.onlinepayment.com.my/MOLPay/result.php",molpaynbepayurl="https://www.onlinepayment.com.my/MOLPay/nbepay.php",molpayPaymentDetails,transactionResultCallback,molpayDiv,mainUiFrame,bankUiWindow,extraBankUiWindow,isClosingMolpay=!1;Ti.App.addEventListener("app:fromMolpay",function(a){var b,c,d=a.data;if(String(d)&&String(d).indexOf(mpopenmolpaywindow)>-1)c=new RegExp(mpopenmolpaywindow,"g"),b=String(d).replace(c,""),b&&b.length>0&&(isInternalDebugging&&Ti.API.info("inAppCallback base64HtmlString = "+b),createBankUiWindow(b));else if(String(d)&&String(d).indexOf(mptransactionresults)>-1){if(c=new RegExp(mptransactionresults,"g"),b=String(d).replace(c,""),b&&b.length>0){var e=Ti.Utils.base64decode(b).toString(),f=JSON.stringify(JSON.parse(e));transactionResultCallback(f),isClosingMolpay&&(molpayDiv.remove(mainUiFrame),bankUiWindow&&molpayDiv.remove(bankUiWindow),extraBankUiWindow&&molpayDiv.remove(extraBankUiWindow),isClosingMolpay=!1)}}else String(d)&&String(d).indexOf(mpcloseallwindows)>-1&&(bankUiWindow&&molpayDiv.remove(bankUiWindow),extraBankUiWindow&&molpayDiv.remove(extraBankUiWindow))});var inAppCallback=function(a){Ti.App.fireEvent("app:fromMolpay",{data:a})},nativeWebRequestUrlUpdates=function(a){var b={};b.requestPath=a;var c=JSON.stringify(b);mainUiFrame.evalJS("nativeWebRequestUrlUpdates('"+c+"');")},createBankUiWindow=function(a){if(Ti.API.info("createBankUiWindow base64HtmlString = "+a),molpayDiv){var b="data:text/html;base64,"+a;bankUiWindow=Ti.UI.createWebView({url:b,disableBounce:!0,loading:!0}),bankUiWindow.onCreateWindow=function(a){return extraBankUiWindow=Ti.UI.createWebView({disableBounce:!0,loading:!0}),molpayDiv.add(extraBankUiWindow),extraBankUiWindow.addEventListener("load",function(a){isInternalDebugging&&console.log("extraBankUiWindow load, e.url = "+a.url);String(a.url)&&String(a.url).indexOf(molpayresulturl)>-1&&nativeWebRequestUrlUpdates(a.url)}),extraBankUiWindow},bankUiWindow.addEventListener("load",function(a){isInternalDebugging&&console.log("bankUiWindow load, e.url = "+a.url);String(a.url)&&String(a.url).indexOf(molpaynbepayurl)>-1?bankUiWindow.evalJS("popout = function(){document.getElementsByTagName('form')[0].submit()};"):String(a.url)&&String(a.url).indexOf(molpayresulturl)>-1&&nativeWebRequestUrlUpdates(a.url)}),molpayDiv.add(bankUiWindow)}},mainUiFrameOnloadHandler=function(a){mainUiFrame.evalJS("updateSdkData('"+JSON.stringify(molpayPaymentDetails)+"',"+inAppCallback+");"),mainUiFrame.removeEventListener("load",mainUiFrameOnloadHandler)};exports.setMolpayView=function(a){molpayDiv=a},exports.startMolpay=function(a,b){isClosingMolpay=!1;try{molpayPaymentDetails=JSON.parse(a)}catch(c){molpayPaymentDetails=a}molpayPaymentDetails.module_id="molpay-mobile-xdk-titanium",isInternalDebugging&&console.log("MOLPay startmolpay paymentDetails = "+JSON.stringify(a)+", callback = "+b),transactionResultCallback=b,mainUiFrame=Ti.UI.createWebView({url:molpaySdkUrl,disableBounce:!0,loading:!0}),mainUiFrame.addEventListener("load",mainUiFrameOnloadHandler),molpayDiv&&molpayDiv.add(mainUiFrame)},exports.closeMolpay=function(){isClosingMolpay=!0,mainUiFrame.evalJS("transactionRequest();")},exports.transactionRequest=function(a,b){isClosingMolpay=!0;try{molpayPaymentDetails=JSON.parse(a)}catch(c){molpayPaymentDetails=a}molpayPaymentDetails.module_id="molpay-mobile-xdk-titanium",isInternalDebugging&&console.log("MOLPay transactionRequest paymentDetails = "+JSON.stringify(a,null,"")),transactionResultCallback=b,mainUiFrame=Ti.UI.createWebView({url:molpaySdkUrl,disableBounce:!0}),mainUiFrame.addEventListener("load",mainUiFrameOnloadHandler),molpayDiv&&molpayDiv.add(mainUiFrame)};