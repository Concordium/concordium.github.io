.. Should answer:
    - What is a smart contract
    - Why use a smart contract
    - What are the use cases
    - What are not the use cases

.. _introduction:

=========================
Akıllı sözleşmelere giriş
=========================

Akıllı sözleşme, kullanıcı tarafından  Concordium blok zincirine gönderilen
ve doğrudan çekirdek protokolünün bir parçası olmayan davranışı tanımlamak
için kullanılan bir kod parçasıdır. Akıllı sözleşmeler, önceden tanımlanmış 
kurallara bağlı olarak Concordium ağındaki düğümler tarafından yönetilir.
Bu yönetim tamamen şeffaftır ve tüm düğümler, yönetim sonucunun halka açık 
bilgilere dayandığı konusunda hemfikir olmalıdır.

Akıllı bir sözleşme GTU alabilir, GTU tutabilir veya GTU gönderebilir. Akıllı 
bir sözleşme ayrıca zincirin bazı yönlerini gözlemleyebilir ve kendi durmunu 
koruyabilir. Akıllı sözleşmeler her zaman **dışarıdan gelen** eylemlere yanıt 
olarak yürütülür. Örneğin, mesaj gönderen bir hesap. Akıllı sözleşmeler 
uygulamada genellikle, zincir içi ve zincir dışı işlevselliği birleştiren 
daha büyük bir sistemin küçük bir parçası olacaktır. Hisse senedi fiyatları 
veya hava durumu bilgileri gibi, gerçek dünyadan gelen verilere dayalı olarak 
akıllı sözleşmeyi başlatan bir sunucu, zincir dışı işlevselliğe bir örnek olabilir.

Akıllı sözleşmeler ne içindir?
==============================

Akıllı sözleşmeler üçüncü şahıslara duyulan güveni azaltabilir. Bazı durumlarda 
güvenilir bir üçüncü tarafa olan ihtiyacı ortadan kaldırır, bazı durumlarda da
yeteneklerini azaltır ve böylelikle onlara duyulan güven miktarını azaltmış olur.

Çünkü akıllı sözleşmeler, bir düğüme erişimi olan herkesin doğrulayabileceği bir 
şekilde tamamen şeffaf yürütüldüğünden dolayı, taraflar arasındaki anlaşmayı 
sağlamak için çok yararlı olabilirler.

Akıllı açık artırma sözleşme örneği
-----------------------------------

Akıllı sözleşmeler için bir başa kullanım örneği ise bir açık artırma düzenlemek
olabilir. Burada akıllı sözleşmeyi, herkesten gelen farklı teklifleri kabul 
edecek ve en yüksek teklifi veren kişiyi takip edecek şekilde programlıyoruz.
Açık artırma bittiğinde ise, akıllı sözleşmeyi kazananın GTU teklifini satıcıya 
gönderir ve kazanamamış olan diğer tüm teklifler ise geri gönderilir. Satıcı daha 
sonra ürünü kazanana göndermelidir.

Akıllı sözleşme, açık artırma ile satan müzayedecinin ana rolünün yerini alır.
Sözleşme yalnızca teklif bölümünü ve GTU'ların zincir üzerindeki dağıtımını yönetir.
Eğer satıcı yükümlülüklerini yerine getirmezse, muhtemelen en yüksek teklifi verene 
geri ödeme yapmak için biraz mantığa ihtiyaç duyacaktır. Büyük olasılıkla bu, 
sözleşmenin gerçekten de satıcının yükümlülüklerini yerine getirip getirmediğine dair 
bazı kanıtlarını desteklemesi gerektiğine veya en yüksek teklifi verenin şikayette 
bulunabilmesinin bir yolu anlamına gelecektir. Akıllı sözleşmeler gerçek dünyanın
bu sorunlarını otomatik olarak çözemez ve muhtemelen en iyi çözüm  açık artırmanın 
özelliklerine bağlı olacaktır.

Akıllı sözleşmeler ne için değildir?
====================================

Akıllı sözleşmeler çok heyecan verici bir teknolojidir ve insanlar halan bunlardan
yararlanmanın yeni yollarını aramaya devam etmektedir. Ancek, akıllı sözleşmelerin 
iyi bir çözüm olmadığı bazı durumlar da vardır.

Akıllı sözleşmelerin en önemli kilit avantajlarından birisi kod yürütmesine olan 
güvendir ve bunu başarmak için blockchain ağındaki çok sayıda düğüm aynı kodu 
çalıştırmalı ve sonucun mutabakatını sağlanmalıdır. Doğal olarak bu, bazı bulut 
hizmetlerinde aynı kodu tek bir düğümde çalıştırmakla karşılaştırıldığında daha 
pahalı hale gelir.

Akıllı sözleşmenin ağır hesaplamalara dayandığı bazı durumlarda, bu hesaplamayı 
akıllı sözleşmenin dışına çıkarmak ve akıllı sözleşmenin, diğer parçaların doğru 
bir şekilde yürütülmesini sağlamak için kriptografik teknikleri kullanarak 
hesaplamanın yalnızca bazı önemli kısımlarını yürütmesini sağlamak mümkün olabilir.

Son olarak, akıllı sözleşmelerde gizlilik olmadığını hatırlamak önemlidir. Akıllı 
sözleşmenin erişime sahip olduğu her şeye Concordium ağındaki herkes erişebilir. Yani,
hassas verileri akıllı bir sözleşmeyle ele almak zordur. Bazı durumlarda, verilerle 
doğrudan çalışmamak için kriptografik araçlar kullanmak mümkün olabilir. Fakat bunun 
yerine daha ziyade  akıllı sözleşmelerin, gerçek verileri gizleyen şifreleme ve 
taahhütler gibi türetilmiş kavramlarla çalışmasını sağlamak mümkün olabilir. 

Akıllı bir sözleşmenin yaşam döngüsü
====================================

Akıllı bir sözleşme ilk olarak zincire :ref:`contract module <contract-module>` 
´ün bir parçası olarak konuşlandırılır. Bundan sonra, akıllı bir sözleşme 
:ref:`smart contract instance <contract-instances>` elde etmek için başlatılabilir.
Son olarak, akıllı bir sözleşme kendi mantığına bağlı olarak tekrar tekrar güncellenebilir.

