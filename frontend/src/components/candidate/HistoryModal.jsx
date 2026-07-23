import "./HistoryModal.css";

export default function HistoryModal({

    open,

    data,

    onClose

}){

    if(!open) return null;

    return(

        <div className="modal-overlay">

            <div className="modal">

                <h2>

                    Top 5 Recommendations

                </h2>

                {

                    data?.recommendations?.map(

                        (job,index)=>(

                            <div

                                key={index}

                                className="history-job"

                            >

                                <b>

                                    #{index+1}

                                </b>

                                {" "}

                                {job.title}

                                {" - "}

                                {job.finalScore}%

                            </div>

                        )

                    )

                }

                <button

                    onClick={onClose}

                >

                    Close

                </button>

            </div>

        </div>

    );

}