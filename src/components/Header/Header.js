import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { Link, useHistory } from "react-router-dom";
import { UserContext } from '../../App';
 
const Header = () => {
    const [ loggedInUser, setLoggedInUser ] = useContext(UserContext);
    console.log(loggedInUser)
    const history = useHistory();
    const handleSignOut = () => {
        setLoggedInUser('')
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId")
    }
    return (
        <div className='header'>
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Orders Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {
                    loggedInUser.email ? <button 
                    onClick={handleSignOut}
                    className="add-cart-btn">Sign out</button> : <button 
                    onClick={() => history.push('/login')}
                    className="add-cart-btn">Sign in</button>
                }
            </nav>
        </div>
    );
};

export default Header;