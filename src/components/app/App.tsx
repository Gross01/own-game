import { Routes, Route } from "react-router-dom";
import Home from "../../pages/home/Home";
import '../../index.css'
import styles from './App.module.css'
import Auth from "../../pages/auth/Auth";
import Room from "../../pages/room/Room";

function App() {
  return (
    <main className={styles.main}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/room/:code" element={<Room/>}/>
      </Routes>
    </main>
  );
}

export default App;
