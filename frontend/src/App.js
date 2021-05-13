import React, { Fragment, useState, useEffect } from 'react';
import form_data from "./components/form_data"
import './App.css';

const App = () => {
    useEffect(() => {
        const getAPI = () => {
            // Endpoint Address can be changed to whatever 
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/';

            fetch(API)
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setLoading(false);
                    setApiData(data);
                });
        };
        getAPI();
    }, []);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    return (
      <Fragment>
          <header>
              <h1>EuroBracket 2021</h1>
          </header>
          <form_data />
      </Fragment>
    );
};

export default App;