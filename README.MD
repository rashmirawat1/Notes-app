# Notes App – 3-Tier Full-Stack Application  
**FastAPI • React • PostgreSQL • Nginx • Docker Compose**

A clean, production-ready **3-tier web application** for creating, editing, and deleting notes. Fully containerized with Docker and ready for deployment on AWS EC2, Render, Fly.io, DigitalOcean, or any Docker host.

![Preview](https://raw.githubusercontent.com/yourusername/notes-app/main/preview.png)  
*(Replace the link above with a real screenshot after the first deploy)*

## Features

- **Frontend** – Modern React SPA (Create React App) with instant feedback
- **Backend** – FastAPI (Python) with full CRUD API and automatic OpenAPI docs
- **Database** – PostgreSQL with persistent storage
- **Reverse Proxy** – Nginx serves React build and proxies `/api/*` → FastAPI
- **Docker Compose** – One-command local development and production deployment
- **Zero CORS issues** – All API calls go through Nginx proxy
- **Clean URLs** – Access the app at `/` and API at `/api`

## Tech Stack

| Layer           | Technology                          |
|-----------------|-------------------------------------|
| Frontend        | React 18 + Axios                    |
| Backend         | FastAPI + SQLAlchemy + Uvicorn      |
| Database        | PostgreSQL 16                       |
| Web Server      | Nginx (Alpine)                      |
| Containerization| Docker + Docker Compose             |
| Language        | Python 3.12, Node 20                |

## Project Structure

```text
notes-app/
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── requirements.txt
│   ├── .dockerignore
│   └── Dockerfile
├── frontend/                 # React frontend
│   ├── public/
│   │   ├── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── nginx/
│   │   └── nginx.conf        # Nginx reverse proxy config
│   ├── .dockerignore
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .dockerignore
├── .env                      
├── .gitignore                # gitignored – DB credentials
└── README.md
```

## Quick Start (Local)

```bash
# Clone the repo
git clone https://github.com/rashmirawat1/Notes-app.git
cd Notes-app

# Copy and adjust environment variables (optional)
cp .env.example .env # Edit .env if you want custom DB user/password

# Start everything
docker compose up --build -d

# Open the app
http://localhost
API Docs and Swagger UI → http://localhost/api/docs
ReDoc → http://localhost/api/redoc
```

## Docker Commands
```bash
# View logs
docker compose logs -f

# Stop everything
docker compose down

# Full cleanup (including database)
docker compose down -v

# Rebuild after code changes
docker compose up --build -d
```
## Deployment (AWS EC2, DigitalOcean, etc.)

- SSH into your server
- Install Docker + Docker Compose
- Clone this repository
- Run:
```bash
    docker compose up -d
```
- Open port 80 and your app will be live at your server’s public IP or domain!
- Environment Variables (.env)
```bash
    envDB_USER=user
    DB_PASSWORD=password
    DB_NAME=notesdb
    #You can change these – just keep them in sync in docker-compose.yml
```
## Screenshots

### Notes App
![Screenshot-1](screenshots/Screenshot-1.png)

### Docker Configuration 
![Screenshot-2](screenshots/Screenshot-2.png)

![Screenshot-3](screenshots/Screenshot-3.png)

![Screenshot-1](screenshots/Screenshot-4.png)

## Contribution
Pull requests are welcome! Feel free to:
- Improve UI/UX
- Add authentication
- Add tests (PyTest + Jest)
- Optimize Dockerfiles

Enjoy your blazing-fast, fully containerized notes app!