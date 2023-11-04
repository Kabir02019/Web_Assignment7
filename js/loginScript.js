$(document).ready(() => {
    console.log("here")
    
   const isEmpty = (str) => {
    return (!str || 0 === str.length);
}


const displayErrorAndHighlightField = (fieldId, errorMessage) => {
    $(fieldId).next('.error').text(errorMessage);
    $(fieldId).css('border-color', 'red');
}


const clearErrorAndHighlightField = (fieldId) => {
    $(fieldId).next('.error').text(''); 
    $(fieldId).css('border-color', ''); 
}

const validatePassword = (password) => {
  
    const minLength = 8;
    const maxLength = 16;
    if (password.length < minLength || password.length > maxLength) {
        displayErrorAndHighlightField('#password',  "Password should be between 8 and 16 characters long");
        return false
    }

    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharacters.test(password)) {
        displayErrorAndHighlightField('#password',  "Password should contain at least one special character");
        return false
    }

    return true; 
}

const validateUserName = (userName) => {
    const minLength = 8;
    const maxLength = 16;
    if (userName.length < minLength || userName.length > maxLength) {
        displayErrorAndHighlightField('#userName',  "User Name should be between 8 and 16 characters long");
        return false
    }

    return true;
}




$('#email, #userName, #password, #confirmPassword').on('keyup', (event) => {
    const id = event.target.id;
    const value = $(event.target).val().trim();
    if(value){
     
        $('#loginButton').prop('disabled', false);
        clearErrorAndHighlightField(`#${id}`);
    }
})


$('#loginButton').on('click', (e) => {

    const minLength = 8;
    const maxLength = 16;
    e.preventDefault(); 

   
    let isValid = true;


    const email = $('#email').val().trim();
    if (isEmpty(email)) {
        displayErrorAndHighlightField('#email', 'Email field cannot be empty');
        isValid = false;
    } else if(!email.includes("@northeastern.edu")) {
      
        displayErrorAndHighlightField('#email', 'Email ID provided is not northeastern email');
        isValid = false;
    }


    
    const userName = $('#userName').val().trim();
    if (isEmpty(userName)) {
        displayErrorAndHighlightField('#userName', 'User Name field cannot be empty');
        isValid = false;
    } else if(!validateUserName(userName)) {
        isValid = false;
    }
 


    const password = $('#password').val().trim();
    if (isEmpty(password)) {
        displayErrorAndHighlightField('#password', 'Password field cannot be empty');
        isValid = false;
    } else if(!validatePassword(password)) {
        
        isValid= false;
    }


    const confirmPassword = $('#confirmPassword').val().trim();
    if (isEmpty(confirmPassword)) {
        displayErrorAndHighlightField('#confirmPassword', 'Confirm Password field cannot be empty');
        isValid = false;
    } 


    if(password != confirmPassword){
        displayErrorAndHighlightField('#confirmPassword', 'Password is not matching');
        isValid = false;
    }


    $('#loginButton').prop('disabled', !isValid);


    if (isValid) {
        $('#loginPage').hide();
        $('#secondPage').show();
        $('#loggedInUserName').text(userName);
    }
    });
});