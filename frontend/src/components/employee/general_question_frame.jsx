function GeneralQuestionFrame(props) {
    const p_class = props.type === 'admin' ? 'w_20' : 'question_p w_20';
    return ( 
        <section className="px-3 mt-2 d-flex flex-column">
            <section className="d-flex flex-row">
                <p className={p_class}>{props.question}</p>
                <div className="w_80">
                    {props.input}
                    {props.unit}
                </div>
            </section>
        </section>
     );
}

export default GeneralQuestionFrame;