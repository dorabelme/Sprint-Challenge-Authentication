import React, { useState, useEffect } from "react";
import { Card, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './display.scss';
import axios from "axios";
import '../../styles.css';

// axios.defaults.withCredentials = true;


function Display({ token }) {
    console.log(token);

    const _token = token || localStorage.getItem('token');
    console.log(_token);

    const [data, setData] = useState([]);

    useEffect(() => {
        let config = {
            headers: {
                Authorization: _token
            }
        }

        axios.get('http://localhost:3300/api/jokes', config)
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [token]);

    return (
        <div className="cards">
            {data.map(joke => {
                return (
                    <Card key={joke.id}>
                        <Card.Content>
                            <Card.Header>{`${joke.joke || 'N/A'}`}</Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='like' />
                                Likes
      </a>
                            <a>
                                <Icon name='share alternate' />
                                Shares
      </a>
                        </Card.Content>
                    </Card>)
            })}
        </div>
    )
}

export default Display;