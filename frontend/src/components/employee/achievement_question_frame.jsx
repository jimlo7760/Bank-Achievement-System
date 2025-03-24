function AchievementQuestionFrame(props) {
    return ( 
        <section className="p-1 d-flex flex-column">
            <section className="d-flex flex-row">
                <p className='question_p w_60'>{props.question}</p>
                <div className="w_40 d-flex flex-column flex_center">
                    {props.input}
                    {props.unit}
                </div>
            </section>
        </section>
     );
}

export default AchievementQuestionFrame;