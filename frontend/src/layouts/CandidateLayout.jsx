import CandidateNavbar from "../components/candidate/CandidateNavbar";
import CandidateSidebar from "../components/candidate/CandidateSidebar";

import "./CandidateLayout.css";

export default function CandidateLayout({children}){

    return(
        <>
            <CandidateNavbar/>
            <div className="candidate-layout">
                <CandidateSidebar/>
                <main className="candidate-main">
                    {children}
                </main>
            </div>
        </>
    );
}