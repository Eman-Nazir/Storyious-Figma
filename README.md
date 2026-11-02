<div align="center">

<a href="https://storyious-figma.vercel.app/">
  <img src="docs/assets/storyious-banner.svg" alt="Storyious — A home for stories. A space for writers." width="100%" />
</a>

# Storyious

**Discover a story. Find a new perspective. Stay for the next chapter.**

A full-stack storytelling platform for readers, writers, and the people who bring their stories to life.

<p>
  <a href="https://storyious-figma.vercel.app/"><img src="https://img.shields.io/badge/Explore_the_Live_Website-EC4899?style=for-the-badge&logo=vercel&logoColor=white" alt="Explore the live Storyious website" /></a>
  <a href="#run-locally"><img src="https://img.shields.io/badge/Run_Locally-21132D?style=for-the-badge&logo=github&logoColor=white" alt="Run Storyious locally" /></a>
</p>

<p>
  <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-0F172A?style=flat-square&logo=tailwindcss&logoColor=38BDF8" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Node.js_24-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js 24 recommended" />
  <img src="https://img.shields.io/badge/Express_5-111827?style=flat-square&logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/MongoDB-00684A?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white" alt="Cloudinary" />
</p>

[Live Demo](#live-demo) · [Features](#features) · [Tech Stack](#tech-stack) · [Run Locally](#run-locally) · [Deployment](#deployment) · [Author](#author)

</div>

---

## The idea

A bedtime tale, a thoughtful blog, a writer worth following—good content deserves a place where it is easy to discover.

**Storyious** brings story collections, video stories, blogs, author profiles, and reader interaction into one application. Readers can explore and save what interests them, while administrators curate the content through a dedicated dashboard.

The project combines a React frontend with an Express API, MongoDB persistence, and Cloudinary media storage.

## Live demo

| Experience | Link |
| --- | --- |
| 🌐 **Storyious website** | **[storyious-figma.vercel.app](https://storyious-figma.vercel.app/)** |
| ⚙️ Backend service | [storyious-figma.onrender.com](https://storyious-figma.onrender.com/) |
| 💻 Source code | [Eman-Nazir/Storyious-Figma](https://github.com/Eman-Nazir/Storyious-Figma) |

The frontend is hosted on **Vercel** and the backend on **Render**. The backend root is a service-status endpoint; the reader experience is on the website.

## Features

### 📖 A place to discover

- **Story collections:** Explore moral stories, bedtime stories, fairy tales, fables, classics, and scary stories.
- **Written and video content:** Browse reading pages and video-story pages.
- **Blogs with flexible cards:** Present articles through multiple content cards, each with its own text and image.
- **Author profiles:** Explore writers and their published content.
- **Search:** Find stories, blogs, authors, and categories through a dedicated search experience.
- **FAQs and platform pages:** Visit About, Contact, and Write for Us sections.

### 💬 A place to participate

- **Reader accounts:** Register, sign in, and sign out.
- **Personal bookmarks:** Save stories and blogs to revisit from your profile.
- **Comments and replies:** Join conversations on published content.
- **Account-based voting:** Like or dislike comments and replies; repeated requests do not add duplicate votes.
- **Writer submissions:** Send an application with one optional attachment, up to **5 MiB**.
- **Newsletter subscriptions:** Subscribe through the public newsletter form.

> Signup creates an account and then takes you to the login page. Contact is available through an email link.

### 🛠 A place to manage

The admin interface provides creation and management screens for:

| Area | What administrators manage |
| --- | --- |
| Stories | Written/video content, rich text, media, and publication status |
| Blogs | Multi-card content, card-specific images, authors, and status |
| Authors and categories | Writer information and content organization |
| FAQs | Questions, answers, and FAQ categories |
| Advertisements | Ad content and Cloudinary-hosted images |
| Newsletter | Subscriber records |

Admin APIs also support managing writer submissions. A dedicated submission-management screen is not currently included in the frontend.

## Tech stack

| Layer | Tools |
| --- | --- |
| Interface | React 19, Vite 6, React Router 7 |
| Styling | Tailwind CSS 4, Tailwind Typography |
| Forms | React Hook Form, Zod |
| Requests and feedback | Axios, Fetch API, React Toastify |
| Rich content | TinyMCE, DOMPurify |
| API | Node.js, Express 5, ES modules |
| Data | MongoDB, Mongoose 8 |
| Authentication | JWT, HTTP-only cookies, bcryptjs |
| Uploads | Multer, Cloudinary, file-type, CFB |
| UI assets | Lucide React, React Icons |

## How it fits together

~~~mermaid
flowchart LR
    Reader["Readers & writers"] --> Web["React frontend · Vercel"]
    Admin["Content administrators"] --> Web
    Web -->|"HTTPS requests + session cookies"| API["Express API · Render"]
    API -->|"Accounts, content & interactions"| DB[("MongoDB")]
    API -->|"Validated media uploads"| Media["Cloudinary"]
~~~

The backend enforces publication rules and admin permissions. Public lists return active content, while protected admin endpoints can retrieve all statuses.

## Project structure

~~~text
Storyious-Figma/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Images, icons, and videos
│   │   ├── components/         # Shared UI
│   │   ├── context/            # User and admin state
│   │   ├── pages/              # Public pages and admin screens
│   │   ├── schemas/            # Frontend validation
│   │   ├── sections/           # Page sections and story collections
│   │   └── App.jsx             # Client-side routes
│   └── vercel.json             # SPA route rewrites
├── backend/
│   ├── config/                # Database and Cloudinary setup
│   ├── middleware_temp/       # Auth, publication, and upload checks
│   ├── modules/               # Models, controllers, and routes
│   ├── routes/                # Shared upload route
│   ├── utils/                 # Validation, tokens, and helpers
│   └── server.js              # Express entry point
├── docs/assets/               # README visuals
└── README.md
~~~

## Run locally

### 1. Prepare your tools

Use **Node.js 24** and npm. The backend requires Node.js **22 or newer** for its file-detection dependency.

You will also need Git, a MongoDB database, and a Cloudinary account for uploads.

### 2. Clone the repository

~~~bash
git clone --branch development https://github.com/Eman-Nazir/Storyious-Figma.git
cd Storyious-Figma
~~~

### 3. Configure and start the backend

~~~bash
cd backend
cp .env.sample .env
npm ci
~~~

Edit `backend/.env` with your own values:

~~~dotenv
PORT=8000
NODE_ENV=development
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net
JWT_SECRET=replace_with_a_long_random_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=replace_with_a_strong_unique_password
FRONTEND_URL=http://localhost:5173
TRUST_PROXY_HOPS=0
~~~

**MongoDB configuration:** Supply the base connection URI without a database name, trailing slash, or query string. The current connector appends `/storyious?retryWrites=true&w=majority`. URL-encode special characters in database credentials.

~~~bash
npm run dev
~~~

The API runs at `http://localhost:8000` by default. Startup connects to MongoDB before listening.

### 4. Configure and start the frontend

In a second terminal, from the repository root:

~~~bash
cd frontend
cp .env.sample .env
npm install
~~~

Set `frontend/.env`:

~~~dotenv
VITE_API_URL=http://localhost:8000
VITE_BACKEND_URL=http://localhost:8000/api/users
~~~

~~~bash
npm run dev
~~~

Open the local URL printed by Vite, normally `http://localhost:5173`.

**Why two URLs?** `VITE_API_URL` is the backend origin. `VITE_BACKEND_URL` includes `/api/users` because the admin context appends authentication paths to it.

Keep local `.env` files out of Git. Only the public API URLs belong in `VITE_*` variables.

### Admin access

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` before the first backend startup. The application creates the admin account when it is missing.

Changing these environment values does not reset an existing account's password. Do not publish admin login details in issues or documentation.

## Useful commands

| Directory | Command | Purpose |
| --- | --- | --- |
| `frontend` | `npm run dev` | Start the local Vite server |
| `frontend` | `npm run build` | Generate the production `dist` folder |
| `frontend` | `npm run preview` | Preview a frontend build |
| `frontend` | `npm run lint` | Run ESLint |
| `backend` | `npm run dev` | Start the API with Nodemon |
| `backend` | `npm start` | Start the API with Node.js |

Use npm consistently with these instructions and commit lockfile updates when dependencies change. The repository does not currently define an `npm test` script.

## API map

| Base path | Responsibility |
| --- | --- |
| `/api/users` | Signup, login, logout, current user, admin dashboard |
| `/api/stories` | Stories and nested advertisement routes |
| `/api/blogs` | Blog content |
| `/api/authors` | Author profiles |
| `/api/categories` | Content categories |
| `/api/faqs` | FAQ content |
| `/api/comments` | Comments, replies, and votes |
| `/api/bookmarks` | A reader's saved content |
| `/api/submissions` | Writer applications and protected management |
| `/api/newsLetter` | Newsletter subscriptions and protected records |
| `/api/uploads` | Admin media uploads |
| `/api/search` | Public search |

Story and blog admin reads use `/admin/all` and `/admin/:id`; categories use `/admin/all`. These endpoints require an admin session. Authenticated browser requests send cookies through `withCredentials: true` or Fetch's equivalent.

## Deployment

### Backend · Render

| Setting | Value |
| --- | --- |
| Service type | Web Service |
| Branch | `development` |
| Root directory | `backend` |
| Build command | `npm ci` |
| Start command | `npm start` |
| `NODE_VERSION` | `24` |
| `NODE_ENV` | `production` |

Configure database, JWT, Cloudinary, and admin credentials in Render's environment settings. Let Render supply its port.

Set the frontend origin:

~~~dotenv
FRONTEND_URL=https://storyious-figma.vercel.app
~~~

Configure `TRUST_PROXY_HOPS` to the hosting setup's verified proxy count. The default rate-limit store is process memory; multiple backend instances need a shared store.

### Frontend · Vercel

| Setting | Value |
| --- | --- |
| Production branch | `development` |
| Root directory | `frontend` |
| Framework preset | Vite |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |

Add these public environment variables as **Config** values:

~~~dotenv
VITE_API_URL=https://storyious-figma.onrender.com
VITE_BACKEND_URL=https://storyious-figma.onrender.com/api/users
~~~

Select Production and, if needed, Preview. **Redeploy after changing Vite environment values** because they are included during the build.

The existing `frontend/vercel.json` sends nested browser routes to `index.html`. When deploying your own fork, replace the frontend and backend URLs with your own domains.

## Access and data handling

- Admin writes require authentication and the admin role before upload processing.
- Public content requests enforce active status, including search, bookmarks, and comment visibility.
- Comment responses omit phone numbers and private account details. Submitted contact email is displayed only with explicit consent.
- Voting stores each account's choice and updates counts atomically.
- Signup and public forms have server-side validation and application rate limits.
- Uploads have file-size/count limits, extension checks, and content-signature validation. Writer submissions validate required fields before committing files to Cloudinary.
- Story HTML is sanitized with DOMPurify before rendering.

Review dependency audit reports before releases. Keep credentials in backend environment settings and revoke any that were previously exposed. These safeguards do not replace testing the deployed application.

## Troubleshooting

<details>
<summary><strong>Open setup and deployment tips</strong></summary>

| Symptom | What to check |
| --- | --- |
| Signup opens the login page | This is the intended flow. Sign in with the newly created account. |
| Browser requests still use localhost | Update Vercel's two `VITE_*` URLs and redeploy. |
| CORS blocks a request | Match `FRONTEND_URL` to the exact deployed frontend origin. |
| Login succeeds but the session disappears | Check cookie credentials, HTTPS, and the browser's cross-site cookie policy. |
| MongoDB does not connect | Check the base URI format, database credentials, and Atlas network access. |
| An old ad image is broken | Edit the ad and re-upload its image to replace the old stored URL. |
| An upload is rejected | Check the 5 MiB limit, supported type, and Cloudinary configuration. |
| Render reports an unknown npm command | The start command is `npm start`. |
| Refreshing a nested page returns 404 | Confirm Vercel uses the `frontend` root and its SPA rewrite file. |

If cross-site cookies are blocked between separate hosting domains, use a suitable same-origin API proxy or frontend/API subdomains under one custom domain.

</details>

## Next chapters

- [ ] Add a committed automated API and authentication test suite.
- [ ] Centralize API configuration and request handling.
- [ ] Expand admin analytics and improve loading and empty states.
- [ ] Continue accessibility and performance improvements.

## Contributing

Ideas, reproducible bug reports, and focused improvements are welcome.

1. Fork the repository and create a feature branch.
2. Keep changes focused and update relevant documentation.
3. Run the frontend build and any checks relevant to your change.
4. Open a pull request describing the problem and resulting behavior.

## Author

**Eman Nazir**

[GitHub](https://github.com/Eman-Nazir) · [Project repository](https://github.com/Eman-Nazir/Storyious-Figma) · [Visit Storyious](https://storyious-figma.vercel.app/)

The backend package declares ISC; a repository-wide `LICENSE` file has not yet been added.

---

<div align="center">

**Every story starts somewhere. Yours can start here.**

### [Explore Storyious →](https://storyious-figma.vercel.app/)

If this project helped or inspired you, a ⭐ is always appreciated.

[Back to top](#storyious)

</div>
