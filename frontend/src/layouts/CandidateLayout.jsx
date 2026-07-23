import Navbar from "../components/common/Navbar";
import CandidateSidebar from "../components/candidate/CandidateSidebar";

import "./CandidateLayout.css";

export default function CandidateLayout({children}){

    return(

        <>

            <Navbar/>

            <div className="candidate-layout">

                <CandidateSidebar/>

                <main className="candidate-main">

                    {children}

                </main>

            </div>

        </>

    );

}