import '@/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@/views/Home'
import Profile from '@/views/Profile'
import ArticleDetail from '@/views/ArticleDetail'

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/article/:id' element={<ArticleDetail />} />
					<Route path='/profile/:id' element={<Profile />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
