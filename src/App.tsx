import { Route, Routes } from 'react-router-dom'

import Header from 'components/context/Header'
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons'

import Home from 'views/Home'
import ArticleDetail from 'views/ArticleDetail'
import Article from 'views/Article'

import { HeaderMenu } from 'types/heder'

import 'styles/app.scss'

function App() {
  const menus: HeaderMenu[] = [
    { icon: <HomeOutlined />, path: '/', title: '首页' },
    { icon: <UnorderedListOutlined />, path: '/article', title: '文章列表' }
  ]

  return (
    <>
      <div className='header-container'>
        <Header menus={menus} />
      </div>

      <div className='router'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/article' element={<Article />} />
          <Route path='/article/detail' element={<ArticleDetail />} />
        </Routes>
      </div>
    </>
  )
}

export default App
