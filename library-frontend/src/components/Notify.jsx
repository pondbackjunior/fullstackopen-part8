const Notify = (props) => {
    return (
        <div>
            {props.message}
            {props.errorMessage}
        </div>
    )
}

export default Notify