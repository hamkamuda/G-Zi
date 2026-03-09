let databaseMakanan=[]
let makananTerpilih=null
let daftarMakanan=[]

let makananManual = JSON.parse(localStorage.getItem("makananManual")) || []

fetch("DaftarBahanMakanan.json")
.then(res=>res.json())
.then(data=>{
databaseMakanan = data.concat(makananManual)
})

const input=document.getElementById("searchMakanan")
const hasil=document.getElementById("hasilPencarian")

input.addEventListener("input",function(){

let keyword=this.value.toLowerCase()

hasil.innerHTML=""

if(keyword.length<1)return

let list=databaseMakanan.filter(m=>
m["Nama Bahan"].toLowerCase().includes(keyword)
)

list.slice(0,15).forEach(m=>{

let div=document.createElement("div")
div.className="itemMakanan"
div.innerText=m["Nama Bahan"]

div.onclick=function(){

makananTerpilih=m
input.value=m["Nama Bahan"]
hasil.innerHTML=""

}

hasil.appendChild(div)

})

})

function tambahMakanan(){

if(!makananTerpilih)return alert("Pilih makanan")

let berat=parseFloat(document.getElementById("beratMakanan").value)
let faktor=berat/100

let data={

nama:makananTerpilih["Nama Bahan"],
berat:berat,

energi:(makananTerpilih["Energi (Kkal)"]||0)*faktor,
protein:(makananTerpilih["Protein (g)"]||0)*faktor,
lemak:(makananTerpilih["Lemak (g)"]||0)*faktor,
karbo:(makananTerpilih["Karbohidrat (g)"]||0)*faktor,
serat:(makananTerpilih["Serat (g)"]||0)*faktor,

kalium:(makananTerpilih["Kalium (mg)"]||0)*faktor,
fosfor:(makananTerpilih["Fosfor (mg)"]||0)*faktor,
natrium:(makananTerpilih["Natrium (mg)"]||0)*faktor,

vitA:(makananTerpilih["Retinol (mcg)"]||0)*faktor,
b1:(makananTerpilih["Thiamin (mg)"]||0)*faktor,
b2:(makananTerpilih["Riboflavin (mg)"]||0)*faktor,
vitC:(makananTerpilih["Vit-C (mg)"]||0)*faktor

}

daftarMakanan.push(data)

tampilkanTabel()

}

function tampilkanTabel(){

let tbody=document.getElementById("tabelMakanan")
tbody.innerHTML=""

daftarMakanan.forEach((m,i)=>{

let row=`<tr>

<td>${m.nama}</td>
<td>${m.berat}</td>
<td>${m.energi.toFixed(1)}</td>
<td>${m.protein.toFixed(1)}</td>
<td>${m.lemak.toFixed(1)}</td>
<td>${m.karbo.toFixed(1)}</td>
<td>${m.serat.toFixed(1)}</td>
<td>${m.kalium.toFixed(1)}</td>
<td>${m.fosfor.toFixed(1)}</td>
<td>${m.natrium.toFixed(1)}</td>
<td>${m.vitA.toFixed(1)}</td>
<td>${m.b1.toFixed(2)}</td>
<td>${m.b2.toFixed(2)}</td>
<td>${m.vitC.toFixed(1)}</td>

<td>
<button onclick="editMakanan(${i})">Edit</button>
<button onclick="hapusMakanan(${i})">Hapus</button>
</td>

</tr>`

tbody.innerHTML+=row

})

hitungTotal()

}

function hapusMakanan(i){
daftarMakanan.splice(i,1)
tampilkanTabel()
}

function editMakanan(i){

let beratBaru=prompt("Masukkan berat baru",daftarMakanan[i].berat)

let makanan=databaseMakanan.find(m=>
m["Nama Bahan"]==daftarMakanan[i].nama
)

let faktor=beratBaru/100

daftarMakanan[i]={

nama:makanan["Nama Bahan"],
berat:beratBaru,

energi:(makanan["Energi (Kkal)"]||0)*faktor,
protein:(makanan["Protein (g)"]||0)*faktor,
lemak:(makanan["Lemak (g)"]||0)*faktor,
karbo:(makanan["Karbohidrat (g)"]||0)*faktor,
serat:(makanan["Serat (g)"]||0)*faktor,

kalium:(makanan["Kalium (mg)"]||0)*faktor,
fosfor:(makanan["Fosfor (mg)"]||0)*faktor,
natrium:(makanan["Natrium (mg)"]||0)*faktor,

vitA:(makanan["Retinol (mcg)"]||0)*faktor,
b1:(makanan["Thiamin (mg)"]||0)*faktor,
b2:(makanan["Riboflavin (mg)"]||0)*faktor,
vitC:(makanan["Vit-C (mg)"]||0)*faktor

}

tampilkanTabel()

}

function hitungTotal(){

let total={
energi:0,protein:0,lemak:0,karbo:0,serat:0,
kalium:0,fosfor:0,natrium:0,
vitA:0,b1:0,b2:0,vitC:0
}

daftarMakanan.forEach(m=>{
for(let key in total){
total[key]+=m[key]
}
})

document.getElementById("totalEnergi").innerText=total.energi.toFixed(1)
document.getElementById("totalProtein").innerText=total.protein.toFixed(1)
document.getElementById("totalLemak").innerText=total.lemak.toFixed(1)
document.getElementById("totalKarbo").innerText=total.karbo.toFixed(1)
document.getElementById("totalSerat").innerText=total.serat.toFixed(1)
document.getElementById("totalKalium").innerText=total.kalium.toFixed(1)
document.getElementById("totalFosfor").innerText=total.fosfor.toFixed(1)
document.getElementById("totalNatrium").innerText=total.natrium.toFixed(1)
document.getElementById("totalVitA").innerText=total.vitA.toFixed(1)
document.getElementById("totalB1").innerText=total.b1.toFixed(2)
document.getElementById("totalB2").innerText=total.b2.toFixed(2)
document.getElementById("totalVitC").innerText=total.vitC.toFixed(1)

}

function tambahManual(){

let bahanBaru={

"Nama Bahan":document.getElementById("manualNama").value,

"Energi (Kkal)":document.getElementById("manualEnergi").value||0,
"Protein (g)":document.getElementById("manualProtein").value||0,
"Lemak (g)":document.getElementById("manualLemak").value||0,
"Karbohidrat (g)":document.getElementById("manualKarbo").value||0,
"Serat (g)":document.getElementById("manualSerat").value||0,

"Kalium (mg)":document.getElementById("manualKalium").value||0,
"Fosfor (mg)":document.getElementById("manualFosfor").value||0,
"Natrium (mg)":document.getElementById("manualNatrium").value||0,

"Retinol (mcg)":document.getElementById("manualVitA").value||0,
"Thiamin (mg)":document.getElementById("manualB1").value||0,
"Riboflavin (mg)":document.getElementById("manualB2").value||0,
"Vit-C (mg)":document.getElementById("manualVitC").value||0

}

makananManual.push(bahanBaru)
localStorage.setItem("makananManual",JSON.stringify(makananManual))

databaseMakanan.push(bahanBaru)

alert("Bahan makanan tersimpan permanen")

}
