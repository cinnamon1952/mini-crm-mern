Mini CRM (MERN)

Stack: MongoDB, Express.js, React.js (Vite), Node.js

Features
- Auth: Register/Login with JWT
- Customers: CRUD, pagination, search by name/email
- Leads: Nested under customer, CRUD, filter by status
- RBAC: Admin/User (delete protected to Admin)
- Validation: Joi
- Test: Jest + Supertest (health test included)
- Frontend: Redux Toolkit, React Router, Recharts dashboard

Backend Setup
1) cd backend
2) Copy env and start
```
cp .env.example .env
npm i
npm run dev
```
Default: PORT=4000, MONGODB_URI=mongodb://localhost:27017/mini_crm

Frontend Setup
1) cd frontend
2) Create .env for API URL (optional)
```
echo "VITE_API_URL=http://localhost:4000/api" > .env
npm i
npm run dev
```

API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/customers
- GET /api/customers?search=&page=&limit=
- GET /api/customers/:id
- PUT /api/customers/:id
- DELETE /api/customers/:id (admin)
- POST /api/customers/:customerId/leads
- GET /api/customers/:customerId/leads?status=
- GET /api/customers/:customerId/leads/:leadId
- PUT /api/customers/:customerId/leads/:leadId
- DELETE /api/customers/:customerId/leads/:leadId (admin)

Schema Diagram
```
users
  _id (ObjectId)
  name
  email (unique)
  passwordHash
  role ['admin','user']

customers
  _id (ObjectId)
  name
  email
  phone
  company
  ownerId -> users._id

leads
  _id (ObjectId)
  customerId -> customers._id
  title
  description
  status ['New','Contacted','Converted','Lost']
  value (Number)
  createdAt (Date)
```

Run Tests
```
cd backend
npm test
```

Deployment (Optional)
- Backend: Render/Heroku/DigitalOcean. Set env: PORT, MONGODB_URI, JWT_SECRET
- Frontend: Netlify/Vercel. Set VITE_API_URL to deployed backend URL


