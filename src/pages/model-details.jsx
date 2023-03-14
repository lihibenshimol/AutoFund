import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { carService } from "../services/car.service.local"


export function ModelDetails() {
    const [car, setCar] = useState(null)
    const [carImg, setCarImg] = useState(null)
    const [popup, togglePopup] = useState(false)
    const { carName } = useParams()
    const { modelId } = useParams()
    const [loanOffer, setLoanOffer] = useState({ loanAmount: 1000, duration: 10 })

    useEffect(() => {
        loadCar()
        loadCarDetails()
    }, [])

    async function loadCar() {
        try {
            const model = await carService.getById(modelId)
            findCarImg(model.models, carName);
        } catch (err) {
            console.log('err = ', err)
        }
    }

    function findCarImg(carModels, modelName) {
        const car = carModels.find(model => model.name.toLowerCase() === modelName.toLowerCase());
        setCarImg(car.img)
    }

    async function loadCarDetails() {
        try {
            const car = await carService.getModelDetails(carName)
            setCar(car)
        } catch (err) {
        }
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setLoanOffer((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function getAvgMonthlyReturn() {
        const amount = loanOffer.loanAmount
        const duration = loanOffer.duration
        const monthlyInterest = 0.14

        const monthlyPaymentAmount = amount / duration // excluding interest
        let remainingPaymentForInterest = amount
        let totalMonthlyPayment = 0

        for (let i = 0; i < duration; i++) {
            const interestPayment = remainingPaymentForInterest * monthlyInterest //interest payment for this month
            remainingPaymentForInterest -= monthlyPaymentAmount
            const monthlyPayment = monthlyPaymentAmount + interestPayment
            totalMonthlyPayment += monthlyPayment
        }

        const averageMonthlyPayment = totalMonthlyPayment / duration
        
        return {
            averageMonthlyPayment: averageMonthlyPayment.toFixed(2),
            totalPayment: totalMonthlyPayment.toFixed(2)
        }

    }

    return (
        <>
            <header className="">
               {car && <div className="details-header">
                    <h1>{car.make.toUpperCase()} {carName}</h1>
                    <img src={carImg} alt="" />
               <span><NavLink to={'/AutoFund'}>Cars</NavLink></span> 
                </div> }
            </header>

            <div className="main-container">
                {car && <section className="model-details">

                    <div className="container">
                        <div className="details-container">
                            <div className="info">
                                <h3>Fuel type:<span> {car.fuel_type} </span> </h3>
                                <h3>Class:<span> {car.class}</span></h3>
                                <h3>Year:<span> {car.year}</span></h3>
                                <h3>Transmission: <span> {car.transmission}</span></h3>
                            </div>

                            <div className="actions">
                                <button>Get a Quote</button>
                                <button onClick={() => togglePopup(!popup)}>Finance Offer</button>
                            </div>
                        </div>


                        {popup && <section className="finance-offer-popup">
                            <h1 className="title">Loan Suggesiton</h1>
                            <h3 className="name">{car.make} {car.model}</h3>

                            <section className="sliders">
                                <span>
                                    <label htmlFor="loanAmount">Loan amount: {loanOffer.loanAmount} NIS</label>
                                    <input type="range"
                                        step={500}
                                        min={0}
                                        max={20000}
                                        id="loanAmount"
                                        name="loanAmount"
                                        value={loanOffer.amount}
                                        onChange={handleChange}
                                    />
                                </span>

                                <span>
                                    <label htmlFor="duration">Duration: {loanOffer.duration} months</label>
                                    <input type="range"
                                        min={3}
                                        max={36}
                                        id="duration"
                                        name="duration"
                                        placeholder="By max price"
                                        value={loanOffer.duration}
                                        onChange={handleChange}
                                    />
                                </span>
                            </section>

                            <div className="finance-offer">

                                <section className="offer">
                                    <h3>Average monthly return: <span>{getAvgMonthlyReturn().averageMonthlyPayment} NIS</span></h3>
                                    <h3>Total Payment: <span>{getAvgMonthlyReturn().totalPayment} NIS</span> </h3>
                                </section>

                            </div>

                        </section>}
                    </div>
                </section>}
            </div>
        </>
    )
}