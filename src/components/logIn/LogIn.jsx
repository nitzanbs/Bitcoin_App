import React from 'react'
import '../logIn/logIn.css'
import { useState, useEffect } from "react";


function LogIn(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitHandler(e);
  };

  return (
    <div>

      <div className="ContainerForSignLog">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={props.changeHandler}
            name="email"
            type="text"
            placeholder="Email"
          />
          <input
            onChange={props.changeHandler}
            name="password"
            type="password"
            placeholder="Password"
          />
          <button>Log In</button>
        </form>
      </div>
    </div>
  )
}

export default LogIn