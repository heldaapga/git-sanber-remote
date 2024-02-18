const prompt = require('prompt-sync')({signint: true});
const number = prompt('Masukkan angka: ');

const result = Math.sqrt(number);
if (!isNaN(number) && number >= 0) { //bilangan genap dimulai dari angka 2 dst
    if (number % 2 === 0) {
      console.log("Ini bilangan genap"); 
      console.log(`Akar kuadrat dari ${number} adalah ${result}`);

    } else { //jika input angka ganjil
      console.log("Tidak bisa input bilangan ganjil");
    }
  } else { //jika input angka kurang dari 0
    console.log("Tidak bisa input bilangan negatif");
  }