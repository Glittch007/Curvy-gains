# Curvy Gains Admin Setup

The storefront now has a real admin system powered by Supabase.

## What it provides

- `/admin` owner login
- Add, edit and delete products
- Mark products in/out of stock
- Change stock quantity
- Change price, category, image and description
- Mark products as featured
- View customer orders
- Update order status

## 1. Create a Supabase project

Create a project in Supabase.

Then open **SQL Editor** and run `supabase_schema.sql`.

## 2. Create the store owner's login

In Supabase:

**Authentication -> Users -> Add user**

Create the email/password account that the store owner will use.

Copy the user's UUID.

Back in SQL Editor, run:

```sql
insert into public.admin_users (user_id)
values ('PASTE_THE_USER_UUID_HERE');
```

Only users whose UUID exists in `admin_users` can manage products or view/update orders.

## 3. Connect the React app

Copy `.env.example` to `.env` and fill in the values from:

**Supabase -> Project Settings -> API**

Example:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

The anon/publishable key is intended for frontend use. **Never put the Supabase service-role key in `.env` or frontend code.**

Restart Vite after changing `.env`.

## 4. Open the admin

Local development:

`http://localhost:5173/admin`

Production:

`https://YOUR-DOMAIN/admin`

## 5. Important

The first database seed keeps the existing products available so the migration does not suddenly make the store show everything as out of stock. The owner should replace those placeholder quantities with the real quantities in the admin dashboard.

The current Paystack implementation still uses the existing test public key. Production payment verification should eventually be moved to a secure server/Edge Function before going live.
