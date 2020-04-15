/*! SVG Türkiye Haritası | MIT Lisans | dnomak.com */

function svgturkiyeharitasi() {
  const element = document.querySelector('#svg-turkiye-haritasi');
  const info = document.querySelector('.il-isimleri');
  const il_info = document.querySelector('.il-info');

  // html dosyasinda yeni acilan il'in path'ine <il-adi>-path diye bir id eklenmeli
  // TODO: daha iyi bir cozum
  const aktif_iller_id = ['istanbul-asya', 'istanbul-avrupa', 'ankara', 'mersin', 'eskisehir', 'artvin-hopa', 'artvin-kemalpasa',
                          'kocaeli', 'trabzon', 'canakkale', 'bursa', 'izmir', 'giresun', 'samsun',
                          'adana', 'gaziantep'];
  const mor_mekan_iller_id = ['istanbul-asya', 'istanbul-avrupa', 'ankara'];
  const aktif_iller_adres = ['Caferağa Mahallesi, Kuzu Kestane Sokak, Moran Apartmanı, Daire:7, Kadıköy',
                             'Caferağa Mahallesi, Kuzu Kestane Sokak, Moran Apartmanı, Daire:7, Kadıköy',
                             'Kızılırmak Caddesi, No:5, Daire:2, Çankaya'];
  const aktif_iller_no = ['0539 813 78 73','0539 813 78 73','0545 913 48 31', '0537 389 98 74', '0534 229 38 73', '0531 369 59 90', '0536 454 18 91',
                          '0538 233 55 99', '0506 951 50 64', '0544 508 60 96', '0541 298 81 31', '0553 944 12 14', '0535 068 85 40', '0506 901 00 37',
                          '0544 970 24 07', '0553 583 36 87'];
  
  aktif_iller_id.forEach(id => {
    if (id == 'artvin-hopa' || id == 'artvin-kemalpasa') {
      document.getElementById('artvin-path').style.fill = '#591E87';
    } else {  
      console.log(document.getElementById(id + '-path'))
      document.getElementById(id + '-path').style.fill = '#591E87';
    }
  })

  element.addEventListener(
    'mouseover',
    function (event) {
      if (event.target.tagName === 'path' && event.target.parentNode.id !== 'guney-kibris') {
        console.log(event.target.parentNode.getAttribute('id'))
        if (mor_mekan_iller_id.includes(event.target.parentNode.id)) {
          info.innerHTML = [
            '<div>',
            event.target.parentNode.getAttribute('data-iladi'),
            '<p>İletişim Bilgileri:',
            '<ul>',
            '<li> Adres: ', aktif_iller_adres[aktif_iller_id.indexOf(event.target.parentNode.id)],
            '<li> Telefon Numarası: ', aktif_iller_no[aktif_iller_id.indexOf(event.target.parentNode.id)],
            '</ul>',
            '</p>',
            '<p>Katılmak için tıkla!</p>',
            '</div>'
          ].join('');

        } else if (event.target.parentNode.id == 'artvin') {
          info.innerHTML = [
            '<div>',
            event.target.parentNode.getAttribute('data-iladi'),
            '<p>İletişim Bilgileri:',
            '<ul>',
            '<li> Hopa Telefon Numarası: ', aktif_iller_no[aktif_iller_id.indexOf('artvin-hopa')],
            '<li> Kemalpaşa Telefon Numarası: ', aktif_iller_no[aktif_iller_id.indexOf('artvin-kemalpasa')],
            '</ul>',
            '</p>',
            '<p>Katılmak için tıkla!</p>',
            '</div>'
          ].join('');

        } else if (aktif_iller_id.includes(event.target.parentNode.id)) {
          info.innerHTML = [
            '<div>',
            event.target.parentNode.getAttribute('data-iladi'),
            '<p>İletişim Bilgileri:',
            '<ul>',
            '<li> Telefon Numarası: ', aktif_iller_no[aktif_iller_id.indexOf(event.target.parentNode.id)],
            '</ul>',
            '</p>',
            '<p>Katılmak için tıkla!</p>',
            '</div>'
          ].join('');

        } else {
          info.innerHTML = [
            '<div>',
            event.target.parentNode.getAttribute('data-iladi'),
            '<p>Bu ilimizde henüz Kadın Savunma Ağı bulunmamaktadır.</p>',
            '<p>Kurmak için tıkla!</p>',
            '</div>'
          ].join('');
        }
      }
    }
  );

  element.addEventListener(
    'mousemove',
    function (event) {
      info.style.top = event.pageY + 25 + 'px';
      info.style.left = event.pageX + 'px';
    }
  );

  element.addEventListener(
    'mouseout',
    function (event) {
      info.innerHTML = '';
    }
  );

  element.addEventListener(
    'click',
    function (event) {
      if (event.target.tagName === 'path') {
        const parent = event.target.parentNode;
        const id = parent.getAttribute('id');
    
        if (aktif_iller_id.includes(id)) {
          window.location.href = "https://kadinsavunmasi.org/kadin-savunma-agina-katil/";
        } else {
          window.location.href = "https://kadinsavunmasi.org/kadin-savunma-agini-nasil-kurarim/";
        }
        

      }
    }
  );
}
