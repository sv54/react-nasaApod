import { useEffect, useState } from 'react'
import Main from './components/Main.jsx'
import SideBar from './components/SideBar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`
      const today = new Date()
      const localkey = `NASA-${today}`
      console.log(localkey)
      if (localStorage.getItem(localkey)) {
        const apiData = JSON.parse(localStorage.getItem(localkey))
        setData(apiData)
        console.log('Fetched from cache')
        return
      }
      //localStorage.clear()


      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localkey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API')
        console.log('Data\n', apiData)
      }
      catch (err) {
        console.log(err.message)
      }
    }
    fetchAPIData()
  }, [])

  return (
    <>
      {data ? (<Main data={data} />) :
        <div className='loadingState'>
          <i className="fa-solid fa-gear"></i>
        </div>
      }
      {showModal && (<SideBar handleToggleModal={handleToggleModal} data={data}></SideBar>)}
      {data && (<Footer handleToggleModal={handleToggleModal} data={data}></Footer>)}
    </>
  )
}

export default App
