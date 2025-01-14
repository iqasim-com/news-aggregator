const Toast = ({message, className}: {message: string | null, className: string}) => (
  <div className="toast">
    <p className={className}>{message}</p>
  </div>
)

export default Toast
