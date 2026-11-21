/* ORKINOS YÜZME SPOR KULÜBÜ - ortak şema: varsayılan metinler + yönetim paneli alanları
   Bu dosyayı değiştirmene gerek yok. Metinleri yönetim panelinden ya da config.js'ten değiştir. */
(function(){
var T='text',A='area',C='check',K='color',N='num',I='img',L='list',D='days';
var gal=function(src,poster,title,text,tag,place,type){return{src:src,poster:poster||'',type:type||'video',title:title,text:text,tag:tag,place:place||'gallery',show:'1'}};
window.SCHEMA=[
{id:'genel',g:'Genel',f:[
 {k:'site_name',l:'Kulüp adı',t:T,d:'Orkinos Yüzme Spor Kulübü'},
 {k:'city',l:'Şehir (Google başlığında görünür)',t:T,d:'Adana'},
 {k:'seo',l:'Google açıklaması',t:A,d:'4 yaş ve üzeri bireysel ve grup yüzme eğitimleri. Suyu sevdirme, sıfırdan yüzme öğrenme ve performans eğitimleri.'},
 {k:'msg_title',l:'WhatsApp mesaj başlığı',t:T,d:'Orkinos Yüzme Spor Kulübü - Ön Kayıt'},
 {k:'logo',l:'Logo (yuvarlak, kare görsel önerilir)',t:I,d:'img/logo.png'}]},
{id:'menu',g:'Menü yazıları',f:[
 {k:'m1',l:'Menü 1',t:T,d:'Ana sayfa'},{k:'m2',l:'Menü 2',t:T,d:'Hakkımızda'},{k:'m3',l:'Menü 3',t:T,d:'Eğitimler'},
 {k:'m4',l:'Menü 4',t:T,d:'Gelişim yolculuğu'},{k:'m5',l:'Menü 5',t:T,d:'Galeri'},{k:'m6',l:'Menü 6',t:T,d:'Nasıl başlarım?'},
 {k:'m7',l:'Menü 7',t:T,d:'Sık sorulanlar'},{k:'m8',l:'Menü düğmesi (kayıt)',t:T,d:'Formu doldur / Kayıt ol'}]},
{id:'hero',g:'Ana ekran',f:[
 {k:'h_title',l:'Büyük başlık',t:T,d:'Suya ilk adımını Orkinos\'la at.'},
 {k:'h_text',l:'Alt yazı',t:A,d:'4 yaş ve üzeri herkes için bilimsel temelli yüzme eğitimi. Suyu sevmeyi, korkuyu yenmeyi ve yüzmeyi birlikte öğreniyoruz.'},
 {k:'h_b1',l:'1. düğme',t:T,d:'Kayıt formunu doldur'},{k:'h_b2',l:'2. düğme (WhatsApp)',t:T,d:'WhatsApp\'tan yaz'},
 {k:'h_scroll',l:'Aşağı kaydır yazısı',t:T,d:'Derine dal'},
 {k:'marquee',l:'Kayan yazı bandı (her satır bir ifade)',t:A,d:'Suyu sev\nKorkuyu yen\nÖzgüven kazan\n4 yaş ve üzeri\nBilimsel temelli eğitim\nSıfırdan yüzme\nPerformans'}]},
{id:'intro',g:'Açılış animasyonu (okyanus)',f:[
 {k:'i_on',l:'Animasyon açık',t:C,d:'1'},{k:'i_sec',l:'Süre (5-10 saniye)',t:N,d:'7'},
 {k:'i_text',l:'Animasyondaki yazı',t:T,d:'Suya ilk adımını Orkinos\'la at'},
 {k:'i_skip',l:'"Geç" düğmesi göster',t:C,d:'1'},
 {k:'i_once',l:'Aynı ziyaretçide sadece ilk açılışta göster',t:C,d:'1'}]},
{id:'camp',g:'Kampanya',f:[
 {k:'c_on',l:'Kampanyayı ana sayfada göster',t:C,d:''},
 {k:'c_title',l:'Kampanya başlığı',t:T,d:'Yeni dönem kayıtları başladı'},
 {k:'c_text',l:'Kampanya açıklaması',t:A,d:'Kontenjanlar sınırlıdır. Bilgi için bize yazın.'},
 {k:'c_btn',l:'Kampanya düğmesi',t:T,d:'Hemen kayıt ol'},
 {k:'c_img',l:'Kampanya fotoğrafı',t:I,d:''}]},
{id:'stats',g:'Sayaçlar',f:[
 {k:'stats',l:'Sayaçlar (sayı artarak yükselir)',t:L,max:4,item:[{k:'n',l:'Sayı',t:N},{k:'suf',l:'Sayıdan sonra (+, % vb.)',t:T},{k:'l',l:'Açıklama',t:T}],
  d:[{n:'4',suf:'+',l:'yaş ve üzeri herkes'},{n:'4',suf:'',l:'gelişim seviyesi'},{n:'3',suf:'',l:'eğitim programı'}]}]},
{id:'about',g:'Hakkımızda',f:[
 {k:'a_title',l:'Başlık',t:T,d:'Hakkımızda'},
 {k:'a_text',l:'1. paragraf',t:A,d:'Orkinos Yüzme Spor Kulübü, 4 yaş ve üzeri herkese suyu sevdirmeyi, korkuyu yenmeyi ve özgüven kazanmayı hedefleyen bilimsel temelli bir yüzme kulübüdür.'},
 {k:'a_text2',l:'2. paragraf',t:A,d:'Eğitimlerimiz her yaş grubuna uygun planlanır. Sıfırdan yüzme öğrenmek isteyenler de performansını geliştirmek isteyenler de kendi seviyesinde ilerler.'},
 {k:'a_loc',l:'Havuz / konum yazısı',t:A,d:'Şehit Ahmet Mehmet Oruç Spor Lisesi kapalı yüzme havuzunda eğitim veriyoruz.'},
 {k:'a_btn',l:'Harita düğmesi',t:T,d:'Haritada aç'}]},
{id:'programs',g:'Eğitimler',f:[
 {k:'e_title',l:'Bölüm başlığı',t:T,d:'Her seviyeye uygun eğitim'},
 {k:'e_sub',l:'Bölüm alt yazısı',t:A,d:'İlk kez suya girenden performans hedefleyen yüzücüye kadar, her yaş grubu için planlı program.'},
 {k:'programs',l:'Eğitim kartları',t:L,max:8,item:[{k:'t',l:'Başlık',t:T},{k:'d',l:'Açıklama',t:A}],
  d:[{t:'Suyu sevdirme',d:'Korkuyu yenme ve özgüven kazanma odaklı, çocuğun hızına göre ilerleyen dersler.'},
     {t:'Sıfırdan yüzme',d:'Serbest, sırtüstü, kurbağalama ve kelebek stillerini adım adım öğrenin.'},
     {t:'Performans',d:'Teknik, dayanıklılık ve hız gelişimi için bilimsel temelli antrenman.'},
     {t:'Bireysel ilgi',d:'4 yaş ve üzeri her yaş grubuna uygun, kişiye özel eğitimler.'}]}]},
{id:'levels',g:'Gelişim yolculuğu (seviyeler)',f:[
 {k:'l_title',l:'Başlık',t:T,d:'Gelişim yolculuğu'},
 {k:'l_sub',l:'Alt yazı',t:A,d:'Seviye yaşa göre değil, becerilere göre belirlenir. Hazır olan bir üst seviyeye geçer.'},
 {k:'levels',l:'Seviyeler (sırayla)',t:L,max:6,item:[{k:'name',l:'Seviye adı',t:T},{k:'tag',l:'Kısa etiket',t:T},{k:'text',l:'Açıklama',t:A},{k:'skills',l:'Kazanımlar (her satıra bir tane)',t:A}],
  d:[{name:'Deniz Yıldızı',tag:'Başlangıç',text:'Suyla tanışma ve korkuyu yenme.',skills:'Suya güvenle girer\nYüzünü suya sokar\nEğitmenle birlikte hareket eder'},
     {name:'Denizatı',tag:'Denge',text:'Denge, nefes ve süzülme.',skills:'Nefesini sudan verir\nSırtüstü ve yüzüstü süzülür\nBacak vuruşunu öğrenir'},
     {name:'Yunus',tag:'Stil',text:'Stillerin temeli ve koordinasyon.',skills:'Kol-bacak koordinasyonu\nSerbest ve sırtüstü yüzer\nKesintisiz 25 metre'},
     {name:'Orkinos',tag:'Performans',text:'Teknik, dayanıklılık ve hız.',skills:'Dört stilde teknik\nDönüş ve çıkış\nHız ve dayanıklılık antrenmanı'}]}]},
{id:'quiz',g:'Seviye bulucu (test)',f:[
 {k:'q_on',l:'Seviye bulucuyu göster',t:C,d:'1'},
 {k:'q_title',l:'Başlık',t:T,d:'Hangi seviyedesin?'},
 {k:'q_sub',l:'Alt yazı',t:A,d:'Beş kısa soruyu cevapla. Sana uygun seviyeyi önerelim.'},
 {k:'q_age',l:'Yaş sorusu',t:T,d:'Yüzecek kişi kaç yaşında?'},
 {k:'q_list',l:'Beceri soruları (evet / hayır)',t:L,max:8,item:[{k:'t',l:'Soru',t:T}],
  d:[{t:'Suya yardımsız girip yüzünü ıslatabiliyor.'},{t:'Başı suyun altındayken nefesini verebiliyor.'},{t:'Sırtüstü süzülerek yatabiliyor.'},{t:'Kollarını ve bacaklarını kullanarak en az 10 metre gidebiliyor.'},{t:'Serbest ve sırtüstü stilde 25 metreyi durmadan yüzebiliyor.'}]},
 {k:'q_btn',l:'Sonuçtan sonra düğme',t:T,d:'Kayıt formunu doldur'}]},
{id:'swim',g:'Güvenli yüzücü kontrol listesi',f:[
 {k:'sw_on',l:'Kontrol listesini göster',t:C,d:'1'},
 {k:'sw_title',l:'Başlık',t:T,d:'Güvenli yüzücü kontrol listesi'},
 {k:'sw_sub',l:'Alt yazı',t:A,d:'Çocuğunuz bunları yapabiliyorsa suda kendini koruyabilir. İşaretleyerek ilerlemesini görün.'},
 {k:'sw_list',l:'Maddeler',t:L,max:8,item:[{k:'t',l:'Madde',t:T}],
  d:[{t:'Sırtüstü yıldız duruşunda 60 saniye kalabiliyor.'},{t:'30 saniye boyunca ayağı yere değmeden suda durabiliyor.'},{t:'Giysiyle suya girme ve yüzme deneyimi var.'},{t:'100 metreyi durmadan rahatça yüzebiliyor.'}]},
 {k:'sw_done',l:'Hepsi işaretlenince yazı',t:T,d:'Harika! Güvenli yüzücü olma yolunda çok iyi gidiyor.'}]},
{id:'steps',g:'Nasıl başlarım? (adımlar)',f:[
 {k:'st_on',l:'Bu bölümü göster',t:C,d:'1'},
 {k:'steps_title',l:'Başlık',t:T,d:'Üç adımda başla'},
 {k:'steps',l:'Adımlar',t:L,max:5,item:[{k:'t',l:'Başlık',t:T},{k:'d',l:'Açıklama',t:A}],
  d:[{t:'Seviyeni öğren',d:'Seviye bulucuyu doldur, hangi gruptan başlayacağını gör.'},{t:'Formu doldur',d:'Bilgilerini yaz, WhatsApp ile bize gönder.'},{t:'Seninle görüşelim',d:'Sana dönüş yapar, ders günü ve saatini birlikte belirleriz.'}]},
 {k:'st_btn',l:'Alttaki düğme',t:T,d:'Kayıt formuna git'}]},
{id:'texts',g:'Form ve düğme yazıları',f:[
 {k:'fm_name',l:'Form: ad soyad etiketi',t:T,d:'Ad soyad (öğrenci)'},{k:'fm_age',l:'Form: yaş etiketi',t:T,d:'Yaş'},
 {k:'fm_gender',l:'Form: cinsiyet başlığı',t:T,d:'Cinsiyet'},{k:'fm_girl',l:'Form: kız seçeneği',t:T,d:'Kız'},{k:'fm_boy',l:'Form: erkek seçeneği',t:T,d:'Erkek'},
 {k:'fm_prev',l:'Form: daha önce eğitim sorusu',t:T,d:'Daha önce yüzme eğitimi aldı mı?'},{k:'fm_no',l:'Form: "almadı" seçeneği',t:T,d:'Almadı'},{k:'fm_yes',l:'Form: "aldı" seçeneği',t:T,d:'Aldı'},
 {k:'fm_lvl',l:'Form: seviye başlığı',t:T,d:'Seviyesi'},{k:'fm_tel',l:'Form: telefon etiketi',t:T,d:'Size ulaşabileceğimiz telefon'},{k:'fm_note',l:'Form: not etiketi',t:T,d:'Not (isteğe bağlı)'},
 {k:'q_yes',l:'Test: evet düğmesi',t:T,d:'Evet'},{k:'q_no',l:'Test: hayır düğmesi',t:T,d:'Henüz değil'},{k:'q_again',l:'Test: tekrar düğmesi',t:T,d:'Testi tekrarla'},
 {k:'ft_call',l:'Alt bilgi: ara düğmesi',t:T,d:'Ara'},{k:'ft_wa',l:'Alt bilgi: WhatsApp düğmesi',t:T,d:'WhatsApp'},{k:'ft_map',l:'Alt bilgi: yol tarifi düğmesi',t:T,d:'Yol tarifi'},{k:'ft_copy',l:'Alt bilgi: numarayı kopyala düğmesi',t:T,d:'Numarayı kopyala'},
 {k:'lb_hint',l:'Galeri açıklama düğmesi (ekran okuyucu)',t:T,d:'büyüt'}]},
{id:'gallery',g:'Galeri ve videolar',f:[
 {k:'g_title',l:'Galeri başlığı',t:T,d:'Havuzdan kareler'},
 {k:'g_sub',l:'Galeri alt yazısı',t:A,d:'Derslerimizden ve havuzumuzdan görüntüler. Bir kareye dokunarak büyüt.'},
 {k:'media',l:'Fotoğraf ve videolar',t:'media',d:[
  gal('video/v2.mp4','img/v2.jpg','Havuzumuza hoş geldiniz','Dalga tasarımlı tavanıyla kapalı yüzme havuzumuz.','Tesis','hero'),
  gal('img/kid3.jpg','','Eğitmenle birlikte','Her adımda yanında bir eğitmen.','Birebir','about','photo'),
  gal('video/v8.mp4','img/v8.jpg','Küçük adımlar','Eğitmen ve öğrenci suda yüz yüze çalışıyor.','Birebir'),
  gal('video/v5.mp4','img/v5.jpg','İlk atlayış','Eğitmenin kollarına güvenle atlama çalışması.','Güven'),
  gal('video/v3.mp4','img/v3.jpg','Tahtayla bacak çalışması','Eğitmen eşliğinde denge ve bacak vuruşu.','Başlangıç'),
  gal('video/v7.mp4','img/v7.jpg','Birebir ilgiyle suya alışma','Su alıştırma ve nefes çalışması.','Su alıştırma'),
  gal('video/v4.mp4','img/v4.jpg','Sıra bekleyen minikler','Küçük grup dersinden bir an.','Grup dersi'),
  gal('video/v6.mp4','img/v6.jpg','Sırtüstü ve tahta çalışması','Teknik düzeltme ve sırtüstü yüzüş.','Teknik'),
  gal('video/v1.mp4','img/v1.jpg','Kulvar antrenmanı','Kulvarda teknik ve dayanıklılık çalışması.','Performans'),
  gal('img/pool.jpg','','Kapalı yüzme havuzumuz','Kulvarlar, flamalar ve start kürsüsü.','Tesis','gallery','photo'),
  gal('img/kid1.jpg','','Suyla ilk dostluk','Mavi bone, gülümseme ve havuz makarnası.','Su alıştırma','gallery','photo'),
  gal('img/kid2.jpg','','Makarnayla ilk kulaçlar','Yüzme makarnasıyla güvenle suda.','Başlangıç','gallery','photo')]}]},
{id:'compare',g:'Bireysel mi grup mu?',f:[
 {k:'cm_on',l:'Karşılaştırmayı göster',t:C,d:'1'},
 {k:'cm_title',l:'Başlık',t:T,d:'Bireysel mi, grup mu?'},
 {k:'cm_sub',l:'Alt yazı',t:A,d:'İkisi de olur. Sana uygun olanı seç, istersen sonra değiştirelim.'},
 {k:'cm_c1',l:'1. sütun adı',t:T,d:'Bireysel ders'},{k:'cm_c2',l:'2. sütun adı',t:T,d:'Grup dersi'},
 {k:'cm_rows',l:'Satırlar',t:L,max:8,item:[{k:'r',l:'Konu',t:T},{k:'a',l:'Bireysel',t:A},{k:'b',l:'Grup',t:A}],
  d:[{r:'İlgi',a:'Eğitmen sadece seninle ilgilenir.',b:'Eğitmen az sayıda öğrenciyle birlikte çalışır.'},
     {r:'Tempo',a:'Senin hızına göre ilerler.',b:'Grubun ortak temposuna göre ilerler.'},
     {r:'Kimlere uygun',a:'Suyu korkanlara, hızlı ilerlemek isteyenlere.',b:'Arkadaşlarıyla öğrenmeyi sevenlere.'},
     {r:'Plan',a:'Hedefine göre özel plan.',b:'Seviyeye göre ortak plan.'}]}]},
{id:'faq',g:'Sık sorulanlar ve veli rehberi',f:[
 {k:'fq_title',l:'Başlık',t:T,d:'Sık sorulanlar'},
 {k:'faq',l:'Sorular',t:L,max:12,item:[{k:'q',l:'Soru',t:T},{k:'a',l:'Cevap',t:A}],
  d:[{q:'Kaç yaşından itibaren ders verilir?',a:'4 yaş ve üzeri herkes için eğitim veriyoruz.'},
     {q:'Çocuğum suya girmekten korkuyor. Başlayabilir mi?',a:'Evet. İlk hedefimiz suyu sevdirmek. Çocuk hazır oldukça adım adım ilerleriz.'},
     {q:'Hiç yüzme bilmiyorum. Sıfırdan öğrenebilir miyim?',a:'Evet. Sıfırdan yüzme öğrenme eğitimlerimiz var.'},
     {q:'Seviyeyi nasıl belirliyorsunuz?',a:'Yaşa değil, becerilere bakıyoruz. Seviye bulucuyu doldurabilir, ilk derste eğitmenle birlikte netleştirebilirsiniz.'},
     {q:'Ders günleri ve ücretler nedir?',a:'Güncel program ve ücret bilgisi için WhatsApp\'tan yazın ya da kayıt formunu doldurun.'},
     {q:'Dersler nerede yapılıyor?',a:'Şehit Ahmet Mehmet Oruç Spor Lisesi kapalı yüzme havuzunda.'}]},
 {k:'gd_title',l:'Veli rehberi başlığı',t:T,d:'Veli rehberi'},
 {k:'bring_title',l:'"Yanında getir" başlığı',t:T,d:'Yanında getir'},
 {k:'bring',l:'Yanında getirilecekler',t:L,max:10,item:[{k:'t',l:'Madde',t:T}],d:[{t:'Mayo veya şort mayo'},{t:'Yüzme bonesi'},{t:'Yüzme gözlüğü'},{t:'Havlu'},{t:'Terlik'},{t:'Yedek kıyafet'}]},
 {k:'rules_title',l:'"Havuz kuralları" başlığı',t:T,d:'Havuz kuralları'},
 {k:'rules',l:'Havuz kuralları',t:L,max:10,item:[{k:'t',l:'Kural',t:T}],d:[{t:'Havuza girmeden önce duş al.'},{t:'Bone takmak gerekir.'},{t:'Eğitmenin izni olmadan havuza girme.'},{t:'Havuz kenarında koşma, itme ve atlama yok.'},{t:'Rahatsızlığın varsa eğitmene haber ver.'}]}]},
{id:'reviews',g:'Veli yorumları',f:[
 {k:'rv_title',l:'Başlık',t:T,d:'Velilerimiz ne diyor?'},
 {k:'reviews',l:'Yorumlar (boşsa bölüm görünmez). Sadece gerçek yorumları ekle.',t:L,max:12,item:[{k:'name',l:'İsim (örn. Ayşe H.)',t:T},{k:'text',l:'Yorum',t:A}],d:[]}]},
{id:'news',g:'Duyurular ve etkinlikler',f:[
 {k:'nw_title',l:'Başlık',t:T,d:'Duyurular'},
 {k:'news',l:'Duyurular (boşsa bölüm görünmez)',t:L,max:12,item:[{k:'date',l:'Tarih (örn. 15 Aralık)',t:T},{k:'title',l:'Başlık',t:T},{k:'text',l:'Açıklama',t:A}],d:[]}]},
{id:'form',g:'Ön kayıt formu',f:[
 {k:'f_title',l:'Form başlığı',t:T,d:'Ön kayıt formu'},
 {k:'f_sub',l:'Form alt yazısı',t:A,d:'Bilgileri doldur, "WhatsApp ile gönder" düğmesine bas. Sana geri dönelim.'},
 {k:'f_btn',l:'Gönder düğmesi',t:T,d:'WhatsApp ile gönder'},
 {k:'f_ok',l:'Gönderince çıkan yazı',t:T,d:'Teşekkürler! WhatsApp açılıyor.'}]},
{id:'contact',g:'İletişim ve alt bilgi',f:[
 {k:'wa',l:'WhatsApp numarası (905xxxxxxxxx)',t:'tel',d:'905431013488'},
 {k:'phone',l:'Görünen telefon',t:T,d:'0543 101 34 88'},
 {k:'ft_addr',l:'Adres yazısı',t:T,d:'Şehit Ahmet Mehmet Oruç Spor Lisesi, Seyhan / Adana'},
 {k:'map',l:'Harita linki',t:T,d:'https://maps.apple/p/dLUztVBMZ4amgw'},
 {k:'ins',l:'Instagram linki (boşsa görünmez)',t:T,d:''}]},
{id:'colors',g:'Renkler ve efektler',f:[
 {k:'col_top',l:'Sayfa üstü (su yüzeyi)',t:K,d:'#0a5f8e'},
 {k:'col_mid',l:'Sayfa ortası',t:K,d:'#06304f'},
 {k:'col_bot',l:'Sayfa altı (derin su)',t:K,d:'#010d1c'},
 {k:'col_acc',l:'Ana vurgu (düğmeler)',t:K,d:'#3fd0ea'},
 {k:'col_red',l:'Kırmızı vurgu',t:K,d:'#e0243c'},
 {k:'col_txt',l:'Yazı rengi',t:K,d:'#eaf9ff'},
 {k:'fx_fish',l:'Kaydırırken geçen balıklar',t:C,d:'1'},
 {k:'fx_bubbles',l:'Baloncuk efektleri (tıklama, imleç)',t:C,d:'1'},
 {k:'fx_depth',l:'Derinlik göstergesi',t:C,d:'1'},
 {k:'fx_swim',l:'Alttaki dalga ve geçen yüzücü',t:C,d:'1'}]}
];
window.DEFAULTS={};
window.SCHEMA.forEach(function(g){g.f.forEach(function(x){window.DEFAULTS[x.k]=x.d})});
})();
