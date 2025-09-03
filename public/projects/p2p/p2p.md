# 🏦 Banker Goko - P2P Döviz Alım-Satım Platformu

Modern ve güvenli bir P2P (Peer-to-Peer) döviz alım-satım platformu. Kullanıcılar USD, EUR ve TRY arasında doğrudan işlem yapabilir, alış-satış emirleri verebilir ve otomatik eşleşme sistemi ile hızlı işlemler gerçekleştirebilir.

## 🚀 Özellikler

### 💰 Ana Özellikler
- **P2P Alım-Satım Sistemi** - Kullanıcılar arası doğrudan işlem
- **Otomatik Eşleşme** - En iyi fiyatlardan otomatik işlem gerçekleştirme
- **Çoklu Para Birimi Desteği** - USD, EUR, TRY
- **Gerçek Zamanlı Döviz Kurları** - Güncel kur bilgileri
- **Güvenli Bakiye Yönetimi** - Rezervasyon ve kontrol sistemi
- **İşlem Geçmişi** - Detaylı işlem kayıtları
- **Admin Paneli** - Site bakiye yönetimi

### 🔐 Güvenlik Özellikleri
- **JWT Authentication** - Güvenli kullanıcı kimlik doğrulama
- **Role-Based Access Control** - Admin ve kullanıcı yetki sistemi
- **Bakiye Rezervasyonu** - İşlem öncesi bakiye kontrolü
- **Transaction Logging** - Tüm işlemlerin kayıt altına alınması
- **Input Validation** - Kapsamlı veri doğrulama

### 📊 Piyasa Özellikleri
- **Order Book** - Alış-satış emirleri listesi
- **Market Overview** - Piyasa genel görünümü
- **Price Charts** - Fiyat grafikleri ve istatistikler
- **Recent Transactions** - Son işlemler
- **Order Statistics** - Emir istatistikleri

## 🛠️ Teknolojiler

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Supabase** - PostgreSQL database ve authentication
- **JWT** - JSON Web Tokens

### Database
- **PostgreSQL** - Ana veritabanı
- **Supabase** - Database hosting ve yönetimi

### API
- **RESTful API** - Standart HTTP endpoints
- **JSON** - Veri formatı
- **JWT** - Authentication

## 📋 Veritabanı Şeması

### Ana Tablolar
```sql
-- Kullanıcılar
users (id, email, password, role, created_at)

-- Kullanıcı bakiyeleri
user_balances (id, user_id, currency, amount, created_at)

-- Site bakiyeleri
site_balances (id, currency, amount, created_at)

-- Döviz kurları
exchange_rates (id, currency, rate_to_try, created_at)

-- Satış emirleri
sell_orders (id, user_id, currency, amount, price_per_unit, status, created_at)

-- Alış emirleri
buy_orders (id, user_id, currency, amount, price_per_unit, status, created_at)

-- İşlem geçmişi
transactions (id, buyer_id, seller_id, currency, amount, price_per_unit, total_price, created_at)
```

## 🚀 Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn
- Supabase hesabı

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/yourusername/banker-goko.git
cd banker-goko
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Environment Variables
`.env` dosyası oluşturun:
```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
```

### 4. Veritabanını Kurun
Supabase'de aşağıdaki SQL komutlarını çalıştırın:

```sql
-- Kullanıcı bakiyeleri tablosu
create table user_balances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  currency text check (currency in ('TRY', 'USD', 'EUR')),
  amount numeric default 0,
  unique (user_id, currency)
);

-- Site bakiyeleri tablosu
create table site_balances (
  id uuid primary key default gen_random_uuid(),
  currency text check (currency in ('TRY', 'USD', 'EUR')),
  amount numeric default 0,
  unique (currency)
);

-- Döviz kurları tablosu
create table exchange_rates (
  id uuid primary key default gen_random_uuid(),
  currency text check (currency in ('USD', 'EUR')),
  rate_to_try numeric not null,
  created_at timestamp with time zone default now()
);

-- Satış emirleri tablosu
create table sell_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  currency text check (currency in ('USD', 'EUR')),
  amount numeric not null check (amount > 0),
  price_per_unit numeric not null check (price_per_unit > 0),
  status text check (status in ('active', 'sold', 'cancelled')) default 'active',
  created_at timestamp with time zone default now()
);

-- Alış emirleri tablosu
create table buy_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  currency text check (currency in ('USD', 'EUR')),
  amount numeric not null check (amount > 0),
  price_per_unit numeric not null check (price_per_unit > 0),
  status text check (status in ('active', 'completed', 'cancelled')) default 'active',
  created_at timestamp with time zone default now()
);

-- İşlem geçmişi tablosu
create table transactions (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references users(id),
  seller_id uuid references users(id),
  currency text check (currency in ('USD', 'EUR')),
  amount numeric not null,
  price_per_unit numeric not null,
  total_price numeric generated always as (amount * price_per_unit) stored,
  created_at timestamp with time zone default now()
);
```

### 5. Sunucuyu Başlatın
```bash
npm start
```

## 📚 API Dokümantasyonu

### 🔐 Authentication
Tüm API endpoint'leri JWT token gerektirir (admin endpoint'leri hariç).

**Header:**
```
Authorization: Bearer <your_jwt_token>
```

### 👤 Kullanıcı İşlemleri

#### Kullanıcı Bakiyeleri
```http
GET /api/user-balances/                    # Bakiyeleri listele
PUT /api/user-balances/update              # Bakiye güncelle
POST /api/user-balances/add                # Bakiye ekle
```

#### Para Birimi Çevirme
```http
POST /api/exchange-rates/convert           # Para birimi çevir
GET /api/exchange-rates/                   # Güncel kurları getir
```

### 📈 P2P Alım-Satım

#### Satış Emirleri
```http
POST /api/sell-orders/create               # Satış emri oluştur
GET /api/sell-orders/                      # Aktif emirleri listele
GET /api/sell-orders/my-orders             # Kendi emirlerim
DELETE /api/sell-orders/:id/cancel         # Emir iptal et
```

#### Alış Emirleri
```http
POST /api/buy-orders/create                # Alış emri oluştur
GET /api/buy-orders/                       # Aktif emirleri listele
GET /api/buy-orders/my-orders              # Kendi emirlerim
DELETE /api/buy-orders/:id/cancel          # Emir iptal et
```

#### İşlem Geçmişi
```http
GET /api/transactions/                     # Tüm işlemler
GET /api/transactions/my-transactions      # Kendi işlemlerim
GET /api/transactions/recent               # Son işlemler
```

### 🏦 Admin İşlemleri

#### Site Bakiyeleri
```http
GET /api/site-balances/                    # Site bakiyelerini listele
POST /api/site-balances/add                # Site bakiyesine ekle
POST /api/site-balances/subtract           # Site bakiyesinden çıkar
```

#### Döviz Kurları
```http
PUT /api/exchange-rates/update             # Kur güncelle
POST /api/exchange-rates/bulk-update       # Toplu kur güncelleme
```

## 📝 Örnek Kullanım

### Satış Emri Oluşturma
```bash
curl -X POST http://localhost:3000/api/sell-orders/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currency": "USD",
    "amount": 100,
    "pricePerUnit": 31.50
  }'
```

### Alış Emri Oluşturma
```bash
curl -X POST http://localhost:3000/api/buy-orders/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currency": "USD",
    "amount": 50,
    "pricePerUnit": 32.00
  }'
```

### Para Birimi Çevirme
```bash
curl -X POST http://localhost:3000/api/exchange-rates/convert \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fromCurrency": "USD",
    "toCurrency": "TRY",
    "amount": 100
  }'
```

## 🔧 Geliştirme

### Proje Yapısı
```
banker-goko/
├── controllers/          # Controller dosyaları
├── services/            # Business logic
├── routes/              # API routes
├── middleware/          # Middleware'ler
├── config/              # Konfigürasyon dosyaları
├── utils/               # Yardımcı fonksiyonlar
```

### Test
```bash
npm test
```

### Linting
```bash
npm run lint
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun



## 📞 İletişim

- **Proje Sahibi:** Görkem Kurtkaya
- **Email:** gorkem.kurtkaya@yahoo.com

## 🙏 Teşekkürler

- [Supabase](https://supabase.com) - Database ve authentication
- [Express.js](https://expressjs.com) - Web framework
- [Node.js](https://nodejs.org) - JavaScript runtime

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!