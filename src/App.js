import logo from './logo.svg';
import './App.scss';
import Header from './components/Header/Header';
import {Outlet} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import PerfectScrollbar from 'react-perfect-scrollbar';
const App = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className='app-container'>
    {/* Hello world */}
    {/* <button className='btn btn-success' >Test</button> */}
    <div className='header-container'>
      <Header>
      </Header>
    </div>

    <div className='main-container'>
      <div className='sidenav-container'>

      </div>
      <div className='app-content'>
        {/* Outlet la tin hieu chi dinh cho cac link user va admin duoc hien thi(here) khi cac link do click*/}
        <PerfectScrollbar>
            <Outlet/>
        </PerfectScrollbar>
        {/* <Outlet/> */}
      </div>
    </div>
    
  
      {/* <div>
        test link
        <div>
          <button> <Link to="/users">go to user page</Link> |{" "}</button>
          <button><Link to="/admin">go to admin page</Link></button>
        </div>
      </div> */}
  </div>
);
}

export default App;
