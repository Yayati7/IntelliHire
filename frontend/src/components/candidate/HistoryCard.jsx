import "./HistoryCard.css";

export default function HistoryCard({

    history,

    onOpen

}){

    return(

        <div className="history-card">

            <div>

                <h3>

                    {history.generatedAt}

                </h3>

            </div>

            <button

                onClick={()=>onOpen(history.historyId)}

            >

                View Top 5

            </button>

        </div>

    );

}