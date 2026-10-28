import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, doc, query, orderBy, limit, getDocs, writeBatch, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseAyarlari } from "./firebaseAyarlari.js";

const db = getFirestore(initializeApp(firebaseAyarlari));

const form = document.getElementById("yorumFormu");
const yorumlarKutusu = document.getElementById("yorumlar");
const gonderButonu = document.getElementById("button");

function ikiHane(sayi){
    return String(sayi).padStart(2, "0");
}

// Eski PHP sürümündeki gibi: 28/10/2026  19.41
function tarihYaz(tarih){
    return ikiHane(tarih.getDate())+"/"+ikiHane(tarih.getMonth()+1)+"/"+tarih.getFullYear()
        +"  "+ikiHane(tarih.getHours())+"."+ikiHane(tarih.getMinutes());
}

function yorumKutusuOlustur(yorum){

    const commentBox = document.createElement("div");
    commentBox.className = "commentBox";

    const name = document.createElement("div");
    name.className = "name";

    const resim = document.createElement("img");
    resim.src = "fotograflar/pp.png";
    resim.height = 19;
    resim.width = 19;

    const date = document.createElement("div");
    date.className = "date";
    date.textContent = yorum.created_at ? tarihYaz(yorum.created_at.toDate()) : "";

    name.append(resim, " "+yorum.name+" "+yorum.surname, date);

    const comment = document.createElement("div");
    comment.className = "comment";
    comment.textContent = yorum.message;

    commentBox.append(name, comment);
    return commentBox;

}

async function yorumlariYukle(){

    const sonuc = await getDocs(query(collection(db, "yorumlar"), orderBy("created_at", "desc"), limit(8)));

    yorumlarKutusu.replaceChildren(...sonuc.docs.map(belge => yorumKutusuOlustur(belge.data())));

}

form.addEventListener("submit", async (olay) => {

    olay.preventDefault();
    gonderButonu.disabled = true;

    try {

        // Yorum herkese açık, e-posta ise ayrı ve okunamayan bir koleksiyonda tutulur
        const yorumBelgesi = doc(collection(db, "yorumlar"));
        const batch = writeBatch(db);

        const alanlar = form.elements;

        batch.set(yorumBelgesi, {
            name: alanlar["name"].value.trim(),
            surname: alanlar["surname"].value.trim(),
            message: alanlar["message"].value,
            created_at: serverTimestamp()
        });

        batch.set(doc(db, "epostalar", yorumBelgesi.id), {
            email: alanlar["email"].value.trim(),
            created_at: serverTimestamp()
        });

        await batch.commit();

        form.reset();
        popup.style.display = "block";
        await yorumlariYukle();

    }
    catch (hata) {

        console.error(hata);
        alert("Yorumunuz gönderilemedi, lütfen tekrar deneyiniz.");

    }

    gonderButonu.disabled = false;

});

yorumlariYukle().catch(hata => console.error("Yorumlar yüklenemedi:", hata));
