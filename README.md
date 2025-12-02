🌸 SphinxWeddings
A Modern Wedding & Event Planning Website

SphinxWeddings is a professionally designed, fast, and responsive web application built for wedding planners, event organizers, and creative studios. It provides a beautiful front-end experience along with a powerful admin dashboard for managing images, content, and galleries in real time.

🚀 Live Website

Production URL: [https://your-domain.com](https://sphinxweddings-4oxl5i545-murshidiqbaals-projects.vercel.app/](https://sphinxweddings-4oxl5i545-murshidiqbaals-projects.vercel.app/)

(Replace with your actual domain)

📌 Project Features
🌟 Frontend

Modern & responsive UI

Tailwind CSS for styling

shadcn-ui for polished components

High-performance Vite + React setup

Dynamic image galleries

Smooth animations & transitions

SEO-friendly meta tags

Custom OG image for link sharing

🔐 Admin Panel

/admin route for content management

Password-protected admin access

Upload/manage images

Edit service descriptions, text blocks, and galleries

Content sync via Firebase or Supabase

Changes appear instantly on the public site

☁️ Backend (Firebase/Supabase)

Firebase Storage for image uploads

Firestore or Supabase for content storage

Real-time updates

Secure auth & API access

Environment-based configuration

🧰 Tech Stack
Layer	Technology
Frontend	React, TypeScript, Vite
Styling	Tailwind CSS, shadcn/ui
State/Logic	React Hooks, Context
Backend	Firebase / Supabase
Deployment	Vercel / Hostinger
Version Control	GitHub
🛠️ Installation & Development
# 1. Clone the repository
git clone <YOUR_REPOSITORY_URL>

# 2. Go into the project folder
cd sphinxweddings

# 3. Install all dependencies
npm install

# 4. Start the development server
npm run dev


Your development server will be available at:
👉 http://localhost:5173

🔧 Environment Variables

Create a .env file in the project root.

If using Firebase:
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

If using Supabase:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

🔐 Admin Panel
Access:
https://your-domain.com/admin

Admin Password Location:

You can modify the default admin password inside:

src/pages/Admin.tsx


⚠️ Important:
Update this password before deployment.

Admin Features:

Upload & remove images

Update text descriptions

Manage gallery sections

Real-time sync with Firebase/Supabase

Zero redeployment required

🌐 Deployment
Deploy on Vercel (Recommended)

Push project to GitHub

Go to https://vercel.com

Import your repository

Set environment variables

Deploy instantly

Deploy to Hostinger

Run:

npm run build


Upload the contents of the dist/ folder to:

public_html


Ensure domain’s DNS points correctly.

🖼️ Social Sharing (OG Image)

To control the preview image when sharing your link on WhatsApp, Facebook, etc., edit index.html:

<meta property="og:title" content="SphinxWeddings" />
<meta property="og:description" content="Elegant and modern wedding & event planning services." />
<meta property="og:image" content="https://your-domain.com/og-image.jpg" />
<meta property="og:url" content="https://your-domain.com" />
<meta property="og:type" content="website" />

📁 Project Structure
sphinxweddings/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   └── styles/
├── .env.example
├── README.md
└── vite.config.ts

🤝 Contributing

Contributions are welcome!
To contribute:

Fork the repo

Create a new branch

Make your changes

Submit a pull request
