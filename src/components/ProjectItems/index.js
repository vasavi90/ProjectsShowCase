import './index.css'

const ProjectItems = props => {
  const {details} = props
  const {name, imageUrl} = details

  return (
    <li className="list">
      <img src={imageUrl} className="image" alt={name} />
      <h1 className="name">{name}</h1>
    </li>
  )
}

export default ProjectItems
