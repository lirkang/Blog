import { Route, Routes } from 'react-router-dom'

import Center from 'layout/Center'
import Left from 'layout/Left'
import Right from 'layout/Right'

import 'styles/app.scss'
import { lazy, Suspense } from 'react'

const App = () => {
  const Home = lazy(() => import('views/Home'))
  const Detail = lazy(() => import('views/Detail'))

  return (
    <>
      <Left className='left' />

      <Center className='center'>
        <Routes>
          <Route
            path='/'
            element={
              <Suspense fallback={<></>}>
                <Home />
              </Suspense>
            }
          />

          <Route
            path='/detail'
            element={
              <Suspense fallback={<></>}>
                <Detail />
              </Suspense>
            }
          />
        </Routes>
      </Center>

      <Right className='right' />
    </>
  )
}

export default App
