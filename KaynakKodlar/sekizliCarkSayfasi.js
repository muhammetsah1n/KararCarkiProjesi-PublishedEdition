document.getElementById("logo").onclick = function(){
    window.location = "index.html";
};

document.getElementById("iletisim").onclick = function(){
    window.location = "iletisim.html";
};

window.onload = function(){

    const secenek1 = localStorage.getItem("secenek1");
    const secenek2 = localStorage.getItem("secenek2");
    const secenek3 = localStorage.getItem("secenek3");
    const secenek4 = localStorage.getItem("secenek4");
    const secenek5 = localStorage.getItem("secenek5");
    const secenek6 = localStorage.getItem("secenek6");
    const secenek7 = localStorage.getItem("secenek7");
    const secenek8 = localStorage.getItem("secenek8");

    if (!secenek1 || !secenek2 || !secenek3 || !secenek4 || !secenek5 || !secenek6 || !secenek7 || !secenek8){
        window.location = "sekizliGirdiSayfasi.html";
        return;
    }

    document.getElementById("secenek1").textContent = secenek1;
    document.getElementById("secenek2").textContent = secenek2;
    document.getElementById("secenek3").textContent = secenek3;
    document.getElementById("secenek4").textContent = secenek4;
    document.getElementById("secenek5").textContent = secenek5;
    document.getElementById("secenek6").textContent = secenek6;
    document.getElementById("secenek7").textContent = secenek7;
    document.getElementById("secenek8").textContent = secenek8;

};

const wheel=document.querySelector(".wheel");
const spinButton=document.getElementById("spinButton");
var value = Math.ceil((Math.random()+0.2) * 3600);

spinButton.onclick = function(){

    wheel.style.transform = "rotate("+value+"deg)";

};

wheel.addEventListener('transitionend', () => {

    const secenek1 = document.getElementById("secenek1").innerText;
    const secenek2 = document.getElementById("secenek2").innerText;
    const secenek3 = document.getElementById("secenek3").innerText;
    const secenek4 = document.getElementById("secenek4").innerText;
    const secenek5 = document.getElementById("secenek5").innerText;
    const secenek6 = document.getElementById("secenek6").innerText;
    const secenek7 = document.getElementById("secenek7").innerText;
    const secenek8 = document.getElementById("secenek8").innerText;
    
    var sonuc=Math.floor( ((value+9) % 360 ) / (360/8));

    if (sonuc==0){
        document.getElementById("sonucMetni").textContent = "SONUÇ : "+secenek3;
    }
    else if (sonuc==1){
        document.getElementById("sonucMetni").textContent = "SONUÇ : "+secenek2;
    }
    else if (sonuc==2){
        document.getElementById("sonucMetni").textContent = "SONUÇ : "+secenek1;
    }
    else if (sonuc==3){
        document.getElementById("sonucMetni").textContent = "SONUÇ : "+secenek8;
    }
    else if (sonuc==4){
        document.getElementById("sonucMetni").textContent = "SONUÇ : "+secenek7;
    }
    else if (sonuc==5){
        document.getElementById("sonucMetni").textContent = "SONUÇ : "+secenek6;
    }
    else if (sonuc==6){
        document.getElementById("sonucMetni").textContent = "SONUÇ : "+secenek5;
    }
    else if (sonuc==7){
        document.getElementById("sonucMetni").textContent = "SONUÇ : "+secenek4;
    }
    
    popup.style.display = "block";

    value += Math.ceil((Math.random()+0.2) * 3600);

});

document.getElementById("closeButton").onclick = function(){
    popup.style.display = "none";
};