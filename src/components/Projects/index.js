import {Component} from 'react'
import Loader from 'react-loader-spinner'

import FailureRoute from '../FailureRoute'
import ProjectItems from '../ProjectItems'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Projects extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    projectsList: [],
  }

  componentDidMount() {
    this.getDataFromDataBase()
  }

  getDataFromDataBase = async () => {
    const {activeId} = this.props

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url = `https://apis.ccbp.in/ps/projects?category=${activeId}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const dataFormate = data.projects.map(eachObject => ({
        id: eachObject.id,
        name: eachObject.name,
        imageUrl: eachObject.image_url,
      }))

      this.setState({
        projectsList: dataFormate,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderProjects = () => {
    const {projectsList} = this.state
    return (
      <ul className="container-projects">
        {projectsList.map(eachItem => (
          <ProjectItems key={eachItem.id} details={eachItem} />
        ))}
      </ul>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProjects()
      case apiStatusConstants.failure:
        return <FailureRoute />
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }
}

export default Projects
