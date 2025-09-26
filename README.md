# Store Backend

## Description
Backend API for a store management system built with **NestJS**, **Prisma**, and **PostgreSQL**.  
Supports user authentication (with roles `USER` and `OWNER`) and product management.

---

## Features

- User registration and login with JWT authentication
- Role-based access control (`USER` vs `OWNER`)
- CRUD operations for products
- Password hashing with bcrypt
- PostgreSQL database with Prisma ORM

---

## Technologies

- **NestJS** - Backend framework
- **Prisma** - ORM for database management
- **PostgreSQL** - Database
- **JWT** - Authentication
- **TypeScript** - Language
- **bcrypt** - Password hashing

---

## Installation

1. **Clone the repository:**

```bash
git clone <repo-url>
cd store-backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the root folder with the following content:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/storedb"
JWT_SECRET="your_jwt_secret_key"
```

4. **Generate Prisma Client:**

```bash
npx prisma generate
```

5. **Run migrations:**

```bash
npx prisma migrate dev --name init
```

---

## Running the Server

```bash
npm run start:dev
```

The server will run on: `http://localhost:3001`

---

## Database Schema (Prisma)

```prisma
enum Role {
  USER
  OWNER
}

model User {
  id       Int       @id @default(autoincrement())
  email    String    @unique
  password String
  role     Role      @default(USER)
  products Product[]
}

model Product {
  id          Int     @id @default(autoincrement())
  name        String
  description String
  price       Float
  category    String
  image       String?
  ownerId     Int
  owner       User    @relation(fields: [ownerId], references: [id])
}
```

---

## API Endpoints

### Auth

#### Register a new user
**POST** `/auth/register`

Request Body:
```json
{
  "email": "owner@example.com",
  "password": "123456",
  "role": "OWNER"
}
```

Response:
```json
{
  "id": 1,
  "email": "owner@example.com",
  "role": "OWNER"
}
```

#### Login a user
**POST** `/auth/login`

Request Body:
```json
{
  "email": "owner@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "accessToken": "<jwt_token>",
  "user": {
    "id": 1,
    "email": "owner@example.com",
    "role": "OWNER"
  }
}
```

---

### Products

All product routes require `Authorization: Bearer <accessToken>` header.

#### List all products
**GET** `/products`

#### Create a product (OWNER only)
**POST** `/products`

#### Update a product (OWNER only)
**PUT** `/products/:id`

#### Delete a product (OWNER only)
**DELETE** `/products/:id`

---

## Roles

- `USER` - Can view products only  
- `OWNER` - Can create, update, and delete products

---

## License

MIT License
