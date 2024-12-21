// Desain html

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const navClose = document.getElementById("nav-close");

navLink.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.add("hidden");
  });
});

navClose.addEventListener("click", () => {
  navMenu.classList.add("hidden");
});

hamburger.addEventListener("click", () => {
  navMenu.classList.remove("hidden");
});

//Koding ganti bg header saat scroll
const scrollHeader = () => {
  const navbar = document.getElementById("navbar");

  if (this.scrollY >= 80) {
    navbar.classList.add("bg-slate-800");
  } else {
    navbar.classList.remove("bg-slate-800");
  }
};
window.addEventListener("scroll", scrollHeader);

// Main

const plainText = document.getElementById("plainText");
const errorMessage = document.getElementById("error-message");
const keyErrorMessage = document.getElementById("key-error-message");
const key = document.getElementById("key");
const displayResult = document.getElementById("display-result");
const cipherText = document.getElementById("cipherText");
const coverImage = document.getElementById("coverImage");
const canvasBefore = document.getElementById("canvasBefore");
const canvasAfter = document.getElementById("canvasAfter");
const ctxBefore = canvasBefore.getContext("2d");
const ctxAfter = canvasAfter.getContext("2d");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const previewStego = document.getElementById("preview-stego");
const downloadImg = document.getElementById("download-stego-image");

const stegoImageInput = document.getElementById("stegoImage");
const previewDecrypt = document.getElementById("preview-decrypt");
const canvasDecryptPreview = document.getElementById("canvasDecryptPreview");
const ctxDecryptPreview = canvasDecryptPreview.getContext("2d");
const keyDecrypt = document.getElementById("keyDecrypt");
const decryptBtn = document.getElementById("decryptBtn");
const clearBtn = document.getElementById("clearBtn");
const resultDecrypt = document.getElementById("resultDecrypt");
const decryptResultText = document.getElementById("decrypt-result-text");

// ENKRIPSI

// Tabel substitusi huruf chipper
const substitutionTable = {
  A: "He",
  B: "Li",
  C: "B ",
  D: "N ",
  E: "Na",
  F: "Al",
  G: "Cl",
  H: "K ",
  I: "V ",
  J: "Cu",
  K: "Ga",
  L: "Rb",
  M: "Nb",
  N: "Tc",
  O: "Ag",
  P: "I ",
  Q: "Pr",
  R: "Pm",
  S: "Pm",
  T: "Lu",
  U: "Ta",
  V: "Au",
  W: "Bi",
  X: "Ac",
  Y: "Bk",
  Z: "Md",
};

// Fungsi untuk mengenkripsi teks
function encryptWithShift(inputText, shift) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let encryptedText = "";

  // Proses setiap karakter input
  for (let i = 0; i < inputText.length; i++) {
    let char = inputText[i].toUpperCase();

    // Jika karakter ada dalam alfabet
    if (alphabet.includes(char)) {
      let originalIndex = alphabet.indexOf(char);
      let shiftedIndex = (originalIndex + shift) % 26; // Geser posisi dengan kunci (shift)
      let shiftedChar = alphabet[shiftedIndex];
      encryptedText += substitutionTable[shiftedChar]; // Ganti sesuai tabel
    } else {
      encryptedText += char;
    }
  }
  return encryptedText;
}

// Fungsi untuk dekripsi teks
function decryptWithShift(encryptedText, shift) {
  // Buat tabel substitusi terbalik untuk dekripsi
  const reversedTable = Object.fromEntries(
    Object.entries(substitutionTable).map(([key, value]) => [value, key])
  );

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let decryptedText = "";

  for (let i = 0; i < encryptedText.length; i += 2) {
    // Ambil segmen 2 karakter dari teks terenkripsi
    let segment = encryptedText.substring(i, i + 2);
    // console.log("Segment:", segment); // Debugging

    // Jika segmen ada dalam tabel substitusi terbalik
    if (reversedTable[segment]) {
      let originalChar = reversedTable[segment];
      let originalIndex = alphabet.indexOf(originalChar);

      if (originalIndex === -1) {
        console.error("Karakter tidak ditemukan dalam alfabet:", originalChar);
        continue;
      }

      // Geser karakter kembali sesuai dengan kunci
      let shiftedIndex = (originalIndex - shift + 26) % 26;
      decryptedText += alphabet[shiftedIndex];
    } else {
      // Jika segmen tidak dikenali, tambahkan seperti apa adanya
      // console.warn("Segment tidak dikenal:", segment);
      decryptedText += segment;
    }
  }

  return decryptedText;
}

// Fungsi input plain text dan kunci
const encryptCrypto = () => {
  const inputText = plainText.value;
  const keyValue = parseInt(key.value);

  const regex = /^[A-Za-z]+$/;

  // Validasi input
  if (inputText === "" || !regex.test(inputText)) {
    errorMessage.classList.remove("hidden");
    cipherText.textContent = "";
    displayResult.classList.add("hidden");
    return;
  } else {
    errorMessage.classList.add("hidden");
  }

  if (keyValue < 0) {
    keyErrorMessage.classList.remove("hidden");
    cipherText.textContent = "";
    displayResult.classList.add("hidden");
    return;
  } else {
    keyErrorMessage.classList.add("hidden");
  }

  if (key.value === "") {
    key.value = 0;
  }

  const result = encryptWithShift(inputText, parseInt(key.value));
  cipherText.textContent = result;
  console.log(result);

  // Show display result when conditions are met
  displayResult.classList.remove("hidden");
};

// Menambahkan event listener untuk input changes
document.getElementById("plainText").addEventListener("input", encryptCrypto);
document.getElementById("key").addEventListener("input", encryptCrypto);

// Fungsi untuk memuat gambar ke dalam canvas
const handleCoverImage = async (e) => {
  const validExtensions = ["gif", "png", "bmp", "jpeg", "jpg"];
  const extension = coverImage.value.split(".").pop().toLowerCase();

  if (validExtensions.includes(extension) && e.files && e.files[0]) {
    const reader = new FileReader();
    const img = new Image();

    reader.onload = (event) => {
      img.src = event.target.result; // Memuat gambar dari file
      console.log("Reader loaded:", event.target.result); // Debugging
    };

    img.onload = () => {
      console.log(
        "Gambar berhasil dimuat dengan ukuran : ",
        img.width,
        img.height
      );
      // Ubah dimensi canvas agar sesuai dengan gambar
      canvasBefore.width = img.width;
      canvasBefore.height = img.height;

      // Bersihkan dan gambar gambar ke canvas
      ctxBefore.clearRect(0, 0, canvasBefore.width, canvasBefore.height);
      ctxBefore.drawImage(img, 0, 0, img.width, img.height);
    };

    previewStego.classList.remove("hidden");

    img.onerror = () => {
      alert("Gagal memuat gambar. Silakan coba lagi.");
    };

    reader.readAsDataURL(e.files[0]);
  } else {
    alert("Silakan unggah file gambar dengan format yang benar!");
  }
};

// Fungsi untuk menyisipkan teks ke dalam gambar
const handleCombine = async () => {
  if (!plainText.value || !key.value || !coverImage.value) {
    alert("Lengkapi semua input sebelum menggabungkan!");
    return;
  }
  const encryptedText = cipherText.textContent;
  if (!encryptedText) {
    alert("Teks terenkripsi tidak ditemukan!");
    return;
  }

  console.log("Teks terenkripsi sebelum disisipkan:", cipherText.textContent); //debug

  const imgData = ctxBefore.getImageData(
    0,
    0,
    canvasBefore.width,
    canvasBefore.height
  );
  const data = imgData.data;

  let textIndex = 0;
  for (let i = 0; i < data.length && textIndex < encryptedText.length; i += 4) {
    const charCode = encryptedText.charCodeAt(textIndex);
    console.log(
      `Menyisipkan karakter: ${encryptedText[textIndex]}, Kode ASCII: ${charCode}`
    );

    data[i] = (data[i] & 0xfc) | (charCode & 0x03);
    data[i + 1] = (data[i + 1] & 0xfc) | ((charCode >> 2) & 0x03);
    data[i + 2] = (data[i + 2] & 0xfc) | ((charCode >> 4) & 0x03);
    data[i + 3] = (data[i + 3] & 0xfc) | ((charCode >> 6) & 0x03);

    textIndex++;
  }

  if (textIndex < encryptedText.length) {
    alert("Teks terlalu panjang untuk disisipkan ke dalam gambar.");
    return;
  }

  ctxAfter.canvas.width = canvasBefore.width;
  ctxAfter.canvas.height = canvasBefore.height;
  ctxAfter.putImageData(imgData, 0, 0);
  alert("Teks berhasil disisipkan ke dalam gambar!");
};

submitBtn.addEventListener("click", handleCombine);

// Fungsi untuk reset form dan canvas
resetBtn.addEventListener("click", () => {
  plainText.value = "";
  key.value = "";
  cipherText.textContent = "";
  coverImage.value = "";
  ctxBefore.clearRect(0, 0, canvasBefore.width, canvasBefore.height);
  ctxAfter.clearRect(0, 0, canvasAfter.width, canvasAfter.height);
  displayResult.classList.add("hidden");
  previewStego.classList.add("hidden");
});

// Fungsi untuk mendownload gambar yang dihasilkan
function downloadSteganoImage() {
  const canvas = document.getElementById("canvasAfter");
  if (!canvas) {
    alert("Tidak ada gambar terenkripsi untuk diunduh.");
    return;
  }

  const link = document.createElement("a");
  link.download = "stegano-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

downloadImg.addEventListener("click", downloadSteganoImage);

// DEKRIPSI

const handleStegoImage = async (input) => {
  const validExtensions = ["gif", "png", "bmp", "jpeg", "jpg"];
  const extension = stegoImageInput.value.split(".").pop().toLowerCase();

  if (validExtensions.includes(extension) && input.files && input.files[0]) {
    const reader = new FileReader();
    const img = new Image();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = () => {
      canvasDecryptPreview.width = img.width;
      canvasDecryptPreview.height = img.height;
      ctxDecryptPreview.drawImage(img, 0, 0, img.width, img.height);
      console.log(
        "Gambar berhasil dimuat untuk dekripsi dengan ukuran:",
        img.width,
        img.height
      );
    };

    previewDecrypt.classList.remove("hidden");

    img.onerror = () => {
      alert("Gagal memuat gambar. Silakan coba lagi.");
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    alert("Silakan unggah file gambar dengan format yang benar!");
  }
};

//fungsi untuk mendekripsi gambar
const decodeImage = (imgData) => {
  if (!imgData || !imgData.data || imgData.data.length === 0) {
    console.error("Data gambar tidak valid.");
    return "";
  }

  const data = imgData.data;
  let charCode = 0;
  let bitCount = 0;
  let extractedText = "";

  for (let i = 0; i < data.length; i += 4) {
    const part1 = data[i] & 0x03;
    const part2 = (data[i + 1] & 0x03) << 2;
    const part3 = (data[i + 2] & 0x03) << 4;
    const part4 = (data[i + 3] & 0x03) << 6;

    charCode |= part1 | part2 | part3 | part4;
    bitCount += 8;

    if (bitCount === 8) {
      const char = String.fromCharCode(charCode);
      extractedText += char;
      charCode = 0;
      bitCount = 0;
    }
  }

  console.log("Teks yang diekstrak dari gambar:", extractedText);

  const reversedTable = Object.fromEntries(
    Object.entries(substitutionTable).map(([key, value]) => [value, key])
  );

  // Memvalidasi teks yang diekstrak
  let validText = "";
  for (let i = 0; i < extractedText.length; i += 2) {
    let segment = extractedText.substring(i, i + 2);
    if (reversedTable[segment] || segment === "  ") {
      validText += segment;
    }
  }

  console.log("Teks yang valid:", validText);
  return validText;
};

// Menambahkan event listener untuk input changes
decryptBtn.addEventListener("click", () => {
  if (!keyDecrypt.value) {
    alert("Masukkan kunci dekripsi!");
    return;
  }

  const imgData = ctxDecryptPreview.getImageData(
    0,
    0,
    canvasDecryptPreview.width,
    canvasDecryptPreview.height
  );
  if (!imgData || !imgData.data || imgData.data.length === 0) {
    alert("Canvas tidak memiliki data gambar.");
    return;
  }

  const extractedText = decodeImage(imgData);
  const shift = parseInt(keyDecrypt.value);
  const decryptedText = decryptWithShift(extractedText, shift);
  console.log("Decrypted text:", decryptedText);

  resultDecrypt.textContent = decryptedText;

  decryptResultText.classList.remove("hidden");
});

clearBtn.addEventListener("click", () => {
  stegoImageInput.value = "";
  keyDecrypt.value = "";
  resultDecrypt.textContent = "";
  ctxDecryptPreview.clearRect(
    0,
    0,
    canvasDecryptPreview.width,
    canvasDecryptPreview.height
  );
  previewDecrypt.classList.add("hidden");
  decryptResultText.classList.add("hidden");
});
