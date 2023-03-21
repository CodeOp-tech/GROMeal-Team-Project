import React, { useState, useEffect } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Local from './helpers/Local';
import Api from './helpers/Api';

import NavBar from './components/NavBar';

import PrivateRoute from './components/PrivateRoute';
import LoginView from './views/LoginView';
import ErrorView from './views/ErrorView';
import OldPlansView from './views/OldPlansView';
import UsersView from './views/UsersView';
import Spoonacular from './views/Spoonacular';
import HomeView from './views/HomeView';
import ShoppingListView from './views/ShoppingListView';
import RecipesView from './views/RecipesView';
import WeekPlanView from './views/WeekPlanView';

function App() {

    const [plans, setPlans] = useState([]);
    const [user, setUser] = useState(Local.getUser());
    const [loginErrorMsg, setLoginErrorMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getPlans();
      }, []);

    // Get All plans of the app
    async function getPlans() {
  
    try {
      let response = await fetch(`/api/allplans`);
      if (response.ok) {
          let plans = await response.json();
          setPlans(plans);
          console.log(plans);
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
  }

    useEffect(() => {
        getPlans();
      }, []);

    // Get All plans of the app
    async function getPlans() {
  
    try {
      let response = await fetch(`/api/allplans`);
      if (response.ok) {
          let plans = await response.json();
          setPlans(plans);
          console.log(plans);
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
  }

    async function doLogin(username, password) {
        let myresponse = await Api.loginUser(username, password);
        if (myresponse.ok) {
            console.log(myresponse);
            Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
            setUser(myresponse.data.user);
            setLoginErrorMsg('');
            navigate('/');
        } else {
            setLoginErrorMsg('Login failed');
        }
    }
    
 
    function doLogout() {
        Local.removeUserInfo();
        setUser(null);
        // (NavBar will send user to home page)
    }

    return (
        <div className="App">
            <NavBar user={user} logoutCb={doLogout} />
            
            <div>
                <Routes>
                    <Route path="/"element={<HomeView plans={plans} setPlans={setPlans}/>} />
                    <Route path="/users" element={<UsersView />} />
                    <Route path="/users/:userId" element={
                        <PrivateRoute>
                            <OldPlansView />
                        </PrivateRoute>
                    } />
                    
                    <Route path="/login" element={
                        <LoginView 
                            loginCb={(u, p) => doLogin(u, p)} 
                            loginError={loginErrorMsg} 
                        />
                    } />

                    <Route path="/spoon" element={<Spoonacular /> } />
                    
                    <Route path="/shoppinglist/:planId" element={<ShoppingListView /> } />
                    
                    <Route path="/recipes/:planId" element={<RecipesView /> } />

                    
                    <Route path="/shoppinglist/:planId" element={<ShoppingListView /> } />
                    
                    <Route path="/recipes/:planId" element={<RecipesView /> } />

                    <Route path="/weekPlan/:planId" element={<WeekPlanView /> } />
                    <Route path="*" element={<ErrorView code="404" text="Page not found" />} />
                </Routes>
            </div>
           
        </div>
    );
}




export default App;