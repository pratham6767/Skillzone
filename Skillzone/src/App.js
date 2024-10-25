import React from "react";
import { Route, Routes,useNavigate } from "react-router-dom";
import "./App.css";
import Home from './pages/Home';
import Navbar from './components/common/Navbar'
import Login from './pages/login'
import Signup from './pages/Signup'
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgetPassword from "./pages/ForgetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/Myprofile";
import Error from './pages/Error'
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Cart from './components/core/Dashboard/Cart';
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails.jsx";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)
  return (

    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter text-white">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />
        <Route path="signup" element={
          <OpenRoute>
          <Signup />
          </OpenRoute>}/>
        <Route path="login"element={
          <OpenRoute>
          <Login />
          </OpenRoute>} />

        <Route path="forgot-password"element={
          <OpenRoute>
          <ForgetPassword/>
          </OpenRoute>} />
        <Route path="update-password/:id"element={
          <OpenRoute>
          <UpdatePassword/>
          </OpenRoute>} />
        <Route path="verify-email"element={
          <OpenRoute>
          <VerifyEmail/>
          </OpenRoute>} />  
        <Route path="/about"element={
          
          <About/>
          } />  
        <Route path="/contact"element={<Contact/>}/>
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        ) 
      }

      {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          
          </>
        )
      }

        </Route>



        <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>

        
        <Route path="*" element={<Error />} />
      </Routes>

    </div>
  );
}

export default App;
