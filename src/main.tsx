import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { TestUi } from './TestUi'
// import './index.css'
// import { PostList } from './PostList'
import { LearningHooks } from './LearningHooks'
// import { PostListCoba } from './PostListCoba';
import { BrowserRouter, Route, Router, Routes } from 'react-router';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux/store'; 
import { theme } from './theme'; 

import { AppRoutes } from './config/AppRoutes';
import { Layout } from './components/Layout';


//kalo pake lazy hrs pake export default
// const LearningHookPage = lazy(() => import('./LearningHooks'));
// const PostPage = lazy(() => import('./PostListCoba'));
// const PostDetailPage = lazy(() => import('./PostDetail'));


  createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
          <AppRoutes/>
          </Layout>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,

// createRoot(document.getElementById('root')!).render(
  // <StrictMode>

  // //biar bisa pindah page/pindah url (mau postlist ato leanring hooks) tanpa hrs hapus" mainnya ky kemaren
  // <BrowserRouter> 
  //   <Routes>
  //     <Route path='/learning-hooks' element={
  //       <LearningHookPage/>
  //     }></Route>
  //     <Route path='/post' element={
  //       <PostPage/>
  //     }></Route>
  //     <Route path='/post/:id' element={
  //       <PostDetailPage/>
  //     }></Route>
  //   </Routes>
  // </BrowserRouter>
  // // </StrictMode>,



)
