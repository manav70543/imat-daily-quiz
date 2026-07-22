import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import History from "./pages/History";
import Profile from "./pages/Profile";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import NotFound from "./pages/NotFound";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import Subjects from "./pages/Subjects";
import Questions from "./pages/Questions";
import Quizzes from "./pages/Quizzes";
import QuizDetails from "./pages/QuizDetails";
import QuizStudents from "./pages/QuizStudents";
import StudentAttempt from "./pages/StudentAttempt";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import StudentLayout from "./layouts/StudentLayout";


function App() {

    return (

        <Routes>

            {/* =====================================
                PUBLIC ROUTES
            ===================================== */}

            <Route
                path="/"
                element={<Login />}
            />
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
            />


            {/* =====================================
                PROTECTED STUDENT ROUTES
            ===================================== */}

            <Route element={<ProtectedRoute />}>

                <Route element={<StudentLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/quiz"
                        element={<Quiz />}
                    />

                    <Route
                        path="/leaderboard"
                        element={<Leaderboard />}
                    />

                    <Route
                        path="/history"
                        element={<History />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                </Route>

            </Route>


            {/* =====================================
                ADMIN LOGIN
            ===================================== */}

            <Route
                path="/admin/login"
                element={<AdminLogin />}
            />


            {/* =====================================
                PROTECTED ADMIN ROUTES
            ===================================== */}

            <Route element={<AdminProtectedRoute />}>

                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/subjects"
                    element={<Subjects />}
                />

                <Route
                    path="/admin/students"
                    element={<Students />}
                />

                <Route
                    path="/admin/students/:id"
                    element={<StudentDetails />}
                />

                <Route
                    path="/admin/questions"
                    element={<Questions />}
                />

                <Route
                    path="/admin/quizzes"
                    element={<Quizzes />}
                />

                <Route
                    path="/admin/quizzes/:id"
                    element={<QuizDetails />}
                />

                <Route
                    path="/admin/quizzes/:id/students"
                    element={<QuizStudents />}
                />

                <Route
                    path="/admin/students/:studentId/attempt/:quizId"
                    element={<StudentAttempt />}
                />

            </Route>


            {/* =====================================
                404 PAGE
            ===================================== */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default App;