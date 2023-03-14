import { useEffect, useState } from 'react'
import { carService } from '../services/car.service.local.js'
import { Link, useNavigate } from 'react-router-dom'
import { AppHeader } from '../cmps/app-header.jsx'

export function CarIndex() {

    const [cars, setCars] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadCars()
    }, [])

     async function loadCars() {
        try {
            const cars = await carService.query()
            setCars(cars)
    
        } catch (err) {
            console.log('Cannot load cars', err)
       
        }
    
    }

    function goToModels(carId) {
        navigate(`/AutoFund/${carId}`)
    }

    return (
        <div>
            <AppHeader />
            <main>
                {cars && <article className="car-list">
                    {cars.map(car =>
                        <div className="car-preview" key={car._id} onClick={() => goToModels(car._id)} >
                            <h4>{car.vendor}</h4>
                            <img className='img' src={require(`../assets/img/${car.vendor.toLowerCase()}.png`)} alt="car" />
                        </div>)
                    }
                </article>}
            </main>
        </div>
    )
}