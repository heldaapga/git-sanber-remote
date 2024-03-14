const BasePage = require('./base.page')

class KategoriElement extends BasePage{
    get KategoriElement() {
        return $('//div[contains(text(),"kategori")]');
    }

    get AddKategoriElement() {
        return $('#root > div > div > div.css-1r35f0l > div.chakra-container.css-9rmdie > div.css-1t33j5j > a');
    }

    get InputNamaKategori() {
        return $('#nama');
    }
    get InputDeskripsiKategori() {
        return $('#deskripsi');
    }
    get ButtonSubmitKategori() {
        return $('#root > div > div > div.css-1r35f0l > div.chakra-container.css-9rmdie > div.css-1t33j5j > button');
    }
    get Message() {
        return $('div[role="alert"]');
    }
}

module.exports = new KategoriElement()