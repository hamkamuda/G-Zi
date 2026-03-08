let databaseMakanan = []
let daftarMakan = []
let editIndex = null

fetch("DaftarBahanMakanan.json")
.then(res=>res.json())
.then(data=>{

databaseMakanan = data

let select = document.getElementById("pilihMakanan")

data.forEach((m,i)=>{

let option = document.createElement("option")
option.value = i
option.textContent = m.nama

select.appendChild(option)

})

})

function tambahMakanan(){

let index = document.getElementById("pilihMakanan").value
let berat = parseFloat(document.getElementById("beratMakanan").value)

let makanan = databaseMakanan[index]

let faktor = berat / 100

let item = {

nama:makanan.nama,
berat:berat,
energi:makanan.energi * faktor,
protein:makanan.protein * faktor,
lemak:makanan.lemak * faktor,
karbo:makanan.karbohidrat * faktor,
kalsium:makanan.kalsium * faktor,
zatbesi:makanan.zat_besi * faktor

}

daftarMakan.push(item)

renderTabel()
}

function tambahManual(){

let item = {

nama:document.getElementById("namaManual").value,
berat:parseFloat(document.getElementById("beratManual").value),
energi:parseFloat(document.getElementById("energiManual").value),
protein:parseFloat(document.getElementById("proteinManual").value),
lemak:parseFloat(document.getElementById("lemakManual").value),
karbo:parseFloat(document.getElementById("karboManual").value),
kalsium:parseFloat(document.getElementById("kalsiumManual").value),
zatbesi:parseFloat(document.getElementById("zatbesiManual").value)

}

daftarMakan.push(item)

renderTabel()

}

function renderTabel(){

let tbody = document.querySelector("#tabelMakanan tbody")

tbody.innerHTML = ""

daftarMakan.forEach((m,i)=>{

let row = `
<tr>

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

</tr>
`

tbody.innerHTML += row

})

hitungTotal()

}

function hitungTotal(){

let total = {

energi:0,
protein:0,
lemak:0,
karbo:0,
kalsium:0,
zatbesi:0

}

daftarMakan.forEach(m=>{

total.energi += m.energi
total.protein += m.protein
total.lemak += m.lemak
total.karbo += m.karbo
total.kalsium += m.kalsium
total.zatbesi += m.zatbesi

})

document.getElementById("totalGizi").innerHTML = `

Energi : ${total.energi.toFixed(2)} kcal <br>
Protein : ${total.protein.toFixed(2)} g <br>
Lemak : ${total.lemak.toFixed(2)} g <br>
Karbohidrat : ${total.karbo.toFixed(2)} g <br>
Kalsium : ${total.kalsium.toFixed(2)} mg <br>
Zat Besi : ${total.zatbesi.toFixed(2)} mg

`

}

function hapusMakanan(index){

daftarMakan.splice(index,1)

renderTabel()

}

function editMakanan(index){

let m = daftarMakan[index]

let nama = prompt("Nama",m.nama)
let berat = prompt("Berat",m.berat)
let energi = prompt("Energi",m.energi)
let protein = prompt("Protein",m.protein)
let lemak = prompt("Lemak",m.lemak)
let karbo = prompt("Karbo",m.karbo)
let kalsium = prompt("Kalsium",m.kalsium)
let zatbesi = prompt("Zat Besi",m.zatbesi)

daftarMakan[index] = {

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
