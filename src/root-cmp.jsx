import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/app-header'
import { Models } from './pages/model-page'
import { ModelDetails } from './pages/model-details'
import { CarIndex } from './pages/car-index'

export function RootCmp() {

    return (
        <div>
            {/* <AppHeader /> */}
            <main>
                <Routes>
                    <Route  exact={true} element={<CarIndex/>} path='/AutoFund' />
                    <Route  exact={true} element={<Models/>} path='/AutoFund/:modelId' />
                    <Route  exact={true} element={<ModelDetails/>} path='/AutoFund/:modelId/:carName' />
                </Routes>
            </main>

        </div>
    )
}


