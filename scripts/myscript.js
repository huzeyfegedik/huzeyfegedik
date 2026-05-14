document.addEventListener('DOMContentLoaded', function() {
    let sepet = [];
    const sepetListesi = document.getElementById('sepet-listesi');
    const toplamFiyatGosterge = document.getElementById('toplam-fiyat');
    const urunButonlari = document.querySelectorAll('.buy-button');
    const silButonu = document.getElementById('sepeti-sil');
    const bitirButonu = document.getElementById('alisverisi-bitir');

    // 1. ÜRÜN EKLEME
    urunButonlari.forEach(buton => {
        buton.addEventListener('click', function() {
            const kart = this.closest('.product-card');
            const urunAdi = kart.querySelector('h3').innerText;
            const fiyatMetni = kart.querySelector('.price').innerText;
            const fiyatSayi = parseInt(fiyatMetni.replace(/[^0-9]/g, ''));

            sepet.push({ ad: urunAdi, fiyat: fiyatSayi });
            guncelleSepetUI();
        });
    });

    // 2. SEPETİ TEMİZLEME
    if (silButonu) {
        silButonu.addEventListener('click', function() {
            if (sepet.length > 0) {
                sepet = [];
                guncelleSepetUI();
            }
        });
    }

    // 3. ALIŞVERİŞİ BİTİRME (KART BİLGİSİ PANELİ)
    if (bitirButonu) {
        bitirButonu.addEventListener('click', function() {
            if (sepet.length > 0) {
                // Ödeme Formu HTML yapısı
                const odemeFormu = `
                    <div id="odeme-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; z-index:9999;">
                        <div style="background:white; padding:30px; border-radius:10px; width:400px; box-shadow:0 0 20px rgba(0,0,0,0.5);">
                            <h2 style="margin-bottom:20px; color:#2c3e50; text-align:center;">Ödeme Bilgileri</h2>
                            
                            <label style="display:block; margin-bottom:5px;">Kart Sahibi Adı Soyadı</label>
                            <input type="text" placeholder="Ad Soyad" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #ddd; border-radius:5px;">
                            
                            <label style="display:block; margin-bottom:5px;">Kart Numarası</label>
                            <input type="text" maxlength="16" placeholder="0000 0000 0000 0000" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #ddd; border-radius:5px;">
                            
                            <div style="display:flex; gap:10px;">
                                <div style="flex:1;">
                                    <label style="display:block; margin-bottom:5px;">Son Kullanma</label>
                                    <input type="text" placeholder="AA/YY" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
                                </div>
                                <div style="flex:1;">
                                    <label style="display:block; margin-bottom:5px;">CVV</label>
                                    <input type="text" maxlength="3" placeholder="123" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
                                </div>
                            </div>

                            <div style="margin-top:25px; display:flex; gap:10px;">
                                <button id="odeme-iptal" style="flex:1; padding:12px; background:#e74c3c; color:white; border:none; border-radius:5px; cursor:pointer;">İptal</button>
                                <button id="odeme-onay" style="flex:1; padding:12px; background:#27ae60; color:white; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">Ödemeyi Yap</button>
                            </div>
                        </div>
                    </div>
                `;

                // Formu sayfaya ekle
                document.body.insertAdjacentHTML('beforeend', odemeFormu);

                // Form butonlarını çalıştır
                document.getElementById('odeme-iptal').addEventListener('click', () => {
                    document.getElementById('odeme-overlay').remove();
                });

                document.getElementById('odeme-onay').addEventListener('click', () => {
                    alert("Ödemeniz başarıyla alındı! Siparişiniz hazırlanıyor.");
                    document.getElementById('odeme-overlay').remove();
                    sepet = [];
                    guncelleSepetUI();
                });

            } else {
                alert("Ödeme yapmak için önce sepete ürün ekleyin!");
            }
        });
    }

    // 4. ARAYÜZÜ GÜNCELLEME
    function guncelleSepetUI() {
        sepetListesi.innerHTML = "";
        let toplam = 0;

        if (sepet.length === 0) {
            sepetListesi.innerHTML = '<li style="list-style:none; margin:0; padding:0; color:#888;">Henüz ürün eklenmedi.</li>';
            toplamFiyatGosterge.innerText = "0";
            return;
        }

        sepet.forEach((urun) => {
            const li = document.createElement('li');
            li.style.listStyle = "none";
            li.style.margin = "0";
            li.style.padding = "2px 0";
            li.style.borderBottom = "1px solid #ddd";
            li.innerHTML = `<strong>${urun.ad}</strong> - ${urun.fiyat.toLocaleString('tr-TR')} TL`;
            sepetListesi.appendChild(li);
            toplam += urun.fiyat;
        });

        toplamFiyatGosterge.innerText = toplam.toLocaleString('tr-TR');
    }
});