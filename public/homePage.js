'use strict'

const logoutButton = new LogoutButton();
logoutButton.action = function() {
    ApiConnector.logout((result) => {
        if (result.success) {
            location.reload();
        }
    });
}
