import "./RoleCard.css";

export default function RoleCard({

    icon,

    title,

    description,

    buttonText,

    onClick

}){

    return(

        <div className="role-card">

            <div className="role-icon">

                {icon}

            </div>

            <h2>

                {title}

            </h2>

            <p>

                {description}

            </p>

            <button

                onClick={onClick}

            >

                {buttonText}

            </button>

        </div>

    );

}