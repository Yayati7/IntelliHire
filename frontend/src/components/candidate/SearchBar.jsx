import "./SearchBar.css";

export default function SearchBar({

title,

setTitle,

location,

setLocation,

search,

reset

}){

return(

<div className="search-bar">

<input

placeholder="Job Title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>

<input

placeholder="Location"

value={location}

onChange={(e)=>setLocation(e.target.value)}

/>

<button

onClick={search}

>

Search

</button>

<button

onClick={reset}

>

Reset

</button>

</div>

);

}