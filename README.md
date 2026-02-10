# CiviResolve

A comprehensive civic issue management and resolution platform enabling citizens to report, track, and resolve community issues efficiently.

## Team Members

- **[Amayuru Pramodaya]**
- **[Yasiru Ravidith]** 
- **[Kevin Thulnith]** 
- **[Lahiru De Silva]** 
- **[Kimuthu Gajanayake]** 

## Tech Stack

### Backend
- **Framework**: Django
- **Database**: SQLite3
- **API**: Django REST Framework
- **Authentication**: JWT & Google OAuth
- **Language**: Python

### Frontend
- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: Context API
- **HTTP Client**: Axios

### Key Features
- Issue Submission and Tracking
- Escalation System for Unresolved Issues
- User Authentication (Email, Google OAuth)
- Role-Based Access Control
- Public Issue Dashboard
- Real-time Status Updates
- AI-Powered ChatBot
- Multi-language Support
- File Attachments (Images/Videos)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Python** 3.8 or higher
- **Node.js** 20 or higher
- **npm** or **yarn**
- **Git**

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AmayuruPramodaya/CiviResolve.git
cd CiviResolve
```

### 2. Backend Setup

#### Navigate to Backend Directory
```bash
cd backend
```

#### Create Virtual Environment
```bash
python -m venv venv
```

#### Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

#### Install Dependencies
```bash
pip install -r requirements.txt
```

#### Run Database Migrations
```bash
python manage.py migrate
```

#### Create Superuser (Admin)
```bash
python manage.py createsuperuser
```

#### Run Development Server
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd ../frontend
```

#### Install Dependencies
```bash
npm install
```

#### Configure Environment Variables
Create a `.env` file in the frontend directory (if not exists) and add:
```env
VITE_API_URL=http://localhost:8000
```

#### Run Development Server
```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`

## Available Scripts

### Backend
- `python manage.py runserver` - Start development server
- `python manage.py migrate` - Run database migrations
- `python manage.py makemigrations` - Create new migrations
- `python manage.py test` - Run tests
- `python manage.py createsuperuser` - Create admin user

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production

## Project Structure

```
CiviResolve/
├── backend/              # Django backend application
│   ├── api/             # API endpoints
│   ├── main/            # Main application logic
│   │   ├── models.py    # Database models
│   │   ├── views.py     # API views
│   │   ├── serializers.py # Data serializers
│   │   └── urls.py      # URL routing
│   ├── backend/         # Django settings
│   ├── docs/            # Backend documentation
│   ├── media/           # User uploaded files
│   └── manage.py        # Django management script
│
└── frontend/            # React frontend application
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── contexts/    # React contexts
    │   ├── services/    # API services
    │   └── data/        # Static data
    ├── public/          # Static assets
    └── docs/            # Frontend documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/google/` - Google OAuth login

### Issues
- `GET /api/issues/` - List all issues
- `POST /api/issues/` - Create new issue
- `GET /api/issues/{id}/` - Get issue details
- `PUT /api/issues/{id}/` - Update issue
- `DELETE /api/issues/{id}/` - Delete issue

### Escalation
- `GET /api/escalated-issues/` - List escalated issues
- `POST /api/escalate/{id}/` - Escalate an issue

### User Profile
- `GET /api/profile/` - Get user profile
- `PUT /api/profile/` - Update user profile

## Configuration

### Backend Configuration
Edit `backend/backend/settings.py` for:
- Database settings
- CORS configuration
- Media/Static files paths
- Authentication settings

### Frontend Configuration
Edit `frontend/vite.config.js` for:
- Build configuration
- Proxy settings
- Path aliases

## Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Run Specific Test Files
```bash
python manage.py test main.tests
python test_profile_update.py
python test_escalated_api.py
```

## Deployment

### Backend Deployment
1. Set `DEBUG = False` in settings.py
2. Configure production database
3. Set up proper STATIC_ROOT and MEDIA_ROOT
4. Use a WSGI server (Gunicorn, uWSGI)
5. Configure reverse proxy (Nginx)

### Frontend Deployment
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder to your hosting service

## Troubleshooting

### Common Issues

**Backend server won't start:**
- Check if Python virtual environment is activated
- Verify all dependencies are installed
- Check if port 8000 is available

**Frontend compilation errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`

**Database migration errors:**
- Delete migrations and db.sqlite3 (in development only)
- Recreate migrations and database

## Contact

For questions or support, please contact the team members listed above.

## Acknowledgments

- Django REST Framework documentation
- React documentation
- Tailwind CSS
- All contributors 