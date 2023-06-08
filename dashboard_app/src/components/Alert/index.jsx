import "./index.css"

function Alert({alert, setAlert}) {
    setTimeout(() => {
        setAlert({msg: "", show: false})
    }, 3000)
    return ( <div className="alert">{alert.msg}</div> );
}

export default Alert;