import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const TravelGuide = () => {
  console.log('Travel Guide')

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // console.log('Logic Here')
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const fetchData = async () => {
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const responseData = await response.json()
        const updatedData = responseData.packages.map(each => ({
          id: each.id,
          imageUrl: each.image_url,
          name: each.name,
          description: each.description,
        }))
        setData(updatedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  console.log(data)
  console.log()

  return (
    <div className="bg-container">
      <div style={{textAlign: 'center'}}>
        <h1 className="heading">Travel Guide</h1>
      </div>
      {isLoading ? (
        <div data-testid="loader" style={{textAlign: 'center'}}>
          <Loader type="BallTriangle" color="#00BFFF" height={70} width={70} />
        </div>
      ) : (
        <div className="api-data-container">
          {data.map(each => (
            <div className="container" key={each.id}>
              <img className="image" src={each.imageUrl} alt={each.name} />
              <div className="details-container">
                <h1 className="name-heading">{each.name}</h1>
                <p>{each.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TravelGuide
