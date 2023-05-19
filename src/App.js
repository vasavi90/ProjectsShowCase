import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Navbar from './components/Navbar'
import FailureRoute from './components/FailureRoute'
import Projects from './components/Projects'

import './App.css'

//This is the list (static data) used in the application. You can move it to any component if needed.

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Replace your code here
class App extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    projectsList: [],
    activeId: categoriesList[0].id,
  }

  componentDidMount() {
    this.getDataFromDataBase()
  }

  getDataFromDataBase = async () => {
    const {activeId} = this.state
    tis.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url = `https://apis.ccbp.in/ps/projects?category=${activeId}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok == true) {
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

  onChangeTrigger = event => {
    this.setState({
      activeId: event.target.value,
    })
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderProjects = () => {
    const {projectsList} = this.state
    return (
      <ul className="container">
        {projectsList.projects.map(eachItem => (
          <Projects key={eachItem.id} details={eachItem} />
        ))}
      </ul>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProjects()
      case apiStatusConstants.failure:
        return <FailureRoute/>
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
  }

  render() {
    const {activeId} = this.state
    return (
      <>
        <Navbar />
        <div className="app-container">
          <select
            id="select"
            onChange={this.onChangeTrigger}
            value={activeId}
            className="select"
          >
            {categoriesList.map(eachItem => (
              <option key={eachItem.id} value={eachItem.id}>
                {eachItem.displayText}
              </option>
            ))}
          </select>
          {this.renderView()}
        </div>
      </>
    )
  }
}

export default App
