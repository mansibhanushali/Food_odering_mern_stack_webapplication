🍴 Food Fusion - Online Food Ordering Website (MERN Stack)
Food Fusion is a full-stack online food ordering web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to browse food items, add them to the cart, and place orders seamlessly. Admins can manage menu items and track customer orders.
🚀 Features
🔐 User Authentication & Authorization (JWT-based)
🍔 Browse food items by category & search functionality
🛒 Add to cart & manage cart items
💳 Secure order placement with order tracking
👨‍🍳 Admin dashboard to manage food items & orders
🌐 Fully responsive UI with modern design
🛠️ Tech Stack
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT & bcrypt
State Management: Context API / Redux
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/mansibhanushali/Food-Fusion.git
cd Food-Fusion
2️⃣ Install dependencies
  Backend:
    cd backend
    npm install
    npm run dev
  Frontend:
    cd frontend
    npm install
    npm run dev
  Admin:
    cd admin
    npm install
    npm run dev
3️⃣ Add Environment Variables
Create a `.env` file in the backend folder with the following:
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=4000

