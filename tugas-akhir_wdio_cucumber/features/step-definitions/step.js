const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/login.page');
const HomePage = require('../pages/home.page')

Given('I am on the login page', async () => {
    await LoginPage.open();
    await expect(browser).toHaveTitle('kasirAja');
});

When('I input email as {string} and passwrod as {string}', async (email, password) => {
    await LoginPage.EmailTextField.setValue(email);
    await LoginPage.PasswordTextField.setValue(password);
});

When('I click button login', async () => {
    await LoginPage.ButtonLogin.click();
});

// Then('I must navigate to dashboard page', async () => {
//     await expect(HomePage.HomePageElement).toExist();
//     await expect(HomePage.HomePageElement).toHaveTextContaining('kasirAja');

// });

Then('I must remain on login page displaying a message {string}', async (ErrorMessage) => {
    await expect(LoginPage.TitleProduk).toExist();
    await expect(LoginPage.TitleProduk).toHaveTextContaining('hai, kasirAja');

    await expect(LoginPage.ErrorMessage).toExist();
    await expect(LoginPage.ErrorMessage).toHaveTextContaining(ErrorMessage);
});