const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/login.page');
const KategoriElement = require('../pages/kategori.page');
Given('the user is on login page', async () => {
    await LoginPage.open();
    await expect(browser).toHaveTitle('kasirAja');
});

When('I input my email as {string} and my pass as {string}', async function (email, password) {
    await LoginPage.EmailTextField.setValue(email);
    await LoginPage.PasswordTextField.setValue(password);
});

When('I click button login', async () => {
    await LoginPage.ButtonLogin.click();
});

When('I redirect to the dashboard page', async () => {
    await expect(browser).toHaveTitle('kasirAja');
});

When('I click button named kategori', async () => {
    await KategoriElement.KategoriElement.click()
})

When('I click button add', async() => {
    await KategoriElement.AddKategoriElement.click()
})
When('I input name as {string} and deskripsi {string}', async (nama, deskripsi) => {
    await KategoriElement.InputNamaKategori.setValue(nama);
    await KategoriElement.InputDeskripsiKategori.setValue(deskripsi);
})

When('I click button simpan', async () => {
    await KategoriElement.ButtonSubmitKategori.click()

})
Then('I must see successfull message {string}', async (message) => {
    await expect(KategoriElement.Message).toHaveTextContaining(message);
})

