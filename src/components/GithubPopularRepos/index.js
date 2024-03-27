import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const activeViewsConst = {
  succ: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  fail: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    languageDetailsData: [],
    activeStatus: 'INITIAL',
    activeId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getLanguageData()
  }

  onSuccessView = () => {
    const {languageDetailsData} = this.state

    return (
      <ul className="repo-item-container">
        {languageDetailsData.map(eachItem => (
          <RepositoryItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  onFailureView = () => (
    <div className="fail-view-cont">
      <img
        className="fail-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="fail-head">Something Went Wrong </h1>
    </div>
  )

  onLoadingView = () => (
    <div className="load-view-cont" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getLanguageData = async () => {
    this.setState({activeStatus: activeViewsConst.inProgress})

    const {activeId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
      }))

      this.setState({
        languageDetailsData: updatedData,
        activeStatus: activeViewsConst.succ,
      })
    } else if (response.status === 401) {
      this.setState({activeStatus: activeViewsConst.fail})
    }
  }

  changeLanguage = id => {
    this.setState({activeId: id}, this.getLanguageData)
  }

  resultView = () => {
    const {activeStatus} = this.state

    switch (activeStatus) {
      case activeViewsConst.succ:
        return this.onSuccessView()
      case activeViewsConst.fail:
        return this.onFailureView()
      case activeViewsConst.inProgress:
        return this.onLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="home-bg-container">
        <div className="home-card-container">
          <h1 className="home-head">Popular</h1>
          <ul className="topic-list-container">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                key={eachItem.id}
                eachTopic={eachItem}
                isActive={eachItem.id === activeId}
                changeLanguage={this.changeLanguage}
              />
            ))}
          </ul>
          {this.resultView()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
