
const BasePage = require('./base.page.js');

class HomePage extends BasePage {

    get HomePageElement() {
        return $('a[href="/dashboard"]');
    }
}

module.export = new HomePage();
