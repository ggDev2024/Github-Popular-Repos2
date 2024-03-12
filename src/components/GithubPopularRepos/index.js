import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All', displayStyle: true},
  {id: 'JAVASCRIPT', language: 'Javascript', displayStyle: false},
  {id: 'RUBY', language: 'Ruby', displayStyle: false},
  {id: 'JAVA', language: 'Java', displayStyle: false},
  {id: 'CSS', language: 'CSS', displayStyle: false},
]

class GithubPopularRepo extends Component {
  state = {
    popularRepoList: [],
    categoryRepo: languageFiltersData[0].id,
    initialFilterBtnData: languageFiltersData,
    status: 'isLoading',
  }

  componentDidMount() {
    this.getRepoList()
  }

  filterButtonClicked = uniqueNo => {
    const updatedFiltersData = languageFiltersData.map(eachItem => {
      if (eachItem.id === uniqueNo) {
        return {...eachItem, displayStyle: true}
      }
      return {...eachItem, displayStyle: false}
    })
    console.log(updatedFiltersData)

    this.setState(
      {
        categoryRepo: uniqueNo,
        initialFilterBtnData: updatedFiltersData,
        status: 'isLoading',
      },
      this.getRepoList,
    )
  }

  getRepoList = async () => {
    const {categoryRepo} = this.state

    const url = ` https://apis.ccbp.in/popular-repos?language=${categoryRepo}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const updatedRepoData = data.popular_repos.map(each => ({
        name: each.name,
        repoId: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))

      this.setState({popularRepoList: updatedRepoData, status: 'success'})
    } else {
      this.setState({status: 'failed'})
    }
  }

  renderLoadingPage = () => (
    <div className="loading_container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailurePage = () => (
    <>
      <img
        className="failure_img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure_heading">Something Went Wrong</h1>
    </>
  )

  renderSuccessFetch = popularRepoList =>
    popularRepoList.map(eachRepo => (
      <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
    ))

  render() {
    const {popularRepoList, initialFilterBtnData, status} = this.state

    let content
    switch (status) {
      case 'failed':
        content = this.renderFailurePage()
        break
      case 'success':
        content = this.renderSuccessFetch(popularRepoList)
        break
      default:
        content = this.renderLoadingPage()
    }

    return (
      <div className="container">
        <h1 className="heading">Popular</h1>
        <ul className="language_filter_container">
          {initialFilterBtnData.map(eachItem => (
            <LanguageFilterItem
              filter={eachItem}
              key={eachItem.id}
              filterButtonClicked={this.filterButtonClicked}
            />
          ))}
        </ul>
        <ul className="card_container">{content}</ul>
      </div>
    )
  }
}

export default GithubPopularRepo
