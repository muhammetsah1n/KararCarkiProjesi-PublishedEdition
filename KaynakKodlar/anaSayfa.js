document.getElementById("logo").onclick = function(){
    window.location = "index.html";
};

document.getElementById("iletisim").onclick = function(){
    window.location = "iletisim.html";
};

document.getElementById("besliSecenek").onclick = function(){
    window.location = "besliGirdiSayfasi.html";
};

document.getElementById("sekizliSecenek").onclick = function(){
    window.location = "sekizliGirdiSayfasi.html";
};

const popup = document.getElementById("popup");
const sayiGirdisi = document.getElementById("sayiGirdisi");
const sonucMetni = document.getElementById("sonucMetni");

document.getElementById("ozelSecenek").onclick = function(){
    popup.style.display = "block";
    sonucMetni.textContent = "Kaç adet girdi girmek istiyorsunuz?";
    sonucMetni.classList.remove("uyari");
    sayiGirdisi.value = "";
    sayiGirdisi.focus();
};

document.getElementById("closeButton").onclick = function(){
    popup.style.display = "none";
};

function devamEt(){

    const sayi = Number(sayiGirdisi.value);

    if (!Number.isInteger(sayi) || sayi < 2 || sayi > 12){
        sonucMetni.textContent = "Lütfen 2 ile 12 arasında bir sayı giriniz.";
        sonucMetni.classList.add("uyari");
        sayiGirdisi.focus();
        return;
    }

    window.location = "ozelGirdiSayfasi.html?sayi=" + sayi;

}

document.getElementById("devamButonu").onclick = devamEt;

// Sadece rakam yazılabilsin.
sayiGirdisi.oninput = function(){
    sayiGirdisi.value = sayiGirdisi.value.replace(/[^0-9]/g, "");
};

sayiGirdisi.onkeydown = function(e){
    if (e.key === "Enter") devamEt();
};