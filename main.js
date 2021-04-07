window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captha', {
	'size': 'invisible',
	'callback': (response) => {
	  // reCAPTCHA solved, allow signInWithPhoneNumber.
	  onSignInSubmit();
	}
  });



$('#frm-phone').submit(function(e){
	e.preventDefault();
	//Renderisamos el Google Captcha
recaptchaVerifier.render().then(function(widgetId) {
	window.recaptchaWidgetId = widgetId;
  });
	const phoneNumber = $('#phone').val();
	const appVerifier = window.recaptchaVerifier;
	console.log(phoneNumber);
	firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
		.then((confirmationResult) => {
		// SMS sent. Prompt user to type the code from the message, then sign the
		// user in with confirmationResult.confirm(code).
		window.confirmationResult = confirmationResult;
		console.log("SE ENVIO")
		// ...
		}).catch((error) => {
		// Error; SMS not sent
		// ...
		console.log("NO SE ENVIO")
		});
});

function enviarSMS(){

	let phone = $('#phone').val();

	firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier)
		    .then(function (confirmationResult) {
		      // SMS sent. Prompt user to type the code from the message, then sign the
		      // user in with confirmationResult.confirm(code).
		      window.confirmationResult = confirmationResult;
		      console.log('enviado?'+phone)

		     

		    }).catch(function (error) {

				console.log('error',error)

			  // Error; SMS not sent
			  // ...
			  //
				grecaptcha.reset(window.recaptchaWidgetId);

				// Or, if you haven't stored the widget ID:
				recaptchaVerifier.render().then(function(widgetId) {
					grecaptcha.reset(widgetId);
				});
			}
		);


}

function verificarCodigo(){


	var code = $('#pass').val();
	console.log('Codigo',code);
	//getCodeFromUserInput();



	window.confirmationResult.confirm(code).then(function (result) {
		// User signed in successfully.
		console.log(result);
		
		var user = result.user;

		user.updateProfile({
			displayName: "User "  + user.phoneNumber,
			email: 	"prueba@mail.com",
		}).then(function() {
			// Update successful.
			alert("registrado")
			console.log('actualizado')
		}, function(error) {
			// An error happened.
		});
		//actualizamos su nombrE?
		// ...
	}).catch(function (error) {

		console.log('Error',error)
	  // User couldn't sign in (bad verification code?)
	  // ...7
	 	//$('#code_error').text(error.message);
	 	

	});

}