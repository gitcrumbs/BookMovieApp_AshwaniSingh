import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import './Header.css'
import "../../assets/logo.svg"
import LoginRegister from "../loginModal/LoginRegister";


const Header = () => {

  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loginClick, setloginClick] = useState(false);
  

  const handleLogout = () =>{  
    setloginClick(false);
    setisLoggedIn(false)
  }
  
  
  
  const handleLogin= () =>{ 
    setloginClick(true);  
   
  }

 

  return (
    <div id="header_container" >
      <div id="header_component" >
        <img id="logoImage" alt="logo" src={require("../../assets/logo.svg")} ></img>
      
        {loginClick ? <LoginRegister loginClick={loginClick} setloginClick={setloginClick} setisLoggedIn={setisLoggedIn}/>: null}

        {isLoggedIn ? <div className="button_container">          
          <div className="header_buttons">
            <Button variant="contained" size="small" color="default" style={{ marginRight: "10px" }} onClick={handleLogout} >Logout</Button>
          </div>

        </div> : <div className ="button_container">
        
        <div className ="header_buttons">   
         <Button  variant="contained" size="small" color="default" style={{marginRight: "10px"}} onClick={handleLogin}>Login</Button>
        </div>
  
      </div>}

      </div>

      


    </div>
  );

}
export default Header;
