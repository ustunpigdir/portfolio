# Barselona Türkçe Tur landing page

Bağımsız, statik landing page. Portfolio navigasyonuna veya portfolio uygulamasına bağlı değildir.

Hedef canlı adres:

```text
https://ustunpasaigdir.com/barselona_turlari
```

## WhatsApp ayarı

`script.js` dosyasında WhatsApp Business numarası uluslararası formatta ayarlanmıştır:

```js
const WHATSAPP_NUMBER = "34627485580";
```

Numara ülke koduyla, `+`, boşluk ve parantez olmadan yazılmalıdır:

```text
34XXXXXXXXX
```

Tüm genel, görülecek yer ve fiyat hesaplayıcı WhatsApp butonları bu tek değeri kullanır.

## Dosyalar

- `index.html`: sayfa içeriği ve SEO metadatası
- `styles.css`: tamamen izole, responsive tasarım
- `script.js`: grup fiyatı hesaplama ve WhatsApp hazır mesajları
- `assets/favicon.svg`: sayfaya özel, basit Ü simgesi

Harici kütüphane, font, takip kodu veya portfolio bağlantısı yoktur.

## Yerel önizleme

Bu klasörün üst dizininden:

```bash
python3 -m http.server 4173 --directory barselona_turlari
```

Ardından:

```text
http://127.0.0.1:4173/
```

## Portfolyoya ekleme

Gerçek portfolio deployment kaynağında kök dizine `barselona_turlari/` klasörü olarak kopyalayın. Statik hosting kullanılıyorsa ekstra route veya build ayarı gerekmez.

Portfolio bir SPA/router kullanıyorsa bu klasörü public/static çıktı olarak servis edin; ana portfolio header veya layout bileşeninin içine yerleştirmeyin.

## Yayından önce içerik kontrolü

- Gerçek WhatsApp numarası
- Öne çıkarılacak görülecek yerler ve açıklamaları
- Ön ödeme ve iptal koşulları
- Çocuk fiyatlandırması
- İletişim e-postası
- Rehberlik/ruhsat cümlesinin güncel hukuki statüyle uyumu
