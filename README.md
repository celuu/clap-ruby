# CLAP - Ruby on Rails Backend Migration

This project has been migrated from Supabase to a Ruby on Rails backend.

## Project Structure

```
clap-ruby/
├── backend/          # Rails API backend
└── frontend/         # React frontend
```

## Backend Setup (Rails)

### Prerequisites
- Ruby 3.1.1
- PostgreSQL
- Bundler

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
bundle install
```

3. Configure your database:
Edit `config/database.yml` with your PostgreSQL credentials.

4. Create and migrate the database:
```bash
rails db:create
rails db:migrate
```

5. Start the Rails server:
```bash
rails server -p 3001
```

The API will be available at `http://localhost:3001`

### Current API Endpoints

#### Authentication
- `POST /api/v1/signup` - Register a new user
  ```json
  {
    "user": {
      "email": "user@example.com",
      "password": "password123",
      "password_confirmation": "password123",
      "name": "John Doe"
    }
  }
  ```

- `POST /api/v1/login` - Login
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `DELETE /api/v1/logout` - Logout

- `GET /api/v1/current_user` - Get current authenticated user

#### Profile
- `GET /api/v1/profile` - Get user profile (requires authentication)
- `PUT /api/v1/profile` - Update user profile (requires authentication)
  ```json
  {
    "profile": {
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
  ```

### Adding More Features

The habit tracking, high/low entries, and other features need to be implemented. Here's how:

1. **Generate models:**
```bash
# Example: Habit model
rails generate model Habit user:references label:string weekly_target:integer

# Example: HabitCompletion model
rails generate model HabitCompletion user:references habit:references completed_at:datetime

# Example: DailyHighLow model
rails generate model DailyHighLow user:references date:date high_content:text low_content:text
```

2. **Run migrations:**
```bash
rails db:migrate
```

3. **Create controllers** in `app/controllers/api/v1/`:
```ruby
# Example: app/controllers/api/v1/habits_controller.rb
module Api
  module V1
    class HabitsController < ApplicationController
      before_action :require_authentication

      def index
        habits = current_user.habits
        render json: habits
      end

      def create
        habit = current_user.habits.build(habit_params)
        if habit.save
          render json: habit, status: :created
        else
          render json: { errors: habit.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # Add more actions as needed

      private

      def habit_params
        params.require(:habit).permit(:label, :weekly_target)
      end
    end
  end
end
```

4. **Add routes** in `config/routes.rb`:
```ruby
namespace :api do
  namespace :v1 do
    # ... existing routes ...
    resources :habits
    resources :habit_completions
    resources :daily_high_lows
  end
end
```

## Frontend Setup (React)

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```bash
REACT_APP_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

### Frontend Changes

#### Removed
- `@supabase/supabase-js` dependency
- `src/config/supabase.ts` file

#### Added
- `src/config/api.ts` - API configuration and fetch helper
- Updated all service files to use the new Rails API

#### Service Files Status
- ✅ `loginService.ts` - Fully implemented
- ✅ `userService.ts` - Fully implemented
- ⚠️ `habitService.ts` - Stubbed (needs Rails backend implementation)
- ⚠️ `highLowService.ts` - Stubbed (needs Rails backend implementation)

The habit and high/low services have placeholder implementations that log warnings. You'll need to:
1. Create the Rails models and controllers
2. Uncomment the API calls in the service files
3. Test the integration

## Authentication

The app uses cookie-based session authentication:
- Sessions are stored in cookies
- CORS is configured to allow credentials from `localhost:3000` and `localhost:3001`
- The `fetchWithCredentials` helper in `src/config/api.ts` handles sending cookies with requests

## Development Workflow

1. Start the Rails backend: `cd backend && rails server -p 3001`
2. Start the React frontend: `cd frontend && npm start`
3. Access the app at `http://localhost:3000`

## Next Steps

1. ✅ User authentication - COMPLETE
2. ⏳ Habit tracking models and API
3. ⏳ Daily high/low models and API
4. ⏳ Profile customization
5. ⏳ Dashboard statistics
6. ⏳ Weather integration (if needed)

## Notes

- The Rails backend uses PostgreSQL. Make sure it's installed and running.
- CORS is configured for development. You'll need to update it for production.
- Sessions use cookies. For production, configure secure cookies in `config/application.rb`.
- The frontend service files have TODO comments where Rails implementation is needed.
