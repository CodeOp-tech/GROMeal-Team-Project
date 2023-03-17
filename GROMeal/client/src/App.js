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
    const [user, setUser] = useState(Local.getUser());
    const [loginErrorMsg, setLoginErrorMsg] = useState('');
    const navigate = useNavigate();

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
            
            <div className="container">
                <Routes>
                    <Route path="/"element={<HomeView/>} />
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
                    <Route path="/recipes/:planId" element={<RecipesView /> } />                    
                    <Route path="/shoppinglist/:planId" element={<ShoppingListView /> } />      
                    <Route path="/weekPlan/:planId" element={<WeekPlanView /> } />
                    <Route path="*" element={<ErrorView code="404" text="Page not found" />} />
                </Routes>
            </div>
            {/* <div>
                <button>
                    <NavLink to="/recipes">
                        Create a plan
                    </NavLink>
                </button>
            </div> */}
        </div>
    );
}




export default App;