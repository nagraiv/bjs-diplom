'use strict'

const userForm = new UserForm();
userForm.loginFormCallback = function({ login, password }) {
    ApiConnector.login({ login, password }, (result) => {
        if (result.success) {
            location.reload();
        } else {
            this.setLoginErrorMessage(result.error);
        }
    });

}

userForm.registerFormCallback = function({ login, password }) {
    ApiConnector.register({ login, password }, (result) => {
        if (result.success) {
            location.reload();
        } else {
            this.setRegisterErrorMessage(result.error);
        }
    });
}
