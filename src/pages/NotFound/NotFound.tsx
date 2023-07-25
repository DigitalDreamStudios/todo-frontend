import React from 'react';
import './NotFound.css'

const NotFoundPage: React.FC = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                    <h2>Page not found</h2>
                </div>
                <a href="#">Homepage</a>
            </div>
        </div>
    );
};

export default NotFoundPage;
