import React from "react";

import { Link } from "react-router-dom";

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/Home">
          <i className="bi bi-music-note-list mx-3"></i> musico
        </a>
        <div >
        <a className="btn btn-primary" href="/LikedMusic" role="button">
  LikedMusic
</a>

        </div>

        <div
          className="collapse navbar-collapse d-flex justify-content-center"
          id="navbarSupportedContent"
        >
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={handleKeyPress}
            className="form-control me-2 w-75"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button onClick={fetchMusicData} className="btn btn-outline-success">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
