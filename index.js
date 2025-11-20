import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from "cors";   
import session from "express-session"; // Import session
import "dotenv/config.js"; 
import db from './Kambaz/Database/index.js';
import UserRoutes from './Kambaz/Users/routes.js';
import CourseRoutes from './Kambaz/Courses/routes.js';
import ModuleRoutes from './Kambaz/Modules/routes.js';
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";

const app = express();

// --- START CORS FIX: Use a function to check multiple origins ---
const ALLOWED_ORIGINS = [
    // 1. The URL set in your Render environment variable (CLIENT_URL)
    process.env.CLIENT_URL, 
    // 2. The standard local development URL (fixing your typo)
    'http://localhost:3000', 
    // 3. Your main, root Vercel domain (replace with your actual root domain if needed)
    'https://kambaz-next-js-466h.vercel.app' 
];

// Regex to match Vercel preview/branch deployment URLs (which end in -projects.vercel.app)
const vercelPreviewRegex = /-vishwa-pujaras-projects\.vercel\.app$/;

app.use(cors(
    {
        credentials: true,
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps, or curl requests)
            if (!origin) return callback(null, true); 

            // Allow if the origin is explicitly in the list
            if (ALLOWED_ORIGINS.includes(origin)) {
                return callback(null, true);
            }

            // Allow if the origin matches the Vercel preview URL pattern
            if (origin.match(vercelPreviewRegex)) {
                return callback(null, true);
            }

            // Block all other origins
            console.log('CORS Blocked Origin:', origin);
            return callback(new Error('Not allowed by CORS'));
        }
    }
));
// --- END CORS FIX ---

app.use(express.json());
UserRoutes(app, db);
CourseRoutes(app, db);
AssignmentsRoutes(app, db);
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000)