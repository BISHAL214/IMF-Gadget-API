# 📡 IMF Gadget API Documentation

## 🚀 Overview

The **IMF Gadget API** is designed to manage the inventory of gadgets for the Impossible Missions Force (IMF). It provides secure endpoints to create, read, update, decommission, and trigger self-destruct sequences for gadgets.

- **Base URL:** `https://your-app.onrender.com/api`
- **Authentication:** JWT (JSON Web Token)

---

## 🔐 Authentication

### 1️⃣ **Login**

- **Endpoint:** `POST /auth/login`
- **Request Body:**
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```
- **Response:**
  ```json
  {
    "token": "<jwt_token>"
  }
  ```
- **Usage:** Include the token in the `Authorization` header for protected routes:
  ```bash
  Authorization: Bearer <jwt_token>
  ```

---

## 📦 Gadget Endpoints

### 📋 **1. Get All Gadgets**

- **Endpoint:** `GET /gadgets`
- **Query Parameters:** `?status=Available` _(optional)_
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  [
    {
      "id": "uuid",
      "name": "Bike",
      "codename": "The Cheetah",
      "status": "Available",
      "missionSuccessProbability": "87%",
      "decommissionedAt": null,
      "createdAt": "2025-02-04T14:30:21.316Z",
      "updatedAt": "2025-02-04T14:30:21.316Z"
    }
  ]
  ```

### ➕ **2. Add New Gadget**

- **Endpoint:** `POST /gadgets`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "Invisibility Cloak"
  }
  ```
- **Response:**
  ```json
  {
    "id": "uuid",
    "codename": "The Wolf", // random codename
    "name": "Mobile",
    "status": "Available",
    "decommissionedAt": null,
    "createdAt": "2025-02-04T14:43:40.163Z",
    "updatedAt": "2025-02-04T14:43:40.163Z"
  }
  ```

### ✏️ **3. Update Gadget**

- **Endpoint:** `PATCH /gadgets/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "Android",
    "status": "Destroyed" // optional
  }
  ```
- **Response:**
  ```json
  {
    "message": "Gadget ID ${id} updated successfully"
  }
  ```

### ❌ **4. Decommission Gadget**

- **Endpoint:** `DELETE /gadgets/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Gadget ID ${id} Decommissioned successfully",
    "decommissionedAt": "2024-09-19T12:34:56Z"
  }
  ```

---

## 💥 Self-Destruct Sequence

### ⚠️ **Trigger Self-Destruct**

- **Endpoint:** `POST /gadgets/:id/self-destruct`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Self-destruct initiated for gadget ID ${id}",
    "confirmationCode": "123456" // Randomly generated
  }
  ```

---

## ⚙️ Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/imf_gadgets
JWT_SECRET=your_secret_key
PORT=your_port_number
```

---

## 🗄️ Database Schema (Prisma)

```prisma
enum Status {
  Available
  Decommissioned
  Deployed
  Destroyed
}

model Gadget {
  id               String    @id @default(uuid())
  codename         String    @unique
  name             String
  status           Status    @default(Available)
  decommissionedAt DateTime?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
}

```

---

## 🚀 Deployment Guide

1. **Push to GitHub:**

   ```bash
   git push origin main
   ```

2. **Deploy on Render:**

   - Create new Web Service
   - Connect GitHub repo
   - Set Environment Variables

3. **PostgreSQL Setup:**

   - Create PostgreSQL instance on Render
   - Update `DATABASE_URL` in Render environment
   - Update `PORT`in render environment
   - Update `JWT_SECRET` in render environment

4. **Migrate Database:**

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

5. **Start the API:**
   Render will automatically start the API after deployment.

---

