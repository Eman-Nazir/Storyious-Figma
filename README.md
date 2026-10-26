<div align="center">

<img src="frontend/src/assets/images/storyiousLogo.png" alt="Storyious logo" width="220" />

# Storyious

### A home for stories. A space for writers.

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=21&duration=2800&pause=1100&color=8B5CF6&center=true&vCenter=true&width=700&lines=Discover+stories.+Explore+new+perspectives.;Read.+Write.+Connect.;A+full-stack+MERN+storytelling+platform." alt="Animated text: Discover stories, explore new perspectives. Read, write, connect." />

<p>
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" alt="Tailwind CSS 4" />
</p>
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express_5-111827?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/MongoDB-00684A?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
</p>

[Explore Features](#-features) · [Run Locally](#-run-locally) · [Deployment Guide](#-deployment-guide) · [Author](#-author)

</div>

---

## ✨ Overview

**Storyious** is a full-stack storytelling and content-management project built with React, Express, Node.js, and MongoDB. It brings together story discovery, writer profiles, blog content, reader accounts, and an administration interface in one application.

The frontend includes dedicated sections for moral stories, bedtime stories, classic stories, fables, fairy tales, and scary stories. The backend organizes its APIs into feature modules for content, users, community interactions, and submissions.

> **Project status:** The source includes the features below. Deployment preparation is still required; see the checklist before publishing. A working end-to-end live deployment has not been verified for this README.

## 📚 Contents

- [Features](#-features)
- [Technology stack](#-technology-stack)
- [Architecture](#-architecture)
- [Project structure](#-project-structure)
- [Run locally](#-run-locally)
- [API overview](#-api-overview)
- [Deployment guide](#-deployment-guide)
- [Troubleshooting](#-troubleshooting)
- [Development roadmap](#-development-roadmap)
- [Author](#-author)

## 🌟 Features

### For readers

- **Story discovery:** Browse story collections and category pages.
- **Detailed reading pages:** Explore individual stories and related content.
- **Writer profiles:** Discover authors and visit their detail pages.
- **Blog browsing:** Read blog listings and individual articles.
- **Accounts:** Sign up, sign in, sign out, and access a profile page.
- **Community modules:** Backend support for comments, replies, and bookmarks.
- **Search:** A dedicated search page backed by a search API module.
- **Writer submissions:** A Write for Us page and submission form.
- **Additional content:** Video-story, FAQ, About Us, and Contact Us pages.
- **Newsletter subscriptions:** Subscription UI and a backend subscriber module.

### For content administration

The admin interface includes dashboard, creation, and listing pages for:

| Content area | Included interface |
| --- | --- |
| Stories | Story creation and listing |
| Categories | Category creation and listing |
| Authors | Author creation and listing |
| Blogs | Blog creation and listing |
| FAQs | FAQ creation and listing |
| Advertisements | Ad creation and listing |
| Newsletter | Subscriber listing |

> An admin interface is not itself an authorization boundary. The current story, blog, ad, and upload routes need server-side permission checks before public deployment.

## 🧰 Technology Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite 6, React Router 7 |
| Styling | Tailwind CSS 4, Tailwind Typography |
| Forms | React Hook Form, Zod, Hook Form resolvers |
| API requests | Axios |
| UI feedback and icons | React Toastify, React Hot Toast, Lucide React, React Icons |
| Rich-content dependencies | Tiptap, Jodit React, TinyMCE React, DOMPurify |
| Backend | Node.js, Express 5, ES modules |
| Database | MongoDB, Mongoose 8 |
| Authentication | JSON Web Tokens, bcryptjs, cookie-parser |
| Media | Multer, Cloudinary, multer-storage-cloudinary |
| Development | ESLint, Nodemon |

The table reflects repository dependencies; it does not imply every installed editor is used on every page.

## 🏗 Architecture

```mermaid
flowchart TD
    Reader["Reader or writer"] --> UI["React frontend"]
    Admin["Content administrator"] --> UI
    UI -->|"HTTPS API requests"| API["Express backend"]
    API -->|"Users and content"| DB[("MongoDB")]
    API -->|"Media uploads"| Media["Cloudinary"]
```

The frontend renders public and admin pages. The backend exposes `/api/*` routes, uses MongoDB for application data, and integrates with Cloudinary for uploaded media. Authentication uses a JWT stored in an HTTP-only cookie.

## 🗂 Project Structure

| Path | Purpose |
| --- | --- |
| `frontend/src/App.jsx` | Public and admin route definitions |
| `frontend/src/pages/` | Public pages and admin screens |
| `frontend/src/components/` | Shared UI components |
| `frontend/src/sections/` | Story collections and page sections |
| `frontend/src/context/` | User and admin context providers |
| `frontend/src/schemas/` | Form-validation schemas |
| `frontend/src/assets/` | Images, icons, and videos |
| `frontend/public/` | Public static files |
| `frontend/vercel.json` | SPA rewrites for frontend routes |
| `backend/server.js` | Express setup and API route mounting |
| `backend/config/` | MongoDB and Cloudinary configuration |
| `backend/modules/` | Feature-specific models, controllers, and routes |
| `backend/middleware_temp/` | Authentication and upload middleware |
| `backend/routes/` | Shared upload route |
| `backend/utils/` | Tokens, responses, slugs, and reading-time utilities |
| `backend/.env.sample` | Backend environment-variable template |

## 💻 Run Locally

### 1. Requirements

Install Git and a supported Node.js LTS release compatible with the dependencies. You also need a MongoDB database and Cloudinary credentials for media uploads.

### 2. Clone the project

The reviewed default branch is `development`.

```bash
git clone --branch development https://github.com/Eman-Nazir/Storyious-Figma.git
cd Storyious-Figma
```

### 3. Configure the backend

Create `backend/.env` using `backend/.env.sample` as the template:

```dotenv
PORT=8000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017
JWT_SECRET=replace_with_a_long_random_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=replace_with_a_strong_unique_password
```

**MongoDB URI format matters:** The current `backend/config/mongodb.js` appends `/storyious?retryWrites=true&w=majority` to `MONGO_URI`. For Atlas, supply the base URI only, such as `mongodb+srv://USERNAME:PASSWORD@CLUSTER_HOST`, without a trailing slash, database name, or query string. URL-encode special characters in the password. Alternatively, refactor the connector to accept a complete URI and update the environment value accordingly.

Load dotenv before modules read environment variables. In particular, add `import "dotenv/config";` at the top of `backend/config/cloudinary.js`, and replace hardcoded credential fallbacks with environment-only values. See the deployment checklist.

Then start the backend:

```bash
cd backend
npm install
npm run dev
```

Open `http://localhost:8000/` to check the server response. This response alone does not verify the database connection.

### 4. Configure the frontend

In `frontend/.env`, use:

```dotenv
VITE_API_URL=http://localhost:8000
VITE_BACKEND_URL=http://localhost:8000/api/users
```

`Login.jsx` appends `/api/users/login` to `VITE_API_URL`. `AdminContext.jsx` appends `/login` or `/dashboard` to `VITE_BACKEND_URL`. Their current meanings differ, so do not give both variables the same value.

Several other requests still contain literal localhost URLs. They work only against the local backend until updated as described below.

In a second terminal, starting from the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

### 5. Available commands

| Directory | Command | Purpose |
| --- | --- | --- |
| `frontend` | `npm run dev` | Start Vite development server |
| `frontend` | `npm run build` | Generate the production `dist` directory |
| `frontend` | `npm run preview` | Preview the frontend build locally |
| `frontend` | `npm run lint` | Run ESLint |
| `backend` | `npm run dev` | Run the API with Nodemon |
| `backend` | `npm start` | Execute `server.js` |

The frontend includes a pnpm lockfile. If standardizing on npm, generate and commit an npm lockfile after validating installation; use one package manager consistently. Neither package currently defines a test script.

## 🔌 API Overview

These base paths are mounted in `backend/server.js`:

| Base path | Purpose |
| --- | --- |
| `/api/users` | Signup, login, logout, current user, admin dashboard |
| `/api/stories` | Stories and nested ad routes |
| `/api/authors` | Authors |
| `/api/categories` | Story categories |
| `/api/blogs` | Blog content |
| `/api/faqs` | FAQ content |
| `/api/submissions` | Writer submissions |
| `/api/uploads` | Media upload |
| `/api/comments` | Comments and replies |
| `/api/newsLetter` | Newsletter subscriptions |
| `/api/search` | Search |
| `/api/bookmarks` | Bookmarks |

Examples:

```http
POST /api/users/signup
POST /api/users/login
POST /api/users/logout
GET  /api/users/me
GET  /api/users/dashboard
GET  /api/stories
GET  /api/stories/:id
POST /api/stories/create
GET  /api/blogs
```

Authenticated browser requests must send cookies with `withCredentials: true`. The dashboard route requires the admin role. Review individual route files for payloads and permissions; authentication is not uniformly applied across the current API.

## 🚀 Deployment Guide

**Suggested setup:** Vercel for the frontend, Render for the backend, MongoDB Atlas for the database, and Cloudinary for media.

### Step 1 — Prepare the code before deploying

These are required changes to the current source, not changes already made by this README.

#### A. Replace localhost API requests

Search the entire `frontend/src` directory for `localhost:8000`, `VITE_API_URL`, and `VITE_BACKEND_URL`. Confirm every API request uses the intended deployed backend.

For example, in `UserContext.jsx`, replace:

```js
axios.get("http://localhost:8000/api/users/me", {
  withCredentials: true,
});
```

with:

```js
const API_ORIGIN = import.meta.env.VITE_API_URL;

axios.get(`${API_ORIGIN}/api/users/me`, {
  withCredentials: true,
});
```

Apply the same approach to logout, admin content requests, and all other hardcoded requests. A Vercel environment variable cannot change a literal localhost URL in source code.

#### B. Allow the backend to listen on Render

The current server skips `app.listen()` when `NODE_ENV=production`. For a Render web service, replace the conditional startup block at the bottom of `backend/server.js` with:

```js
const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Storyious API listening on port ${PORT}`);
});

export default app;
```

This startup change is for the Render deployment path described here. Do not work around it by using development mode in production: the login controller uses `NODE_ENV` to configure secure cookies.

#### C. Remove exposed credentials

The reviewed Cloudinary configuration contains a hardcoded API secret. Rotate that credential in Cloudinary, remove the fallback values from the source, and use:

```js
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export default cloudinary;
```

Deleting a value from the latest file does not invalidate a credential exposed in Git history. Keep database credentials, JWT secrets, and Cloudinary secrets in backend environment settings only. Vite-prefixed values are public client configuration.

#### D. Protect content-management routes

Story, ad, blog, and upload routes currently lack route-level authentication and role middleware. Apply the existing middleware before the upload/controller handlers for operations intended only for administrators:

```js
import { auth, requireRole } from "../../middleware_temp/authMiddleware.js";

// Example inside backend/modules/blogs/blog.routes.js:
router.post(
  "/",
  auth,
  requireRole("admin"),
  upload.array("images"),
  createBlog
);
```

Apply equivalent checks to admin update/delete operations and audit the remaining modules. Decide separately which uploads should be available to authenticated writers. Keep public read routes accessible as intended. For cookie-authenticated writes, also implement appropriate CSRF defenses, such as validated request origins and CSRF tokens.

#### E. Finish startup and logging cleanup

- Initialize the admin once, after a successful database connection; remove the extra initialization call from `user.routes.js`.
- Make `connectDB()` rethrow connection errors so startup does not proceed as though a failed connection succeeded.
- Remove the middleware that logs whole request bodies and cookies.
- Build the frontend and resolve any build failures before publishing.

### Step 2 — Prepare MongoDB Atlas

1. Create or select an Atlas cluster.
2. Create a database user with the permissions the application needs.
3. Configure Atlas network access for the backend's outbound IP addresses.
4. Set the backend `MONGO_URI` using the base-only format described above, unless you changed the connector to accept a full URI.
5. Keep database credentials out of the frontend and repository.

A new database starts empty. Create categories, authors, and stories through the protected admin workflow before expecting populated content pages.

### Step 3 — Deploy the backend on Render

Create a **Web Service**, connect this GitHub repository, and use:

| Setting | Value |
| --- | --- |
| Branch | `development` |
| Root directory | `backend` |
| Runtime | Node |
| Build command | `npm install` |
| Start command | `npm start` |
| Environment | `NODE_ENV=production` plus backend secrets |

Add `MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`. Let Render provide its port.

Choose the hosting plan shown in your account. Deploy and inspect the logs for both database connection and server startup. Copy the assigned HTTPS backend URL; do not append `/api` when using it as `VITE_API_URL`.

### Step 4 — Deploy the frontend on Vercel

Import the same repository as a separate frontend project:

| Setting | Value |
| --- | --- |
| Production branch | `development` |
| Root directory | `frontend` |
| Framework preset | Vite |
| Install command | `npm install` if using the npm workflow above |
| Build command | `npm run build` |
| Output directory | `dist` |

Set these production environment variables, replacing the example hostname with the actual Render URL:

```dotenv
VITE_API_URL=https://YOUR-BACKEND.onrender.com
VITE_BACKEND_URL=https://YOUR-BACKEND.onrender.com/api/users
```

Do not include a trailing slash. Keep `frontend/vercel.json`; it already rewrites browser routes to `index.html`. Deploy the frontend and copy its assigned URL. Redeploy after changing Vite environment variables because they are incorporated during the build.

### Step 5 — Connect CORS and verify login

Add the exact frontend origin to `allowedOrigins` in `backend/server.js`, with no trailing slash. Keep `credentials: true`; do not replace the origin allowlist with `*` for cookie-authenticated requests. Redeploy the backend.

The existing login/logout controller uses `Secure` and `SameSite=None` cookies in production. Keep `withCredentials: true` on authenticated frontend calls. Browsers may still block cross-site cookies between unrelated Vercel and Render domains. If login fails only under those browser settings, use frontend/API subdomains under the same custom domain or a correctly configured same-origin API proxy.

### Step 6 — Test the live application

- [ ] Backend root responds and database queries succeed.
- [ ] Homepage, categories, stories, and blogs load.
- [ ] Signup, login, refresh, profile, and logout work.
- [ ] A non-admin cannot create, edit, delete, or upload admin content through direct API requests.
- [ ] Admin content operations succeed with a valid admin session.
- [ ] Media uploads and image URLs work.
- [ ] Search, comments, bookmarks, and submissions behave as expected.
- [ ] Refreshing a nested frontend route does not return a hosting 404.
- [ ] Browser Network requests contain no localhost API destinations.
- [ ] Phone and desktop layouts are checked.

After verification, add the actual frontend URL near the top of this README as a **Live Demo** link. Do not publish admin credentials in the README.

### Official deployment references

- [Render: Deploy a Node Express App](https://render.com/docs/deploy-node-express-app)
- [Render: Web Services](https://render.com/docs/web-services)
- [Vercel: Vite](https://vercel.com/docs/frameworks/frontend/vite)
- [Vercel: Environment Variables](https://vercel.com/docs/environment-variables)

## 🛠 Troubleshooting

| Symptom | What to check |
| --- | --- |
| Render reports no open port | Remove the production-only listener guard and bind to the provided port on `0.0.0.0`. |
| Login works but refresh logs out | Inspect `/api/users/me`; `UserContext.jsx` currently uses a literal localhost URL. Check cookie blocking too. |
| CORS error | Match the exact frontend origin in the backend allowlist and redeploy. |
| Admin content stays empty | Replace hardcoded URLs in `AdminContext.jsx`; check database records and API responses. |
| MongoDB connection error | Check credentials, network access, and the URI suffix appended by `mongodb.js`. |
| Upload fails | Check rotated Cloudinary credentials, authorization, and the current 5 MB per-file upload limit. |
| Environment change has no effect | Restart the local Vite server or redeploy the production frontend. |
| Nested route returns 404 | Confirm Vercel deploys from `frontend` and reads its `vercel.json`. |

## 🧭 Development Roadmap

- [ ] Centralize API requests in a shared Axios client.
- [ ] Complete server-side authorization across content modules.
- [ ] Add automated API and authentication tests.
- [ ] Add verified screenshots and a short product walkthrough GIF.
- [ ] Improve loading, error, and empty states consistently.
- [ ] Publish and verify the live demo.

The animated heading uses an external SVG service. GitHub does not run custom JavaScript or CSS from a README. The static title and description remain readable if that service is unavailable. For a product animation, record the real application and add a repository-hosted GIF after verifying the deployment.

## 👩‍💻 Author

**Eman Nazir** — MERN Stack Developer & BS Computer Science Student

[GitHub Profile](https://github.com/Eman-Nazir) · [Project Repository](https://github.com/Eman-Nazir/Storyious-Figma)

## 📄 License

The backend package declares `ISC`, but no root license file was present in the reviewed branch. Add a repository-wide license before making broader reuse claims. Third-party images, videos, and design assets may have separate usage terms.

---

<div align="center">

**Stories bring people together. Code makes the connection possible.**

If you find this project interesting, consider giving it a ⭐.

</div>
