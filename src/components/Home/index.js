import {Component} from 'react'

import Navbar from '../Navbar'

import Projects from '../Projects'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

// Replace your code here
class App extends Component {
  state = {
    activeId: categoriesList[0].id,
  }

  onChangeTrigger = event => {
    this.setState({
      activeId: event.target.value,
    })
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
          <Projects activeId={activeId} />
        </div>
      </>
    )
  }
}

export default App
