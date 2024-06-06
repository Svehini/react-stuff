import "./PopUp.css";

function PopUp({closePopUp}){
    return (
        <div className="popup-container">
        <div className="popup">
                Click as many green buttons:<br /> like this one: <div className="special-button-showcase"> {} </div> as possible! <br />
                If you click a wrong button you get minus 1 point!
            </div>
            <button 
                className = "close-popup-button" 
                onClick={closePopUp}
                >
                Close
            </button>
        </div>
    );
}

export default PopUp;