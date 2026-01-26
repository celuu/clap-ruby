# Rails Backend Setup

## Prerequisites
- Ruby 3.1.1
- PostgreSQL
- Bundler

## Setup Instructions

1. Install dependencies:
```bash
cd backend
bundle install
```

2. Configure your database:
Edit `config/database.yml` with your PostgreSQL credentials.

3. Create and migrate the database:
```bash
rails db:create
rails db:migrate
```

4. Start the server:
```bash
rails server -p 3001
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/v1/signup` - Register a new user
  - Body: `{ "user": { "email": "...", "password": "...", "password_confirmation": "...", "name": "..." } }`
  
- `POST /api/v1/login` - Login
  - Body: `{ "email": "...", "password": "..." }`
  
- `DELETE /api/v1/logout` - Logout
  
- `GET /api/v1/current_user` - Get current authenticated user

### Profile
- `GET /api/v1/profile` - Get user profile (requires authentication)
- `PUT /api/v1/profile` - Update user profile (requires authentication)
  - Body: `{ "profile": { "name": "...", "email": "..." } }`

## Adding More Models

You can add habit tracking and other models by:

1. Generate a model:
```bash
rails generate model ModelName field:type
```

2. Run migrations:
```bash
rails db:migrate
```

3. Create controllers in `app/controllers/api/v1/`
4. Add routes in `config/routes.rb`
