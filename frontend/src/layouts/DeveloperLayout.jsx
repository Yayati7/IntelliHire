import DeveloperSidebar from "../components/developer/DeveloperSidebar";
import "./DeveloperLayout.css";

export default function DeveloperLayout({children}){

    return(

        <div className="developer-layout">

            <DeveloperSidebar/>

            <main className="developer-content">

                {children}

            </main>

        </div>

    );

}