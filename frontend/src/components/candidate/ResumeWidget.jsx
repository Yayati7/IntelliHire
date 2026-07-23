import "./ResumeWidget.css";

export default function ResumeWidget({

resumeUploaded,

onUpload,

onUpdate

}){

return(

<div className="resume-widget">

<h2>

Resume

</h2>

{

resumeUploaded?

<>

<p>

Resume Uploaded ✔

</p>

<button

onClick={onUpdate}

>

Update Resume

</button>

</>

:

<>

<p>

No Resume Uploaded

</p>

<button

onClick={onUpload}

>

Upload Resume

</button>

</>

}

</div>

);

}