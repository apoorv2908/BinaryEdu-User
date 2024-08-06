import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Classes from './Pages/Classes';
import BookDetails from './Pages/BookDetails';
import Aboutus from './Components/Aboutus';
import Page from "./Components/Access/Page";
import Studentlogin from './Components/Access/Studentlogin';
import Teacherlogin from './Components/Access/Teacherlogin';
import { AuthProvider } from './Components/Access/AuthContext';
import Teacherregister from './Components/Access/Teacherregister';
import Schoollogin from './Components/Access/Schoollogin';
import Subjects from './Pages/Subjects';
import ContactPage from './Components/ContactPage';
import Studentregister from './Components/Access/Studentregister';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Components/Access/ProtectedRoute';
import ChapterPages from './Pages/ChapterPages';
import LoginRequiredModal from './Components/Access/LoginRequiredModal';
import Updatestudents from './Components/Access/Updatestudents';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Page title="Home - Binary Education">
                  <Home />
                </Page>
              }
            />
            <Route
              path="/classes/:class_id"
              element={
                <Page title="Classes - Binary Education">
                  <Classes />
                </Page>
              }
            />
            <Route
              path="/book/:book_id"
              element={
                <Page title="Book Details - Binary Education">
                  <BookDetails />
                </Page>
              }
            />
            <Route
              path="/about"
              element={
                <Page title="About Us - Binary Education">
                  <Aboutus />
                </Page>
              }
            />
            <Route
              path="/login-student"
              element={
                <Page title="Login Student - Binary Education">
                  <Studentlogin />
                </Page>
              }
            />
            <Route
              path="/login-teacher"
              element={
                <Page title="Login Teacher - Binary Education">
                  <Teacherlogin />
                </Page>
              }
            />
            <Route
              path="/register-teacher"
              element={
                <Page title="Registration Teacher - Binary Education">
                  <Teacherregister />
                </Page>
              }
            />
            <Route
              path="/register-student"
              element={
                <Page title="Registration Student - Binary Education">
                  <Studentregister />
                </Page>
              }
            />
            <Route
              path="/login-school"
              element={
                <Page title="Login School - Binary Education">
                  <Schoollogin />
                </Page>
              }
            />
            <Route
              path="/subjects/:subject_id"
              element={
                <Page title="Subjects - Binary Education">
                  <Subjects />
                </Page>
              }
            />
            <Route
              path="/contact-page"
              element={
                <Page title="Contacts - Binary Education">
                  <ContactPage />
                </Page>
              }
            />
            <Route
              path="/user-dashboard/:id"
              element={
                <ProtectedRoute>
                  <Page title="User Dashboard - Binary Education">
                    <Dashboard />
                  </Page>
                </ProtectedRoute>
              }
            />

<Route
              path="/edit-student/:id"
              element={
                <ProtectedRoute>
                  <Page title="Update Details Student - Binary Education">
                    <Updatestudents />
                  </Page>
                </ProtectedRoute>
              }
            />


<Route
              path="/chapterpages/:chapter_id"
              element={
                <ProtectedRoute>
                  <Page title="Book - Binary Education">
                    <ChapterPages />
                  </Page>
                </ProtectedRoute>
                  
      }
            />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
