let DaftarBahanMakanan=[]
let daftarMakanan=[]
let daftarZatGizi=[]

fetch("DaftarBahanMakanan.json")
.then(res=>res.json())
.then(data=>{

DaftarBahanMakanan=data

daftarZatGizi=Object.keys(data[0]).filter(
k=>k!=="Nama Bahan"
)

buatFormManual()
buatTabelTotal()

})

document.getElementById("inputCari").addEventListener("input",cariMakanan)

function cariMakanan(){

let input=document.getElementById("inputCari").value.toLowerCase()

let hasil=DaftarBahanMakanan.filter(b=>
b["Nama Bahan"].toLowerCase().includes(input)
).slice(0,10)

let html=""

hasil.forEach(h=>{

html+=`<li onclick="pilihMakanan('${h["Nama Bahan"]}')">${h["Nama Bahan"]}</li>`

})

document.getElementById("hasilCari").innerHTML=html

}

function pilihMakanan(nama){

document.getElementById("inputCari").value=nama
document.getElementById("hasilCari").innerHTML=""

}

function tambahMakananDatabase(){

let nama=document.getElementById("inputCari").value
let berat=parseFloat(document.getElementById("beratMakan").value)
let waktu=document.getElementById("waktuMakan").value

let bahan=DaftarBahanMakanan.find(
b=>b["Nama Bahan"]===nama
)

if(!bahan||!berat)return alert("Data belum lengkap")

let f=berat/100

let makanan={
nama:nama,
berat:berat,
waktu:waktu
}

daftarZatGizi.forEach(z=>{

makanan[z]=(parseFloat(bahan[z])||0)*f

})

daftarMakanan.push(makanan)

render()

}

function tambahManual(){

let nama=document.getElementById("manualNama").value
let berat=parseFloat(document.getElementById("manualBerat").value)

if(!nama||!berat)return alert("Isi nama dan berat")

let makanan={
nama:nama,
berat:berat,
waktu:"manual"
}

daftarZatGizi.forEach(z=>{

let val=parseFloat(document.getElementById("manual_"+z).value)||0
makanan[z]=val*(berat/100)

})

daftarMakanan.push(makanan)

render()

}

function buatFormManual(){

let html=""

daftarZatGizi.forEach(z=>{

html+=`
<div class="form-row">
<label style="width:200px">${z}</label>
<input type="number" id="manual_${z}" placeholder="${z}">
</div>
`

})

document.getElementById("formManualGizi").innerHTML=html

}

function render(){

renderTabel()
hitungTotal()

}

function renderTabel(){

let html=`
<table>
<tr>
<th>Nama</th>
<th>Berat</th>
<th>Waktu</th>
</tr>
`

daftarMakanan.forEach(m=>{

html+=`
<tr>
<td>${m.nama}</td>
<td>${m.berat} g</td>
<td>${m.waktu}</td>
</tr>
`

})

html+="</table>"

document.getElementById("tabelMakanan").innerHTML=html

}

function buatTabelTotal(){

let html=""

daftarZatGizi.forEach(z=>{

html+=`
<tr>
<td>${z}</td>
<td id="total_${z}">0</td>
</tr>
`

})

document.getElementById("bodyTotalGizi").innerHTML=html

}

function hitungTotal(){

let total={}

daftarZatGizi.forEach(z=>total[z]=0)

daftarMakanan.forEach(m=>{

daftarZatGizi.forEach(z=>{

total[z]+=m[z]||0

})

})

daftarZatGizi.forEach(z=>{

document.getElementById("total_"+z).innerText=total[z].toFixed(2)

})

}
