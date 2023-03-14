import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
const key = process.env.REACT_APP_API_KEY

const STORAGE_KEY = 'car'

_createDemoCars()

export const carService = {
    query,
    getById,
    getModelDetails

}

async function query(filterBy = {}) {
    let cars = await storageService.query(STORAGE_KEY)
    if (filterBy.isStarred) {
        cars = cars.filter(car => car.isStarred).sort((b1, b2) => b1.starredAt - b2.starredAt)
    }

    return cars
}

function getById(carId) {
    const car = storageService.get(STORAGE_KEY, carId)
    return car
}

async function getModelDetails(model) {

    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/cars', {
            params: {
                model: model,
            },
            headers: {
                'X-Api-Key': key
            },
        });
        return response.data[0]
    } catch (error) {
        console.error('Request failed:', error);
        if (error.response) {
            console.error('Error:', error.response.status, error.response.data);
        }
        throw error;
    }
}


function _createDemoCars() {
    let cars = utilService.loadFromStorage(STORAGE_KEY)
    if (!cars || !cars.length) {
        cars = [
            {
                "_id": "b101",
                "vendor": "Nissan",
                models: [
                    {
                        id: 'm101',
                        name: 'Versa',
                        price: 20000,
                        img: 'https://cfx-vrf-main-imgs.imgix.net/5/2/5/e1c4ab75492a4aefa8cf436df71d115117e18525.png?auto=format&fit=clip&w=420'
                    },
                    {
                        id: 'cx201',
                        name: 'Juke',
                        price: 28000,
                        img: 'https://tdrresearch.azureedge.net/photos/chrome/Expanded/White/2017NIS120002/2017NIS12000201.jpg?w=400'
                    },
                    {
                        id: 'cx204',
                        name: 'Sentra',
                        price: 28000,
                        img: 'https://campaigns.nissan.co.il/ao/wp-content/uploads/2019/12/1-20-2_Sentra_image_web%EF%BB%BF%EF%BB%BF_876X493.png'
                    },

                ]
            },
            {
                "_id": "b102",
                "vendor": "Audi",
                models: [
                    {
                        id: 'a301',
                        name: 'A3',
                        price: 35000,
                        img: 'https://www.icar.co.il/_media/images/models/bgremoval/audi-a3-new.jpg'
                    },
                    {
                        id: 'a402',
                        name: 'A4',
                        price: 45000,
                        img: 'https://www.cartube.co.il/images/stories/audi/A4/2019/audi_a4_45_tfsi_quattro_s_line_18-970px.jpg'
                    },
                    {
                        id: 'a501',
                        name: 'Q5',
                        price: 55000,
                        img: 'https://www.cmotors.co.il/wp-content/uploads/2021/11/2021-Audi-SQ5-Sportback-SUV-grey-1001x565-1_0.jpg'
                    }

                ]
            },
            {
                "_id": "b103",
                "vendor": "Toyota",
                models: [
                    {
                        id: 'c101',
                        name: 'Corolla',
                        price: 25000,
                        img: 'https://media.ed.edmunds-media.com/toyota/corolla/2023/oem/2023_toyota_corolla_sedan_xse_fq_oem_1_1600.jpg'
                    },
                    {
                        id: 'c202',
                        name: 'Camry',
                        price: 35000,
                        img: 'https://imgd.aeplcdn.com/1200x900/n/cw/ec/110233/2022-camry-exterior-right-front-three-quarter.jpeg?isig=0&q=75'
                    },
                    {
                        id: 'r301',
                        name: 'RAV4',
                        price: 45000,
                        img: 'https://kong-proxy-aws.toyota-europe.com/c1-images/resize/ccis/680x680/zip/il/configurationtype/visual-for-grade-selector/product-token/74e48ba4-430d-4307-b12f-3900684b71cd/grade/f89e8f59-9b4e-46a0-a4a1-abfbc425aaec/body/30b0ef55-504f-4ce5-8f54-6856b2e8aa20/fallback/true/padding/50,50,50,50/image-quality/70/day-exterior-4_1G3.png'
                    }

                ]
            },
            {
                "_id": "b104",
                "vendor": "Mitsubishi",
                models: [
                    {
                        id: 'cc101',
                        name: 'Lancer',
                        price: 45000,
                        img: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mitsubishi/Mitsubishi-Lancer/3379/1544677323023/front-left-side-47.jpg'
                    },
                    {
                        id: 'ee201',
                        name: 'Spacestar',
                        price: 55000,
                        img: 'https://big-lease.co.il/wp-content/uploads/2020/02/mitsubishi-spacestar-caver.jpg'
                    },
                    {
                        id: 'ee204',
                        name: 'Attrage',
                        price: 55000,
                        img: 'https://images.autoboom.co.il/SaQSCEm0MnNNl8Te_v2BsqlkBEfAFCIpwW7Ivi195ro/fit/1200/1200/sm/0/Z3M6Ly9hdXRvYm9vbS1pbWFnZXMvMDAwLzAwMC8wMzUvMzU0NzkuanBn.jpg'
                    }
                ]
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, cars)
    }
}



