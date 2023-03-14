import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { carService } from "../services/car.service.local"


export function Models() {
    const [model, setModel] = useState(null)
    const { modelId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadModel()
    }, [])

    async function loadModel() {
        try {
            const Model = await carService.getById(modelId)
            setModel(Model)
        } catch (err) {
            console.log('err = ', err)
        }
    }

    return (
        <>
            <div className="model-page main-container">

                <h1>{model?.vendor}</h1>

                <article className="model-list">
                    {model?.models.map(car =>
                        <div onClick={() => navigate(`/${modelId}/${car.name}`)} className="model-preview" key={car.id}>
                              <img className='img' src={car.img} alt="car" />
                            <h1>{car.name}</h1>
                            <p>{car.price}$</p>
                        </div>
                    )}
                </article>
            </div>
        </>
    )
}