import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/course/:id" element={<CourseDetail />} />
                <Route path="/quiz/:id" element={<Quiz />} />
            </Routes>
        </Router>
    );
}

export default App;
