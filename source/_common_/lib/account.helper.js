/*
 * Created on Oct. 9
 * Helper functions for accounts and authentication related problems.
 */

App.checkPassword=function(str){
	// should have at least one capital letter
	var containCapitalLetter = /[A-Z]/.test(str);
	// should be at least one numerical number
	var containNumber = /[0-9]/.test(str);
	// should be at least 8 characters
	var longEnough = str.length >= 8;
	return (containNumber && containCapitalLetter && longEnough);
}