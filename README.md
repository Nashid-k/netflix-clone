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
- **Auto-play Options** - Configurable trailer auto-play
- **Fullscreen Mode** - Immersive trailer viewing experience

### 🔍 **Advanced Search System**
- **Multi-parameter Search** - Search by movie name, cast, or genre
- **Real-time Filtering** - Instant search results as you type
- **Cast-based Search** - Find movies by actor/actress names
- **Intelligent Suggestions** - Smart search recommendations
- **Search History** - Recent search tracking

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
- **User Preferences** - Customizable viewing preferences

### 🎬 **Streaming Features**
- **Movie Player** - Built-in video player interface
- **Playback Controls** - Standard video controls
- **Quality Selection** - Multiple streaming quality options
- **Fullscreen Mode** - Immersive viewing experience
- **Continue Watching** - Resume from where you left off

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
- **Git** for version control
- **Modern web browser**

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

5. **Environment Configuration**
   
   Create `.env` file in the backend directory:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/netflix-clone
   
   # JWT Configuration
   JWT_SECRET=your-jwt-secret-key
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Movie API Configuration (TMDB)
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

6. **Start the Development Servers**
   
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

7. **Access the Application**
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
- **React Query** - Data fetching and caching

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

### **Search Functionality**
- **Smart Search**: Find content by title, cast, director, or genre
- **Autocomplete**: Real-time search suggestions
- **Filter Options**: Advanced filtering by year, rating, genre
- **Search History**: Keep track of recent searches
- **No Results Handling**: Elegant empty state design

### **Movie Details Page**
- **Comprehensive Info**: Plot, cast, crew, ratings, release date
- **Trailer Integration**: Embedded trailer playback
- **Cast Carousel**: Scrollable cast member showcase
- **Similar Movies**: Recommendation engine
- **User Reviews**: Community ratings and reviews

### **Cast Profile Pages**
- **Biography**: Detailed actor/actress information
- **Filmography**: Complete list of movies and shows
- **Photo Gallery**: Professional photos and stills
- **Career Statistics**: Awards, nominations, career span

### **User Interface**
- **Netflix Aesthetics**: Authentic color scheme and typography
- **Responsive Design**: Seamless experience across devices
- **Loading States**: Elegant loading animations
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant design

---

## 🎨 UI/UX Features

### **Interactive Elements**
- **Hover Effects**: Movie card animations and previews
- **Smooth Scrolling**: Fluid carousel navigation
- **Modal Windows**: Overlay for movie details
- **Dropdown Menus**: User profile and navigation menus
- **Progress Indicators**: Loading and buffering states

### **Responsive Design**
- **Mobile First**: Optimized for mobile devices
- **Tablet Layout**: Perfect iPad and tablet experience
- **Desktop Experience**: Full-featured desktop interface
- **Touch Gestures**: Swipe and tap interactions

---

## 🔧 Configuration & Setup

### **TMDB API Setup**
1. Create account at [TMDB](https://www.themoviedb.org/)
2. Request API key from developer section
3. Add API key to environment variables
4. Configure API endpoints in application

### **Database Setup**
```bash
# Start MongoDB locally
mongod --dbpath /path/to/your/db

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env file
```

### **Development Scripts**
```json
{
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd backend && npm run dev",
    "client": "cd frontend && npm run dev",
    "build": "cd frontend && npm run build",
    "start": "cd backend && npm start"
  }
}
```

---

## 🚀 Deployment

### **Frontend Deployment (Vercel/Netlify)**
```bash
cd frontend
npm run build
# Deploy dist folder to hosting service
```

### **Backend Deployment (Railway/Heroku)**
```bash
cd backend
# Configure production environment variables
# Deploy to cloud platform
```

### **Production Environment Variables**
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CLIENT_URL=https://your-frontend-domain.com
```

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- **TMDB API Integration** - Working with external movie databases
- **Video Integration** - Implementing trailer playback functionality
- **Modern React Patterns** - Hooks, context, custom hooks
- **State Management** - Zustand for application state
- **API Integration** - Third-party service integration and data handling
- **Database Design** - MongoDB schema design for user data
- **Authentication** - JWT-based user authentication
- **Responsive Design** - Mobile-first development approach
- **Search Implementation** - Building intelligent search with API data
- **UI/UX Design** - Creating Netflix-inspired user experiences

---

## 🔮 Future Enhancements

- [ ] **User Watchlists** - Personal movie collections
- [ ] **Recommendation Engine** - AI-powered suggestions
- [ ] **Social Features** - User reviews and ratings
- [ ] **Download Feature** - Offline viewing capability
- [ ] **Multiple Languages** - Internationalization support
- [ ] **Admin Panel** - Content management system
- [ ] **Analytics Dashboard** - User behavior tracking
- [ ] **Progressive Web App** - PWA capabilities
- [ ] **Real-time Notifications** - Push notifications
- [ ] **Video Streaming** - Actual video playback integration

---

## 🐛 Troubleshooting

### **Common Issues**

**Frontend not connecting to backend:**
```bash
# Check if backend is running on correct port
# Verify VITE_API_URL in frontend .env
# Check CORS configuration in backend
```

**TMDB API errors:**
```bash
# Verify API key is correct
# Check API rate limits
# Ensure internet connection for API calls
```

**Database connection issues:**
```bash
# Verify MongoDB is running
# Check database URI format
# Ensure database permissions
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
- Write meaningful commit messages
- Add comments for complex logic
- Test features before submitting PRs
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
- **MongoDB** for the flexible document database

---
