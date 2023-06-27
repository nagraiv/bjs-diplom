'use strict'

const logoutButton = new LogoutButton();
logoutButton.action = function() {
    ApiConnector.logout((result) => {
        if (result.success) {
            location.reload();
        }
    });
}

ApiConnector.current((result) => {
    if (result.success) {
        ProfileWidget.showProfile(result.data);
    }
});

const ratesBoard = new RatesBoard();

const getCurrency = function() {
    ApiConnector.getStocks((result) => {
        if (result.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(result.data);
        }
    });
}

getCurrency();
const intervalID = setInterval(getCurrency, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function({ currency, amount }) {
    ApiConnector.addMoney({ currency, amount }, (result) => {
        if (result.success) {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(result.success, 'Баланс успешно пополнен.');
        } else {
            moneyManager.setMessage(result.success, result.error);
        }
    });
}

moneyManager.conversionMoneyCallback = function({ fromCurrency, targetCurrency, fromAmount }) {
    ApiConnector.convertMoney(
        { fromCurrency, targetCurrency, fromAmount },
        (result) => {
        if (result.success) {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(result.success, 'Валюта успешно сконвертирована.');
        } else {
            moneyManager.setMessage(result.success, result.error);
        }
    });
}

moneyManager.sendMoneyCallback = function({ to, amount, currency }) {
    ApiConnector.transferMoney({ to, amount, currency }, (result) => {
        if (result.success) {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(result.success, 'Перевод средств осуществлён успешно.');
        } else {
            moneyManager.setMessage(result.success, result.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((result) => {
    if (result.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(result.data);
        moneyManager.updateUsersList(result.data);
    }
});

favoritesWidget.addUserCallback = function({ id, name }) {
    ApiConnector.addUserToFavorites({ id, name }, (result) => {
        if (result.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
            moneyManager.updateUsersList(result.data);
            favoritesWidget.setMessage(result.success, 'Пользователь добавлен.');
        } else {
            favoritesWidget.setMessage(result.success, result.error);
        }
    });
}

favoritesWidget.removeUserCallback = function(userId) {
    ApiConnector.removeUserFromFavorites(userId, (result) => {
        if (result.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
            moneyManager.updateUsersList(result.data);
            favoritesWidget.setMessage(result.success, 'Пользователь удалён.');
        } else {
            favoritesWidget.setMessage(result.success, result.error);
        }
    });
}
