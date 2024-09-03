import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import User from 'views/User';
import BoardWrite from 'views/Board/Write';
import BoardDetail from 'views/Board/Detail';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';

function App() {


//    render: Application 검포년트 렌더링   //
// description: 0|9! PH : '/' - Main //
// description: 01 + 2129 $H : '/auth' - Authentication //
// description: 2H : '/search/:searchWord' - Search //
// description: O|Z| : '/user/:userEmail' - User //
// description: A2 MIEP| : '/board/detail/:boardNumber' -
// description: 25 Adotl : '/board/write' - BoardWrite //
// description: 5 +52l : '/board/update/:boardNumber' - BoardUpdate //
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main />} />
          <Route path={AUTH_PATH()} element={<Authentication />} />
          <Route path={SEARCH_PATH(':searchWord')} element={<Search />} />
          <Route path={USER_PATH(':userEmail')} element={<User />} />
          <Route path={BOARD_PATH()}>
            <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
            <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
            <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
        </Route>
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
 