 <script>
    let DaftarBahanMakanan = [];
    let daftarMakanan = [];

    fetch("DaftarBahanMakanan.json")
      .then(res => res.json())
      .then(data => DaftarBahanMakanan = data);

    function tampilkanOpsiBahan() {
      const input = document.getElementById("bahanF1").value.toLowerCase();
      const berat = parseFloat(document.getElementById("beratF1").value) || 100;
      const hasil = DaftarBahanMakanan.filter(item => item["Nama Bahan"].toLowerCase().includes(input));
      const list = document.getElementById("opsiBahan");
      list.innerHTML = hasil.map(h => <li onclick="pilihBahan('${h["Nama Bahan"].replace(/'/g, "\'")}', ${berat})">${h["Nama Bahan"]}</li>).join("");
    }

    function pilihBahan(nama, berat) {
      const hasil = DaftarBahanMakanan.find(item => item["Nama Bahan"] === nama);
      const f = berat / 100;
      const satuan = {
        "Air (ml)": "ml", "Energi (Kkal)": "kkal", "Protein (g)": "g", "Lemak (g)": "g", "Karbohidrat (g)": "g", "Serat (g)": "g", "Abu (g)": "g",
        "Kalsium (mg)": "mg", "Fosfor (mg)": "mg", "Besi (mg)": "mg", "Natrium (mg)": "mg", "Kalium (mg)": "mg",
        "Tembaga (mg)": "mg", "Seng (mg)": "mg", "Retinol (mcg)": "mcg", "B-Kar (mcg)": "mcg", "Kar-Total (mcg)": "mcg",
        "Thiamin (mg)": "mg", "Riboflavin (mg)": "mg", "Niasin (mg)": "mg", "Vit-C (mg)": "mg", "Berat Dapat Dimakan (%)": "%"
      };
      let detail = <h4>${nama} (${berat} gram)</h4><ul>;
      for (const key in hasil) {
        if (key !== "Nama Bahan") {
          const nilai = (parseFloat(hasil[key]) * f).toFixed(2);
          detail += <li>${key}: ${nilai} ${satuan[key] || ''}</li>;
        }
      }
      detail += '</ul>';
      document.getElementById("hasilF1").innerHTML = detail;
      document.getElementById("opsiBahan").innerHTML = "";
    }

    function cariPilihanKalori() {
      const input = document.getElementById("inputCari").value.toLowerCase();
      const hasil = DaftarBahanMakanan.filter(item => item["Nama Bahan"].toLowerCase().includes(input));
      const list = document.getElementById("pilihanKalori");
      list.innerHTML = hasil.map(h => <li onclick="setMakananInput('${h["Nama Bahan"].replace(/'/g, "\'")}')">${h["Nama Bahan"]}</li>).join("");
    }

    function setMakananInput(nama) {
      document.getElementById("inputCari").value = nama;
      document.getElementById("pilihanKalori").innerHTML = "";
    }

    function tambahMakananKeList() {
      const nama = document.getElementById("inputCari").value;
      const berat = parseFloat(document.getElementById("beratKalori").value);
      const waktu = document.getElementById("waktu").value;
      const bahan = DaftarBahanMakanan.find(item => item["Nama Bahan"] === nama);
      if (!bahan || isNaN(berat)) return alert("Data tidak valid atau belum dipilih.");
      const faktor = berat / 100;
      const energi = parseFloat(bahan["Energi (Kkal)"] || 0) * faktor;
      const protein = parseFloat(bahan["Protein (g)"] || 0) * faktor;
      const lemak = parseFloat(bahan["Lemak (g)"] || 0) * faktor;
      const karbo = parseFloat(bahan["Karbohidrat (g)"] || 0) * faktor;
      daftarMakanan.push({ nama, berat, energi, protein, lemak, karbo, waktu });
      tampilkanTabelKalori();
    }

    function tampilkanTabelKalori() {
      const grup = {};
      daftarMakanan.forEach(item => {
        if (!grup[item.waktu]) grup[item.waktu] = [];
        grup[item.waktu].push(item);
      });

      let html = "";
      for (const waktu in grup) {
        let total = 0;
        html += <h4>${waktu}</h4><table><tr><th>Nama</th><th>Berat</th><th>Energi</th><th>Protein</th><th>Lemak</th><th>Karbohidrat</th></tr>;
        grup[waktu].forEach(i => {
          html += <tr><td>${i.nama}</td><td>${i.berat} g</td><td>${i.energi.toFixed(1)} kkal</td><td>${i.protein.toFixed(1)} g</td><td>${i.lemak.toFixed(1)} g</td><td>${i.karbo.toFixed(1)} g</td></tr>;
          total += i.energi;
        });
        html += <tr><td colspan="5"><strong>Total Kalori</strong></td><td><strong>${total.toFixed(1)} kkal</strong></td></tr></table>;
      }
      document.getElementById("hasilF2").innerHTML = html;
    }
  </script>
</body>
</html>
