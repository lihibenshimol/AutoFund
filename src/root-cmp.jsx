import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/app-header'
import { Models } from './pages/model-page'
import { ModelDetails } from './pages/model-details'
import { CarIndex } from './pages/car-index'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route  exact={true} element={<CarIndex/>} path='/' />
                    <Route  exact={true} element={<Models/>} path='/:modelId' />
                    <Route  exact={true} element={<ModelDetails/>} path='/:modelId/:carName' />
                </Routes>
            </main>

        </div>
    )
}


