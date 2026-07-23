import CompanySidebar from "../components/company/CompanySidebar";
import "./CompanyLayout.css";

export default function CompanyLayout({children}){

    return(

        <div className="company-layout">

            <CompanySidebar/>

            <main className="company-content">

                {children}

            </main>

        </div>

    );

}