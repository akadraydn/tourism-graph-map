# Tourism Map Visualization

## Proje Tanıtımı
Bu proje, Türkiye'ye gelen turistlerin yıllara göre görselleştirilmesini amaçlayan bir harita uygulamasıdır. Uygulama, kullanıcıların belirli bir yılı seçerek Türkiye'ye gelen turistlerin hangi ülkelerden geldiğini ve sayısını görebilmelerini sağlar. Harita üzerinde etkileşimli olarak turist verileri gösterilmektedir.

### Kullanılan Teknolojiler
- **React:** Kullanıcı arayüzünü oluşturmak için.
- **Leaflet:** Harita bileşeni için.
- **D3.js:** Harita üzerindeki çizimler ve etkileşimler için.
- **Fetch API:** JSON dosyalarından veri yüklemek için.

## Proje Yapısı
- **public/**: Veri setlerinin ve statik dosyaların bulunduğu klasör.
  - `country_data.json`: Ülkeler ve yıllara göre turist sayıları.
  - `country_location.json`: Ülkelerin koordinat bilgileri.
  - `group_data.json`: Grup verileri.
  - `world_countries.geojson`: Ülke sınırları.
- **src/**: React bileşenlerinin ve stil dosyalarının bulunduğu klasör.
  - `components/`: Uygulamanın ana bileşenleri.
    - `GraphComponent.js`: Yıl seçim bileşeni.
    - `MapComponent.js`: Harita bileşeni.
    - `PanelComponent.js`: Ek veri paneli.
  - `DataLoader.js`: Veri yükleme işlemlerini gerçekleştiren bileşen.
  - `App.js`: Uygulamanın ana bileşeni.
  - `App.css`: Uygulamanın stil dosyası.

## Kurulum ve Çalıştırma
Proje dosyalarını bilgisayarınıza klonladıktan sonra, projeyi çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler
- Node.js (v12 veya üzeri)
- npm veya yarn paket yöneticisi

### Kurulum
1. Proje dizinine gidin:
   ```bash
   cd tourism-map
2. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
  veya
   ```bash
   yarn install

