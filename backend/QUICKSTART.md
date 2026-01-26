# Rails Backend Quick Start

## 1. Install Dependencies

```bash
cd backend
bundle install
```

Note: If you get errors about `psych` gem, that's okay - it won't prevent the app from working.

## 2. Configure Database

Edit `config/database.yml` if needed. Default PostgreSQL configuration:

```yaml
development:
  adapter: postgresql
  encoding: unicode
  database: backend_development
  pool: 5
  username: postgres  # Change if needed
  password:           # Add your password if needed
  host: localhost
```

## 3. Create and Setup Database

```bash
# Create the database
rails db:create

# Run migrations
rails db:migrate
```

## 4. Start the Server

```bash
rails server -p 3001
```

The API will be running at `http://localhost:3001`

## 5. Test the API

You can test the authentication endpoints:

### Signup
```bash
curl -X POST http://localhost:3001/api/v1/signup \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "email": "test@example.com",
      "password": "password123",
      "password_confirmation": "password123",
      "name": "Test User"
    }
  }' \
  -c cookies.txt
```

### Login
```bash
curl -X POST http://localhost:3001/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

### Get Current User
```bash
curl http://localhost:3001/api/v1/current_user \
  -b cookies.txt
```

### Logout
```bash
curl -X DELETE http://localhost:3001/api/v1/logout \
  -b cookies.txt
```

## Common Issues

### PostgreSQL not running
```bash
# macOS with Homebrew
brew services start postgresql

# Linux
sudo service postgresql start
```

### Database doesn't exist
```bash
rails db:create
```

### Migrations not run
```bash
rails db:migrate
```

### Port 3001 already in use
```bash
# Find and kill the process
lsof -ti:3001 | xargs kill -9

# Or use a different port
rails server -p 3002
```

## Adding New Models

Example: Adding a Habit model

```bash
# Generate the model
rails generate model Habit user:references label:string weekly_target:integer

# Run the migration
rails db:migrate

# Create the controller
touch app/controllers/api/v1/habits_controller.rb

# Add routes in config/routes.rb
# resources :habits
```

## Rails Console

To interact with your database directly:

```bash
rails console

# Examples:
User.all
User.create(email: "test@example.com", password: "password123", name: "Test")
User.find_by(email: "test@example.com")
```

## Useful Commands

```bash
# Check routes
rails routes

# Reset database (WARNING: deletes all data)
rails db:reset

# Rollback last migration
rails db:rollback

# View logs
tail -f log/development.log
```
