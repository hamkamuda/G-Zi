let databaseMakanan = []
let daftarMakan = []
let makananTerpilih = null

fetch("DaftarBahanMakanan.json")
.then(res=>res.json())
.then(data=>{

databaseMakanan = data

})

document.getElementById("searchMakanan").addEventListener("input",function(){

let keyword = this.value.toLowerCase()

let hasil = databaseMakanan.filter(m =>
m["Nama Bahan"].toLowerCase().includes(keyword)
)

let container = document.getElementById("hasilPencarian")

container.innerHTML = ""

hasil.slice(0,20).forEach(m=>{

let div = document.createElement("div")

div.className="itemMakanan"

div.textContent = m["Nama Bahan"]

div.onclick=function(){

makananTerpilih = m

document.getElementById("searchMakanan").value = m["Nama Bahan"]

container.innerHTML=""

}

container.appendChild(div)

})

})

function tambahMakanan(){

if(!makananTerpilih) return

let berat = parseFloat(document.getElementById("beratMakanan").value)

if(!berat) return

let faktor = berat / 100

let item = {

nama : makananTerpilih["Nama Bahan"],
berat : berat,

energi : parseFloat(makananTerpilih["Energi (Kkal)"]) * faktor,
protein : parseFloat(makananTerpilih["Protein (g)"]) * faktor,
lemak : parseFloat(makananTerpilih["Lemak (g)"]) * faktor,
karbo : parseFloat(makananTerpilih["Karbohidrat (g)"]) * faktor,
kalsium : parseFloat(makananTerpilih["Kalsium (mg)"]) * faktor,
zatbesi : parseFloat(makananTerpilih["Besi (mg)"]) * faktor

}

daftarMakan.push(item)

renderTabel()

}

function tambahManual(){

let item = {

nama : document.getElementById("namaManual").value,
berat : parseFloat(document.getElementById("beratManual").value),

energi : parseFloat(document.getElementById("energiManual").value) || 0,
protein : parseFloat(document.getElementById("proteinManual").value) || 0,
lemak : parseFloat(document.getElementById("lemakManual").value) || 0,
karbo : parseFloat(document.getElementById("karboManual").value) || 0,
kalsium : parseFloat(document.getElementById("kalsiumManual").value) || 0,
zatbesi : parseFloat(document.getElementById("zatbesiManual").value) || 0

}

daftarMakan.push(item)

renderTabel()

}

function renderTabel(){

let tbody = document.querySelector("#tabelMakanan tbody")

tbody.innerHTML=""

daftarMakan.forEach((m,i)=>{

let row=document.createElement("tr")

row.innerHTML=`

<td>${m.nama}</td>
<td>${m.berat}</td>
<td>${m.energi.toFixed(2)}</td>
<td>${m.protein.toFixed(2)}</td>
<td>${m.lemak.toFixed(2)}</td>
<td>${m.karbo.toFixed(2)}</td>
<td>${m.kalsium.toFixed(2)}</td>
<td>${m.zatbesi.toFixed(2)}</td>

<td>
<button onclick="editMakanan(${i})">Edit</button>
<button onclick="hapusMakanan(${i})">Hapus</button>
</td>

`

tbody.appendChild(row)

})

hitungTotal()

}

function hapusMakanan(index){

daftarMakan.splice(index,1)

renderTabel()

}

function editMakanan(index){

let m = daftarMakan[index]

let nama = prompt("Nama makanan",m.nama)
let berat = prompt("Berat",m.berat)
let energi = prompt("Energi",m.energi)
let protein = prompt("Protein",m.protein)
let lemak = prompt("Lemak",m.lemak)
let karbo = prompt("Karbo",m.karbo)
let kalsium = prompt("Kalsium",m.kalsium)
let zatbesi = prompt("Zat Besi",m.zatbesi)

daftarMakan[index]={

nama:nama,
berat:parseFloat(berat),

energi:parseFloat(energi),
protein:parseFloat(protein),
lemak:parseFloat(lemak),
karbo:parseFloat(karbo),
kalsium:parseFloat(kalsium),
zatbesi:parseFloat(zatbesi)

}

renderTabel()

}

function hitungTotal(){

let total={

energi:0,
protein:0,
lemak:0,
karbo:0,
kalsium:0,
zatbesi:0

}

daftarMakan.forEach(m=>{

total.energi+=m.energi
total.protein+=m.protein
total.lemak+=m.lemak
total.karbo+=m.karbo
total.kalsium+=m.kalsium
total.zatbesi+=m.zatbesi

})

document.getElementById("totalGizi").innerHTML=`

Energi : ${total.energi.toFixed(2)} kkal <br>
Protein : ${total.protein.toFixed(2)} g <br>
Lemak : ${total.lemak.toFixed(2)} g <br>
Karbohidrat : ${total.karbo.toFixed(2)} g <br>
Kalsium : ${total.kalsium.toFixed(2)} mg <br>
Zat Besi : ${total.zatbesi.toFixed(2)} mg

`

}
