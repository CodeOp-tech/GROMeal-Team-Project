import React, { useState } from 'react';

const EMPTY_USER = {
    username: '',
    password: '',
    email: ''
  };

function RegisterView(props) {
    const [newUser, setNewUser] = useState(EMPTY_USER); 
    const [user, setUser] = useState('');

    //POST a new user
    async function addUser (user) {
        console.log(user);
        let options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        };
        try {
          let response = await fetch(`/api/register`, options);
          if (response.ok) {
            let user = await response.json();
            setUser(user);
          } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
          }
        } catch (err) {
          console.log(`Server error: ${err.message}`);
        }
      }
    

     
  
  function handleSubmit(event) {
    event.preventDefault();
    addUser(newUser);
    setNewUser(EMPTY_USER);
  }

  function handleChange(event) {
    let { name, value } = event.target;
        setNewUser(data => ({
            ...data, 
            [name]: value
        }));
    }

    return (
        <div className="LoginView row">
            <div className="col-4 offset-4">
                <h2>Register</h2>
                
                <form onSubmit={handleSubmit} className="form-group col-12 flex-column d-flex">
                    <div>
                        <label>Username
                            <input
                                type="text"
                                name="username"
                                required
                                className="form-control form-control-lg"
                                value={newUser.username}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>Password
                            <input
                                type="password"
                                name="password"
                                required
                                className="form-control form-control-lg"
                                value={newUser.password}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>Email
                            <input
                                type="email"
                                name="email"
                                required
                                className="form-control form-control-lg"
                                value={newUser.email}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <button id="buttonA" type="submit" className="btn btn-warning px-5 btn-lg">SUBMIT</button>
                </form>
            </div>
        </div>
    );

}

export default RegisterView;