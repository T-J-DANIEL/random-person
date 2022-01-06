import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPhone,
  faHome,
  faBirthdayCake,
  faMailBulk,
  faTag,
} from "@fortawesome/free-solid-svg-icons"

// TODO add await syntax to the fetch statement

function App() {
  const url = "https://randomuser.me/api/"
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState()

  const [displayText, setDisplayText] = useState({ title: "", value: "" })
  const [displayImg, setDisplayImg] = useState("")
  // name email age street phone password
  const handleMouseOver = (e) => {
    if (user && !isLoading) {
      switch (e.target.id) {
        case "a":
          setDisplayText({
            title: "My name is:",
            value: `${user.name.first} ${user.name.last}`,
          })
          break
        case "b":
          setDisplayText({ title: "My email is:", value: user.email })
          break
        case "c":
          setDisplayText({ title: "My age is:", value: user.dob.age })
          break
        case "d":
          setDisplayText({
            title: "My street is:",
            value: `${user.location.street.number} ${user.location.street.name}`,
          })
          break
        case "e":
          setDisplayText({
            title: "My phone is:",
            value: user.phone,
          })
          break
        default:
          console.log("nope")
      }
    }
  }
  const getUser = async () => {
    setIsLoading(true)
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setUser(json.results[0])

        setIsLoading(false)
        setDisplayImg(json.results[0].picture.large)
        setDisplayText({
          title: "My name is:",
          value: `${json.results[0].name.first} ${json.results[0].name.last}`,
        })
      })
      .catch(() => {
        console.log("fetch error")
      })
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <main>
      <div className="background">
        <div className="background-1"></div>
        <div className="background-2"></div>
      </div>
      <div className="card">
        <div className="card-header">
          <div className="img-container">
            <img src={displayImg} alt="avatar" />
          </div>
        </div>
        <div className="card-main">
          <div className="card-text">
            <h2>{user && !isLoading ? displayText.title : "loading"}</h2>
            <h1>{user && !isLoading ? displayText.value : "loading"}</h1>
          </div>
          <div className="card-icons">
            <button
              id="a"
              onMouseOver={(e) => {
                console.log(e.target.id)
                handleMouseOver(e)
              }}
            >
              <FontAwesomeIcon icon={faTag} />
            </button>
            <button
              id="b"
              onMouseOver={(e) => {
                console.log(e.target.id)
                handleMouseOver(e)
              }}
            >
              <FontAwesomeIcon icon={faMailBulk} />
            </button>
            <button
              id="c"
              onMouseOver={(e) => {
                console.log(e.target.id)
                handleMouseOver(e)
              }}
            >
              <FontAwesomeIcon icon={faBirthdayCake} />
            </button>
            <button
              id="d"
              onMouseOver={(e) => {
                console.log(e.target.id)
                handleMouseOver(e)
              }}
            >
              <FontAwesomeIcon icon={faHome} />
            </button>
            <button
              id="e"
              onMouseOver={(e) => {
                console.log(e.target.id)
                handleMouseOver(e)
              }}
            >
              <FontAwesomeIcon icon={faPhone} />
            </button>
          </div>
          <button
            className="random-user-button"
            onClick={() => {
              getUser()
            }}
          >
            random user
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
