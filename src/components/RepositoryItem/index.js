import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {name, starsCount, avatarUrl, forksCount, issuesCount} = eachItem

  return (
    <li className="repo-items">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="repo-name">{name}</h1>
      <div className="stat-cont">
        <img
          className="stat-icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="stat-desc">{starsCount}</p>
      </div>
      <div className="stat-cont">
        <img
          className="stat-icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="stat-desc">{forksCount}</p>
      </div>
      <div className="stat-cont">
        <img
          className="stat-icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="stat-desc">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
