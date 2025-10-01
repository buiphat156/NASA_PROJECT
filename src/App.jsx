import { useState } from 'react';
import Header from './components/Header/Header';
import Tabbutton from './components/Tabbutton/Tabbutton';
import './App.css';
import MapComponent from './components/HANOI_INFOR/Hanoi';
import "./components/FixLeafletIcon";
import VietnamMap from './components/VietNammap';

function App() {
  const [value,setvalue] = useState();
  function handleSelect(value){
    setvalue(value);
  alert("ban da chon " + value);
}

  return (
    <>
      <Header/>
      <section id="tabbutton">
        <h2>Let choose your city!</h2>
        <menu>
        <Tabbutton onSelect={()=>handleSelect('Ho Chi Minh city')}>Ho Chi Minh city</Tabbutton>
        <Tabbutton onSelect={()=>handleSelect('Da Nang city')}>Da Nang city</Tabbutton>
        <Tabbutton onSelect={()=>handleSelect('Can Tho city')}>Can Tho city</Tabbutton>
        <Tabbutton onSelect={()=>handleSelect('Ha Noi')}>Ha Noi city</Tabbutton>
        </menu>
    <VietnamMap/>
      </section>
    </>
  )
}

export default App
