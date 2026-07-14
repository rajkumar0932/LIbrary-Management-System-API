# Library Management System API

A REST API for a small library - books, authors, users, borrowing books (loans) and reviews.
Built with Node + Express and MongoDB (mongoose). Auth is JWT based and file uploads (book
covers / profile pics) go through multer.

## Tech used

- Node.js + Express
- MongoDB with Mongoose
- JWT (jsonwebtoken) for auth
- bcrypt for hashing passwords
- multer for image uploads

## Getting started

1. clone the repo and go inside the folder
2. install the packages

```
npm install
```

3. make a `.env` file in the root (see below)
4. start the server

```
npm run dev
```

server runs on http://localhost:2000

### .env

```
Port=2000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=some_long_random_secret
```

## Folder structure

```
├── controllers/     # request handlers
├── models/          # mongoose schemas
├── routes/          # express routers
├── services/        # db logic (find/create/update etc)
├── config/          # db connection
├── middleware/      # auth check, multer, error handler
├── utils/           # token helper
├── uploads/         # uploaded images get saved here
├── server.js
└── README.md
```

## Auth

Register or login to get a token. Then send it on the protected routes as a header:

```
Authorization: Bearer <token>
```

GET routes for books/authors/reviews are open (no token). Everything that creates/updates/deletes,
and the whole users + loans stuff, needs the token.

## Endpoints

quick list, base url is `http://localhost:2000`

### Auth / Users
- POST `/users/register` - make an account (returns a token)
- POST `/users/login` - login, get a token
- GET `/users` - all users (auth)
- GET `/users/:id` - one user (auth)
- PUT `/users/:id` - update user (auth)
- DELETE `/users/:id` - delete user (auth)
- PATCH `/users/upload-profile-picture` - upload profile pic, form-data field `profilePicture` (auth)

### Books
- GET `/books` - list books, supports pagination + filters (title, author, category)
- GET `/books/:id` - single book (author populated)
- POST `/books` - add a book (auth)
- PUT `/books/:id` - update a book (auth)
- DELETE `/books/:id` - remove a book (auth)
- PATCH `/books/:id/upload-cover` - upload cover, form-data field `cover` (auth)

### Authors
- GET `/authors` - list authors (pagination + filters)
- GET `/authors/:id` - single author
- POST `/authors` - add author (auth)
- PUT `/authors/:id` - update author (auth)
- DELETE `/authors/:id` - delete author (auth)

### Loans (borrow / return) - all need auth
- GET `/loans` - list loans (user + book populated)
- GET `/loans/:id` - single loan
- POST `/loans` - borrow a book (drops availableCopies by 1)
- PATCH `/loans/:id/return` - return the book (bumps availableCopies back up)
- PUT `/loans/:id` - update a loan (eg extend due date)
- DELETE `/loans/:id` - delete a loan record

### Reviews (nested under a book)
- GET `/books/:id/reviews` - reviews for a book (paginated)
- POST `/books/:id/reviews` - add a review (auth). one review per user per book
- PUT `/books/:id/reviews/:reviewId` - update your review (auth, only the author)
- DELETE `/books/:id/reviews/:reviewId` - delete your review (auth, only the author)

## Notes

- uploaded images are served from `/uploads`, eg `http://localhost:2000/uploads/covers/<file>`
- image uploads are limited to jpeg/png/webp, max 2mb
- borrowing checks copies first - cant borrow if availableCopies is 0
- full API + schema docs are in the docs (google doc) separately
