import "./ResumeCard.css";

export default function ResumeCard({

resume,

onUpdate

}){

return(

<div className="resume-card">

<h2>

Resume

</h2>

<p>

Current Resume

</p>

<h3>

{resume.fileName}

</h3>

<button

onClick={onUpdate}

>

Update Resume

</button>

</div>

);

}