document.getElementById("logo").onclick = function() {
    window.location = "index.html";
};

document.getElementById("iletisim").onclick = function() {
    window.location = "iletisim.html";
};

// Seçenek sayısı ana sayfadaki pop up'tan "?sayi=N" olarak gelir.
const sayi = Number(new URLSearchParams(window.location.search).get("sayi"));

if (!Number.isInteger(sayi) || sayi < 2 || sayi > 12) {
    window.location = "index.html";
}

document.getElementById("adet").textContent = sayi;

const secenekler = document.getElementById("secenekler");

let kayitliSecenekler = [];
try {
    kayitliSecenekler = JSON.parse(localStorage.getItem("ozelSecenekler")) || [];
} catch (e) {}

for (let i = 0; i < sayi; i++) {
    const girdi = document.createElement("input");
    girdi.type = "text";
    girdi.maxLength = 20;
    girdi.placeholder = "Seçenek " + (i + 1);
    girdi.className = "secenek";
    girdi.autocomplete = "off";
    girdi.value = kayitliSecenekler[i] || "";
    secenekler.appendChild(girdi);
}

document.getElementById("button").onclick = function() {

    for (const secenek of secenekler.querySelectorAll(".secenek")) {
        if (secenek.value.trim() === "") {
            alert("Lütfen tüm seçenekleri doldurunuz.");
            secenek.focus();
            return;
        }
    }

    const degerler = Array.from(secenekler.querySelectorAll(".secenek"), girdi => girdi.value);
    localStorage.setItem("ozelSecenekler", JSON.stringify(degerler));

    window.location = "ozelCarkSayfasi.html";

};
