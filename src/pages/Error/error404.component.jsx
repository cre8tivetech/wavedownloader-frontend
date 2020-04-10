import React from "react";
import { Link } from "react-router-dom";
import "./error404.styles.scss";
const Error404 = () => {
  return (
    <div className="error404-section card">
      <h1>404</h1>
      <h2>Page not found</h2>
      <h3>
        The link you clicked may be broken or the page may have been removed or
        renamed
      </h3>
      <Link to="/">
        <div className="btn">
          <i className="fad fa-long-arrow-left"></i> Go back
        </div>
      </Link>
    </div>
  );
};
export default Error404;
