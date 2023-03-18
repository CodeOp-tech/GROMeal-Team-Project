import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom";
import Api from '../helpers/Api';


function OldPlansView(props) {
    const [user, setUser] = useState(null);
    const [ plans, setOldPlans] =useState([]);
    const { planId } = useParams();
    const [errorMsg, setErrorMsg] = useState('');
    let { userId } = useParams();

    useEffect(() => {
        fetchOldPlans();
    }, []);

    async function fetchOldPlans() {
        let myresponse = await Api.getOldPlans(userId);
        if (myresponse.ok) {
            setOldPlans(myresponse.data);
            setErrorMsg('');
        } else {
            setUser(null);
            let msg = `Error ${myresponse.status}: ${myresponse.error}`;
            setErrorMsg(msg);
        }
    }

    if (errorMsg) {
        return <h2 style={{ color: 'red' }}>{errorMsg}</h2>
    }

    if (!user) {
        return <h2>Loading...</h2>;
    }


    //let plansUser = plans.filter(p => p.user_id === u.id); //I WANTED TO FILTER ALL THE PLANS OF THE USER
    //OR OF A USER WITH A SPECIFIC ID
    
    return (
        <div className="OldPlansView">
           
            <h1>Old Plans</h1>
            {plans.map((plan) => (
                <div className="plans" key={user.id}>
                    <p>
                    <Link to={`/plans/${user.id}`}>{plan.id} {plan.title}</Link>
                    </p>
                    </div>
            ))}    
            <Outlet />      
        </div>
        
    );
}


export default OldPlansView;