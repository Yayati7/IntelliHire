import "./SearchBar.css";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function SearchBar({ title, setTitle, location, setLocation, search, reset }) {
    return (
        <div className="search-bar">
            <div className="input-group">
                <FaSearch />
                <input
                    placeholder="Job Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="input-group">
                <FaMapMarkerAlt />
                <input
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <div className="search-bar-actions">
                <button className="btn btn-primary" onClick={search}>Search</button>
                <button className="btn btn-outline" onClick={reset}>Reset</button>
            </div>
        </div>
    );
}