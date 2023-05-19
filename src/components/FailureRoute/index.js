import './index.css'

const FailureRoute = () => (
  <div className="failure-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
      alt="failure view"
      className="failure-img "
    />
    <h1 className="failure-heading">Oops! Something Went Wrong</h1>
    <p className="text">We cannot seem to find the page you are looking for.</p>
    <button type="button" className="failure-button">
      Retry
    </button>
  </div>
)

export default FailureRoute
