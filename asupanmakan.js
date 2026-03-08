let databaseMakanan=[]
let makananTerpilih=null
let daftarMakanan=[]

fetch("DaftarBahanMakanan.json")
.then(res=>res.json())
.then(data=>{
databaseMakanan=data
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

energi:parseFloat(makananTerpilih["Energi (Kkal)"]||0)*faktor,
protein:parseFloat(makananTerpilih["Protein (g)"]||0)*faktor,
lemak:parseFloat(makananTerpilih["Lemak (g)"]||0)*faktor,
karbo:parseFloat(makananTerpilih["Karbohidrat (g)"]||0)*faktor,
serat:parseFloat(makananTerpilih["Serat (g)"]||0)*faktor,

kalium:parseFloat(makananTerpilih["Kalium (mg)"]||0)*faktor,
fosfor:parseFloat(makananTerpilih["Fosfor (mg)"]||0)*faktor,
natrium:parseFloat(makananTerpilih["Natrium (mg)"]||0)*faktor,

vitA:parseFloat(makananTerpilih["Retinol (mcg)"]||0)*faktor,
b1:parseFloat(makananTerpilih["Thiamin (mg)"]||0)*faktor,
b2:parseFloat(makananTerpilih["Riboflavin (mg)"]||0)*faktor,
vitC:parseFloat(makananTerpilih["Vit-C (mg)"]||0)*faktor

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

energi:parseFloat(makanan["Energi (Kkal)"]||0)*faktor,
protein:parseFloat(makanan["Protein (g)"]||0)*faktor,
lemak:parseFloat(makanan["Lemak (g)"]||0)*faktor,
karbo:parseFloat(makanan["Karbohidrat (g)"]||0)*faktor,
serat:parseFloat(makanan["Serat (g)"]||0)*faktor,

kalium:parseFloat(makanan["Kalium (mg)"]||0)*faktor,
fosfor:parseFloat(makanan["Fosfor (mg)"]||0)*faktor,
natrium:parseFloat(makanan["Natrium (mg)"]||0)*faktor,

vitA:parseFloat(makanan["Retinol (mcg)"]||0)*faktor,
b1:parseFloat(makanan["Thiamin (mg)"]||0)*faktor,
b2:parseFloat(makanan["Riboflavin (mg)"]||0)*faktor,
vitC:parseFloat(makanan["Vit-C (mg)"]||0)*faktor

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
