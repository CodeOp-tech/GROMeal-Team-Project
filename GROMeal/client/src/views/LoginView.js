import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Local from '../helpers/Local';
import Api from '../helpers/Api';
import RecipesContext from '../components/RecipesContext';


function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {user, setUserPlans} = useContext(RecipesContext);

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

    async function handleSubmit(event) {
        event.preventDefault();
        await props.loginCb(username, password)
        addUserId();
    }
    
    async function addUserId() {
        const planId = Local.getPlan();
        const userId = Local.getUserId();
        console.log(planId, userId);

        if (planId && userId) {
            console.log(user);
            //PUT to modify
                try {
                    let response = await Api._doFetch(`/api/allplans/${planId}`, 'PUT', {user_id: userId});
                    console.log(response);
                    if (response.ok) {
                        let plans = response.data;
                        setUserPlans(plans);
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