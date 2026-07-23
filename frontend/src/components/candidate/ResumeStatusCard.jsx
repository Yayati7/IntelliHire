import "./ResumeStatusCard.css";

export default function ResumeStatusCard({

resumeUploaded,

onUpload,

onUpdate

}){

return(

<div className="resume-status">

<div>

<h2>

Resume

</h2>

<p>

{

resumeUploaded

?

"Resume uploaded successfully."

:

"No resume uploaded."

}

</p>

</div>

<button

onClick={

resumeUploaded

?

onUpdate

:

onUpload

}

>

{

resumeUploaded

?

"Update Resume"

:

"Upload Resume"

}

</button>

</div>

);

}