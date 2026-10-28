document.getElementById("logo").onclick = function(){
    window.location = "index.html";
};

document.getElementById("iletisim").onclick = function(){
    window.location = "iletisim.html";
};

const RENKLER = ["#ed8aff", "#fc8a7f", "#faae34", "#eacf36", "#75c94f", "#4dd6b8",
                 "#60c2ef", "#8c98fe", "#ff9ec7", "#b5dd5a", "#f5b97a", "#c49bff"];

// Okun ucunun, çarkın merkezinden bakınca saat 12 yönünden saat yönünde açısı.
const OK_ACISI = 57;

let secenekler = [];
try {
    secenekler = JSON.parse(localStorage.getItem("ozelSecenekler")) || [];
} catch (e) {}

if (secenekler.length < 2){
    window.location = "index.html";
}

const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const dilimAcisi = 360 / secenekler.length;

const dilimler = secenekler.map((secenek, i) => {
    const renk = RENKLER[i % RENKLER.length];
    return renk + " " + (i * dilimAcisi) + "deg " + ((i + 1) * dilimAcisi) + "deg";
});
wheel.style.background = "conic-gradient(" + dilimler.join(", ") + ")";

const yaziBoyutu = secenekler.length <= 5 ? 24 : secenekler.length <= 8 ? 20 : 16;

secenekler.forEach((secenek, i) => {

    const ayirici = document.createElement("div");
    ayirici.className = "ayirici";
    ayirici.style.transform = "rotate(" + (i * dilimAcisi - 90) + "deg)";
    wheel.appendChild(ayirici);

    const yazi = document.createElement("div");
    yazi.className = "dilimYazisi";
    yazi.textContent = secenek;
    yazi.style.fontSize = yaziBoyutu + "px";
    yazi.style.transform = "rotate(" + (i * dilimAcisi + dilimAcisi / 2 - 90) + "deg)";
    wheel.appendChild(yazi);

});

var value = Math.ceil((Math.random()+0.2) * 3600);

spinButton.onclick = function(){

    wheel.style.transform = "rotate("+value+"deg)";

};

wheel.addEventListener('transitionend', () => {

    const okunAltindakiAci = (((OK_ACISI - value) % 360) + 360) % 360;
    const sonuc = Math.floor(okunAltindakiAci / dilimAcisi);

    document.getElementById("sonucMetni").textContent = "SONUÇ : "+secenekler[sonuc];

    popup.style.display = "block";

    value += Math.ceil((Math.random()+0.2) * 3600);

});

document.getElementById("closeButton").onclick = function(){
    popup.style.display = "none";
};
