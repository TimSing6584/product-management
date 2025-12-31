# Readify 📚

🔗 Live demo: https://readifya.vercel.app/  

🎥 Demo Video: (coming soon)

⚠️ Best viewed on **desktop / laptop**. This project focuses on **back-end architecture and logic**, so responsive UI is not a priority.

⚠️ **Cold Start Notice**: The live demo is deployed on a free MongoDB tier. The first request after inactivity may take 10-15 seconds to load. This is expected behavior for serverless deployments with free-tier databases. Subsequent requests will be significantly faster due to connection caching.

---

## Overview

**Readify** is an **SSR (Server-Side Rendering) online bookstore** built with a clear **MVC-style structure**, featuring both **client-facing pages** and a **admin system for management**.

<img width="947" height="434" alt="image" src="https://github.com/user-attachments/assets/d830e962-208f-49de-843b-7e62548a919e" />

<img width="947" height="439" alt="image" src="https://github.com/user-attachments/assets/885d6475-ee12-453f-a155-b776e897615f" />


The project includes a **dynamic role-based access control (RBAC)** mechanism for the admin side, where different admin roles are granted different permissions by the administrator. 

<img width="956" height="337" alt="image" src="https://github.com/user-attachments/assets/de49b9d9-062d-4666-94cb-8b4f6dd96a98" />


<img width="940" height="429" alt="image" src="https://github.com/user-attachments/assets/aebfc083-0942-43e5-ac0d-91c2d5992ef2" />

---


## Tech Stack

- **Backend:** Node.js, Express.js  
- **View Engine:** Pug (SSR)  
- **Frontend:** JavaScript, CSS  
- **Database:** MongoDB (MongoDB Atlas)  
- **Media Storage:** Cloudinary (product images)  
- **Deployment:** Vercel  

---

## Core Features

### Client

- Home page displaying general store information (newest arrivals, media content, location...)
- User registration and authentication
- Browse and view product details
- Search and filter products based on preferences
- Place orders **without creating an account** (guest checkout)
- View order history (for authenticated users)

---

### Admin (Role-based Access)

The admin system supports **multiple roles** (e.g. Administrator, Staff, Assistant), each with **specific permissions** assigned by the Administrator.

**Administrator capabilities include:**

- Dashboard with overall statistics (users, products sold, pending orders, etc.)
- Product management (add / edit / delete / control display order)
- Product category management
- Order management (view and update order status)
- Staff account management *(Administrator only)*
- User account management
- Roles management (add / edit  / delete roles)
- Permission management **(Administrator only)** — assign permissions to each admin role

> Depending on assigned permissions, non-administrator roles can only access and operate on allowed features.

---

## Admin Access (Demo)

To help reviewers explore the admin system, an **assistant-level admin account** is provided with limited permissions.

This account allows access to the admin dashboard and selected management features.  
For security reasons, **full Administrator capabilities are not exposed publicly**.

**Assistant account:**
- Email: `assistant123@gmail.com`
- Password: `12345678`

👉 A demo video is provided to showcase all **Administrator-level features**, including role and permission management: (link youtube)

---

## Run Locally

```bash
cd src
npm install
npm start

Access the application at: 👉 http://localhost:3000

