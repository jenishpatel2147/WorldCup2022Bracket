import React from 'react'

function form_data(){
    return(
        <div className="form-container">
            <h2>Creating Profile</h2>
            <form method="POST" action="http://127.0.0.1:5000/add-user">
                <div>
                    <label>First Name</label>
                    <input type="text" name="first_name" required />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="last_name" required />
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" name="username" required />
                </div>
                <div>
                    <label>password</label>
                    <input type="text" name="password" required/>
                </div>
                <div>
                    <label>email</label>
                    <input type="text" name="email" required />
                </div>
                <div>
                    <button type="submit">Create Profile</button>
                </div>
            </form>
        </div>
    );
}

export default form_data;