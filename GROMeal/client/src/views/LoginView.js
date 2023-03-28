import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Local from '../helpers/Local';
import Api from '../helpers/Api';
import 'react-toastify/dist/ReactToastify.css';
import RecipesContext from "../components/RecipesContext";




function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {warning, setWarning, user, setUser} = useContext(RecipesContext);

    useEffect(() => {
        handleWarning();      
      }, {});

    const handleWarning = event => {
        toast(warning, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
            }      


    function handleChange(event) {
        let { name, value } = event.target;
        switch (name) {
            case 'usernameInput':
                setUsername(value);
                break;
            case 'passwordInput':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.loginCb(username, password);
        addUserId();
    }
    
    async function addUserId () {
        const planId = Local.getPlan();
        const userId = Local.getUserId();
        const username = Local.getUsername
        console.log(username);
        console.log(planId, userId);
        const user= Local.getUser();
        console.log(user);
        if (planId && userId) {
            //PUT to modify
                try {
                    let response = await Api._doFetch(`/allplans/${planId}`, 'PUT', userId);
                    console.log(response);
                    if (response.ok) {
                        let plans = await response.json();
                        props.setUserPlans(plans);
                    } else {
                        console.log(`Server error: ${response.status} ${response.statusText}`);
                    }
                } catch (err) {
                    console.log("hello");
                    console.log(`Server error: ${err.message}`);
                }
            
        
        }

    }

    return (
        
        <div className='inline-block align-middle' style={{height: "100vh"}}>
        <div className="mx-auto col-10 col-md-8 col-lg-3">
        <div onLoadStart={handleWarning}>
        <ToastContainer
                position="//#region"
                autoClose={10}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />   
                                     
        </div>
            <div className="row justify-content-between text-left">
                <h2>Login</h2>
                
                {
                    props.loginError && (
                        <div className="alert alert-danger">{props.loginError}</div>
                    )
                }

                <form className="form-group col-12 flex-column d-flex" onSubmit={handleSubmit}>
                    
                        <label className="form-control-label px-1">Username
                            <input
                                type="text"
                                name="usernameInput"
                                required
                                className="form-control form-control-lg"
                                value={username}
                                onChange={handleChange}
                            />
                        </label>

                        <label className="form-control-label px-1">Password
                            <input
                                type="password"
                                name="passwordInput"
                                required
                                className="form-control form-control-lg"
                                value={password}
                                onChange={handleChange}
                            />
                        </label>

                    <button type="submit" id="buttonA" className="btn btn-warning px-5 btn-lg mt-3">SUBMIT</button>
                </form>

                <div className='align-items-center'>
                   Not yet a member? <Link to="/register" type="submit">REGISTER</Link>
                </div>
            </div>
        </div>
        </div>
    );

}

export default LoginView;