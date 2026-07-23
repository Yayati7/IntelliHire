import "./ProfileCard.css";

export default function ProfileCard({

    user

}){

    return(

        <div className="profile-card">

            <h2>

                Candidate Information

            </h2>

            <div className="profile-grid">

                <div>

                    <strong>Name</strong>

                    <p>{user.name}</p>

                </div>

                <div>

                    <strong>Email</strong>

                    <p>{user.email}</p>

                </div>

                <div>

                    <strong>Phone</strong>

                    <p>{user.phone}</p>

                </div>

                <div>

                    <strong>Role</strong>

                    <p>{user.role}</p>

                </div>

            </div>

        </div>

    );

}