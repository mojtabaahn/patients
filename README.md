# Patients Management System

A full-stack web application for managing patient data with a Django REST API backend and React frontend.

## 🏗️ Project Structure

```
base_directory/
├── backend/          # Django REST API
├── frontend/         # React + Vite application
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Python 3.8+** (for backend)
- **Node.js 18+** (for frontend)
- **pnpm** (package manager for frontend)

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-name>
```

#### 2. Backend Setup (Django)

Navigate to the backend directory and set up the Django application:

```bash
cd backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Generate sample patient data (optional)
python manage.py seed

# Start the development server
python manage.py runserver
```

The Django backend will be available at: `http://localhost:8000`

#### 3. Frontend Setup (React + Vite)

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend

# Install dependencies using pnpm
pnpm install

# Start the development server
pnpm dev
```

The React frontend will be available at: `http://localhost:5173`

## 🏃‍♂️ Running the Application

To run both frontend and backend simultaneously:

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   source venv/bin/activate  # Activate virtual environment
   python manage.py runserver
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   pnpm dev
   ```

## 🛠️ Technology Stack

### Backend
- **Django 5.2+** - Web framework
- **Django REST Framework** - API development
- **django-filter** - Advanced filtering
- **django-cors-headers** - CORS handling
- **SQLite** - Database (development)

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router Dom** - Client-side routing
- **Tailwind CSS** - Styling framework
- **HeroUI** - UI component library
- **SWR** - Data fetching
- **Lucide React** - Icons
