'use strict'

const userForm = new UserForm();
userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, (result) => {
        if (result.success) {
            location.reload();
        } else {
            this.setLoginErrorMessage(result.error);
        }
    });

}

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, (result) => {
        if (result.success) {
            location.reload();
        } else {
            this.setRegisterErrorMessage(result.error);
        }
    });
}
