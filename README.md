# 🎬 Netflix Clone - TMDB API Showcase

A **Netflix-inspired streaming interface** built with modern web technologies to showcase **TMDB API integration** and **trailer watching capabilities**. This project demonstrates how to create a movie browsing platform with search functionality, cast information, and seamless video streaming.

🔗 **GitHub Repository**: [https://github.com/Nashid-k/netflix-clone](https://github.com/Nashid-k/netflix-clone)  
📦 **Stack**: React (Vite) | Node.js | Express | MongoDB | TailwindCSS | Zustand

---

## 🎯 Project Overview

This **Netflix clone** serves as a comprehensive showcase of **TMDB (The Movie Database) API integration** and modern web development practices. The project demonstrates how to build a movie streaming interface with trailer watching capabilities, advanced search functionality, and detailed cast information - all powered by real movie data from TMDB API.

---

## ✨ Key Features

### 🎬 **TMDB API Integration**
- **Movie Database** - Access to extensive movie and TV show catalog
- **Real-time Data** - Up-to-date movie information, ratings, and metadata
- **High-quality Images** - Movie posters, backdrops, and cast photos
- **Trending Content** - Daily and weekly trending movies and shows
- **Genre Categories** - Organized content by movie genres
- **Release Information** - Accurate release dates and production details

### 📺 **Trailer Watching Experience**
- **Embedded Trailers** - Watch movie trailers directly in the app
- **YouTube Integration** - Seamless trailer playback
- **Trailer Quality** - HD trailer streaming
- **Fullscreen Mode** - Immersive trailer viewing experience

### 🔍 **Advanced Search System**
- **Multi-parameter Search** - Search by movie name, cast, or genre
- **Real-time Filtering** - Instant search results as you type
- **Cast-based Search** - Find movies by actor/actress names
- **Smart Suggestions** - Search recommendations from TMDB data

### 👥 **Cast & Crew Information**
- **Cast Profiles** - Detailed actor/actress information
- **Cast Movies** - View all movies featuring specific cast members
- **Cast Biography** - Actor background and career details
- **Filmography** - Complete movie history for each cast member
- **Cast Photos** - Professional headshots and images

### 🎨 **User Interface & Experience**
- **Netflix-like Design** - Authentic Netflix UI/UX
- **Responsive Layout** - Perfect on all device sizes
- **Hover Effects** - Interactive movie cards and menus
- **Smooth Animations** - Fluid transitions and micro-interactions
- **Dark Theme** - Netflix's signature dark aesthetic
- **Grid & Carousel Views** - Multiple content display options

### 👤 **User Management**
- **User Authentication** - Secure login/signup system
- **User Profiles** - Personalized user accounts
- **Username Display** - User identification in navbar
- **Session Management** - Persistent login sessions

---

## 🗂️ Project Structure

```
netflix-clone/
├── backend/                # Node.js backend API
│   ├── config/             # Database and app configuration
│   ├── controllers/        # API route handlers and business logic
│   ├── middleware/         # Custom middleware (protectRoute, etc.)
│   ├── models/             # MongoDB data models and schemas
│   ├── routes/             # API endpoint definitions
│   ├── services/           # External API services and utilities
│   ├── utils/              # Backend helper functions
│   └── server.js           # Express server entry point
├── frontend/               # React frontend application
│   ├── public/             # Static assets and public files
│   ├── src/                # Source code directory
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages/routes
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # Zustand state management
│   │   ├── utils/          # Frontend helper functions
│   │   └── App.jsx         # Main App component
│   ├── .gitignore          # Frontend git ignore rules
│   ├── eslint.config.js    # ESLint configuration
│   ├── index.html          # HTML entry point
│   ├── package.json        # Frontend dependencies
│   ├── postcss.config.js   # PostCSS configuration
│   ├── tailwind.config.js  # TailwindCSS configuration
│   └── vite.config.js      # Vite build tool configuration
├── node_modules/           # Project dependencies
├── .gitignore              # Root git ignore rules
├── package.json            # Root package configuration
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or Atlas)
- **TMDB API Key** (free registration required)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nashid-k/netflix-clone.git
   cd netflix-clone
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Get TMDB API Key**
   - Visit [TMDB](https://www.themoviedb.org/) and create an account
   - Go to Settings > API and request an API key
   - Copy your API key for environment configuration

6. **Environment Configuration**
   
   Create `.env` file in the backend directory:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/netflix-clone
   
   # JWT Configuration
   JWT_SECRET=your-jwt-secret-key
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # TMDB API Configuration
   TMDB_API_KEY=your-tmdb-api-key
   TMDB_BASE_URL=https://api.themoviedb.org/3
   
   # CORS Configuration
   CLIENT_URL=http://localhost:5173
   ```

   Create `.env` file in the frontend directory:
   ```env
   # API Configuration
   VITE_API_URL=http://localhost:5000/api
   
   # TMDB Configuration
   VITE_TMDB_API_KEY=your-tmdb-api-key
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
   ```

7. **Start the Development Servers**
   
   **Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend Server (new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

8. **Access the Application**
   - **Frontend**: `http://localhost:5173`
   - **Backend API**: `http://localhost:5000`

---

## 🛠️ Technologies Used

### **Frontend Technologies**
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### **Backend Technologies**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **Cors** - Cross-origin resource sharing

### **External APIs**
- **TMDB API** - The Movie Database for all movie/TV data
- **YouTube API** - Trailer video integration
- **TMDB Images** - High-resolution movie posters and backdrops

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server auto-restart
- **Concurrently** - Run multiple scripts

---

## 📱 Features in Detail

### **TMDB API Integration**
- **Movie Catalog**: Browse thousands of movies and TV shows with real data
- **Trending Section**: Display daily and weekly trending content
- **Genre Organization**: Movies categorized by genres from TMDB
- **High-Quality Assets**: Movie posters, backdrops, and cast images
- **Detailed Information**: Plot summaries, ratings, release dates, runtime

### **Search Functionality**
- **Smart Search**: Find content by movie title, cast name, or director
- **Real-time Results**: Instant search results as you type
- **Cast Search**: Search for actors and view their complete filmography
- **No Results Handling**: Elegant empty state when no matches found

### **Movie Details & Cast**
- **Comprehensive Info**: Full movie details including plot, cast, crew
- **Trailer Integration**: Embedded YouTube trailers with fullscreen support
- **Cast Profiles**: Detailed actor information with biography and photos
- **Related Movies**: Similar movie recommendations
- **Cast Filmography**: Complete list of movies for each actor

### **User Experience**
- **Netflix UI**: Authentic Netflix-inspired design and layout
- **Responsive Design**: Seamless experience across all devices
- **Loading States**: Smooth loading animations and placeholders
- **Error Handling**: User-friendly error messages and retry options
- **Interactive Elements**: Hover effects and smooth transitions

---

## 🔧 TMDB API Setup Guide

### **Getting Your API Key**
1. Visit [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Create a free account
3. Go to your account settings
4. Navigate to the API section
5. Request an API key (v3 auth)
6. Fill out the application form
7. Once approved, copy your API key

### **API Endpoints Used**
```javascript
// Popular Movies
GET /movie/popular

// Search Movies
GET /search/movie?query={query}

// Movie Details
GET /movie/{movie_id}

// Movie Videos/Trailers
GET /movie/{movie_id}/videos

// Similar Movies
GET /movie/{movie_id}/similar

// Person Details
GET /person/{person_id}

// Person Movies
GET /person/{person_id}/movie_credits
```

---

## 🎨 UI/UX Features

### **Netflix-Inspired Design**
- **Dark Theme**: Netflix's signature dark color scheme
- **Typography**: Netflix Sans-inspired font choices
- **Color Palette**: Red accents with dark backgrounds
- **Layout Structure**: Hero sections, carousels, and grid layouts

### **Interactive Elements**
- **Hover Effects**: Movie card animations and info previews
- **Smooth Scrolling**: Fluid horizontal carousels
- **Modal Windows**: Overlay modals for movie details
- **Navigation**: Clean navbar with user profile dropdown
- **Loading Animations**: Skeleton screens and spinners

### **Responsive Behavior**
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect iPad and tablet experience  
- **Desktop Layout**: Full-featured desktop interface
- **Touch Friendly**: Swipe gestures for mobile carousels

---

## 🚀 Deployment

### **Frontend Deployment (Vercel)**
```bash
cd frontend
npm run build
# Deploy dist folder to Vercel or Netlify
```

### **Backend Deployment (Railway/Render)**
```bash
cd backend
# Set production environment variables
# Deploy to cloud platform
```

### **Production Environment**
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CLIENT_URL=https://your-frontend-domain.com
TMDB_API_KEY=your-tmdb-api-key
```

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- **TMDB API Integration** - Working with external movie databases and handling API responses
- **Video Integration** - Implementing trailer playback with YouTube integration
- **Modern React Development** - Hooks, custom hooks, and component composition
- **State Management** - Zustand for lightweight and efficient state handling
- **RESTful API Design** - Building scalable backend APIs with Express.js
- **Database Design** - MongoDB schema design for user authentication
- **Responsive Web Design** - Mobile-first approach with TailwindCSS
- **Search Implementation** - Building intelligent search with real-time filtering
- **Authentication Systems** - JWT-based secure user authentication
- **UI/UX Design** - Creating Netflix-inspired user interfaces

---

## 🔮 Future Enhancements

- [ ] **Movie Recommendations** - Suggest movies based on viewing history
- [ ] **User Watchlists** - Save movies to personal watch later lists
- [ ] **Movie Reviews** - User rating and review system
- [ ] **Advanced Filters** - Filter by year, rating, genre, language
- [ ] **Full Video Streaming** - Actual movie playback beyond trailers

---

## 🐛 Troubleshooting

### **TMDB API Issues**
```bash
# API Key not working
- Verify API key is correct in .env files
- Check if API key is approved and active
- Ensure no extra spaces in environment variables

# Rate limit errors
- TMDB allows 40 requests per 10 seconds
- Implement request throttling if needed
- Check API usage in TMDB dashboard
```

### **Development Issues**
```bash
# Frontend not connecting to backend
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend .env
- Verify CORS configuration allows frontend URL

# Database connection errors
- Ensure MongoDB is running locally
- Check MONGODB_URI format and credentials
- Verify database permissions and network access
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow ESLint and Prettier configurations
- Test TMDB API integrations thoroughly
- Ensure responsive design on all devices
- Add proper error handling for API failures
- Update documentation for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Nashid K** - [nashidk1999@gmail.com](mailto:nashidk1999@gmail.com)

Project Link: [https://github.com/Nashid-k/netflix-clone](https://github.com/Nashid-k/netflix-clone)

---

## 🙏 Acknowledgments

- **Netflix** for the original design inspiration
- **TMDB** for providing comprehensive movie database API
- **React Community** for excellent documentation and resources
- **TailwindCSS** for the utility-first CSS framework
- **Vite** for the blazing-fast development experience
- **YouTube** for trailer integration capabilities

---
