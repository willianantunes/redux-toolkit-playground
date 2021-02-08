import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { RootState } from "./rootReducer"

import { RepoSearchForm } from "features/repoSearch/RepoSearchForm"
import { IssuesListPage } from "features/issuesList/IssuesListPage"
import { IssueDetailsPage } from "features/issueDetails/IssueDetailsPage"

import { displayRepo, setCurrentDisplayType, setCurrentPage } from "features/issuesDisplay/issuesDisplaySlice"

import "./App.css"

type CurrentDisplay =
  | {
      type: "issues"
    }
  | {
      type: "comments"
      issueId: number
    }

const App: React.FC = () => {
  // useDispatch and useSelector are React Redux Hooks!
  // https://react-redux.js.org/api/hooks#usedispatch
  const dispatch = useDispatch()
  // https://react-redux.js.org/api/hooks#useselector
  // The selector is approximately equivalent to the mapStateToProps argument to connect conceptually.
  // useSelector lets us read data from the store and subscribe to updates
  // We can retrieve the state.issuesDisplay slice as one piece, and destructure the result object into multiple variables inside the component.
  const { org, repo, displayType, page, issueId } = useSelector((state: RootState) => state.issuesDisplay)

  // To dispatch Redux actions whenever the user does something, instead of calling the useState setters
  const setOrgAndRepo = (org: string, repo: string) => {
    dispatch(displayRepo({ org, repo }))
  }

  const setJumpToPage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const showIssuesList = () => {
    dispatch(setCurrentDisplayType({ displayType: "issues" }))
  }

  const showIssueComments = (issueId: number) => {
    dispatch(setCurrentDisplayType({ displayType: "comments", issueId }))
  }

  let content

  if (displayType === "issues") {
    content = (
      <React.Fragment>
        <RepoSearchForm org={org} repo={repo} setOrgAndRepo={setOrgAndRepo} setJumpToPage={setJumpToPage} />
        <IssuesListPage
          org={org}
          repo={repo}
          page={page}
          setJumpToPage={setJumpToPage}
          showIssueComments={showIssueComments}
        />
      </React.Fragment>
    )
  } else if (issueId !== null) {
    const key = `${org}/${repo}/${issueId}`
    content = <IssueDetailsPage key={key} org={org} repo={repo} issueId={issueId} showIssuesList={showIssuesList} />
  }

  return <div className="App">{content}</div>
}

export default App
