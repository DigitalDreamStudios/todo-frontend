import React from 'react';
import './NotFound.css'
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                    <h2>Page not found</h2>
                </div>
                <Link to="/">Homepage</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
