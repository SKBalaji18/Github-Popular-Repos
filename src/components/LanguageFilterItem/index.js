import './index.css'

const LanguageFilterItem = props => {
  const {eachTopic, isActive, changeLanguage} = props
  const btnClass = isActive ? 'active' : 'non-active'

  const onChangeLanguage = () => {
    changeLanguage(eachTopic.id)
  }

  return (
    <li className="topic-item">
      <button onClick={onChangeLanguage} type="button" className={btnClass}>
        {eachTopic.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
