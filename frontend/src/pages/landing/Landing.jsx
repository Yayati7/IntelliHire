import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import RoleCard from "../../components/common/RoleCard";
import FeatureCard from "../../components/common/FeatureCard";

import "./Landing.css";

import {

FaUserGraduate,

FaBuilding,

FaLaptopCode

} from "react-icons/fa";

import {useNavigate} from "react-router-dom";

export default function Landing(){

const navigate=useNavigate();

return(

<>

<Navbar/>

<section className="hero">

<h1>

Find Your Dream Job

Using Explainable AI

</h1>

<p>

Hybrid AI Recommendation Platform

built using

Spring Boot,

FastAPI,

Sentence Transformers,

PyTorch

and

Microservices.

</p>

<button

onClick={()=>navigate("/login")}

>

Get Started

</button>

</section>

<section

id="workflow"

className="workflow"

>

<h1>

How IntelliHire Works

</h1>

<div className="steps">

<div>

Upload Resume

</div>

<div>

↓

</div>

<div>

AI Extracts Text

</div>

<div>

↓

</div>

<div>

Generates Embeddings

</div>

<div>

↓

</div>

<div>

Ranks Jobs

</div>

<div>

↓

</div>

<div>

Apply

</div>

</div>

</section>

<section

id="roles"

className="roles"

>

<h1>

Choose Your Role

</h1>

<div className="role-container">

<RoleCard

icon={<FaUserGraduate/>}

title="Candidate"

description="Upload resume, receive AI recommendations and apply."

buttonText="Continue"

onClick={()=>navigate("/login?role=USER")}

/>

<RoleCard

icon={<FaBuilding/>}

title="Company"

description="Post jobs, review applicants and hire."

buttonText="Continue"

onClick={()=>navigate("/login?role=RECRUITER")}

/>

<RoleCard

icon={<FaLaptopCode/>}

title="Developer"

description="Analytics, monitoring and AI insights."

buttonText="Continue"

onClick={()=>navigate("/login?role=ADMIN")}

/>

</div>

</section>

<section

id="features"

className="features"

>

<h1>

Platform Features

</h1>

<div className="feature-container">

<FeatureCard

title="Resume Parsing"

description="Automatic resume parsing using PyMuPDF."

/>

<FeatureCard

title="AI Recommendation"

description="Sentence Transformers + Hybrid ML."

/>

<FeatureCard

title="Explainable AI"

description="Every recommendation is fully explainable."

/>

<FeatureCard

title="Secure Platform"

description="JWT, OAuth2, AES, Redis, RBAC."

/>

<FeatureCard

title="Recommendation History"

description="Stores latest AI recommendation sessions."

/>

<FeatureCard

title="Microservices"

description="Spring Boot Cloud architecture."

/>

</div>

</section>

<Footer/>

</>

);

}