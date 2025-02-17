import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"
import { useEffect, useState } from "react"



function App() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)


  function handleToggleModal() {
    setShowModal(!showModal)
    {/*invert the show modal state*/ }
  }

  useEffect(() => {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    console.log("NASA API KEY:", NASA_KEY); // Check if the API key is being read
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
    
    async function fetchAPIData() {
      try {
        const res = await fetch(url);
        const apiData = await res.json();
        console.log("API Response:", apiData); // Check what response you're getting
        setData(apiData);
      } catch (err) {
        console.log("Fetch Error:", err.message);
      }
    }
    fetchAPIData();
  }, []);
  

  return (
    <>

      {data ? (<Main data = {data} />) :
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      }

      {showModal && (
        <SideBar data = {data} handleToggleModal={handleToggleModal} />
      )}           {/* this is a conditional component works when showmodal is true*/}

      {data && (
        <Footer data = {data} handleToggleModal={handleToggleModal} />
      )} {/*prop*/}

    </>
  )
}

export default App
