# Supertest,Mocha and Chai 
Folder ini berisi tentang tugas pekanan 3 tentang Api Automation 

Penjelasan : 
Tugas ini menjelaskan penggunaan supertest, mocha dan chai untuk api automation testing dengan bahasa permograman javascript

## Install libraries pendukung
```
npm i -g mocha
```
```
npm i supertest
```
```
npm i chai
```
```
npm i jsonshema
```
```
npm i mochawesome mocha
```

### Cara menjalankan 
- Copy / download file tugas 
- Buka file melalui VScode
- Buka terminal (pastikan juga komputer anda telah terinstall node js dan framework pendukung), dan jalankan dengan perintah : 

```
npx mocha test\spec\getUser.js
```
```
npx mocha test\spec\getUnits.js
```
```
npx mocha test\spec\getCategories.js
```
```
npx mocha test\spec\getProduct.js
```

### Report
Untuk report menggunakan mochawesome, hasil report dapat disimpan dan dibuka dalam bentul file Html dalam membuat report dari setiap file bisa dengan perintah : 
```
npx mocha --reporter mochawesome (file)
```

Done ^^

Selamat mencoba
