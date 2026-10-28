document.getElementById("logo").onclick = function(){
    window.location = "index.html";
};

document.getElementById("iletisim").onclick = function(){
    window.location = "iletisim.html";
};

document.getElementById("button").onclick = function(){

    for (const secenek of document.querySelectorAll(".secenek")){
        if (secenek.value.trim() === ""){
            alert("Lütfen tüm seçenekleri doldurunuz.");
            secenek.focus();
            return;
        }
    }

    localStorage.setItem("secenek1", document.getElementById("secenek1").value);
    localStorage.setItem("secenek2", document.getElementById("secenek2").value);
    localStorage.setItem("secenek3", document.getElementById("secenek3").value);
    localStorage.setItem("secenek4", document.getElementById("secenek4").value);
    localStorage.setItem("secenek5", document.getElementById("secenek5").value);

    window.location = "besliCarkSayfasi.html";

};