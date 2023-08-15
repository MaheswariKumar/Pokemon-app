// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
// import { wait } from '@testing-library/user-event/dist/utils';

let handledTypes = ["grass", "ghost", "electric", "bug", "poison", "normal", "fairy", "fire", "water"];

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [URL, setURL] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");

  async function getDetailedInfo(results){
    for (let ePoke of results){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ePoke.name}`);
    const data = await res.json();
    setAllPokemons((prev)=> [...prev, data])
    }
  }

  async function getAllPokemons(){
    const rs = await fetch(URL);
    const data = await rs.json();
    setURL(data.next);
    await getDetailedInfo(data.results);
  }

  useEffect(()=>{
    getAllPokemons();
  }, [])

  return (
    <div id="parent">
      <div id="section">
      <div className='content1'>
        <h2>Pokemon</h2>
        <h2>Pokemon</h2>
      </div>
      <div className='content2'>
        <h2>KingDom</h2>
        <h2>KingDom</h2>
      </div>
      </div>

      <div className="app-container">
        <div className="pokemon-container">
          <div className="all-container">
            {
              allPokemons.map((ePoke)=>{
                return <PokeMonCard data={ePoke}/>
              })
            }
          </div>
          <button className='load-more' onClick={()=> getAllPokemons()}>More Pokemons</button>
        </div>
      </div>
    </div>
  );
}

function PokeMonCard({data}){

  let type = data.types[0].type.name;
  let backgroundTypeClass = handledTypes.includes(type) ? type : "grass";
  let id = data.id;
  let image = data.sprites.other.dream_world.front_default;
  let name = data.forms[0].name;
  let height = data.height;
  let weight = data.weight;
  let stat1 = data.stats[0].stat.name;
  let stat2 = data.stats[1].stat.name;
  let stat3 = data.stats[2].stat.name;
  let stat4 = data.stats[3].stat.name;
  let stat5 = data.stats[4].stat.name;
  let stat6 = data.stats[5].stat.name;
  let bs1 = data.stats[0].base_stat;
  let bs2 = data.stats[1].base_stat;
  let bs3 = data.stats[2].base_stat;
  let bs4 = data.stats[3].base_stat;
  let bs5 = data.stats[4].base_stat;
  let bs6 = data.stats[5].base_stat;

  const [isOverlayActive, setIsoverlayActive] = useState(false);

  function handleOverlay() {
    if (!isOverlayActive) {
      setIsoverlayActive(true)
    }
  }

  return (
    <>
    <div className={`tumb-container ${backgroundTypeClass}`}>
      <div className="number">
        <small>#{id}</small>
      </div>
      <img src={image} alt='Image'/>
      <div className="detail-wrapper">
        <h3>{name}</h3>
        <small>Type : {type}</small>
        <button className='pokeInfoBtn' onClick={handleOverlay}>Know More...</button>
      </div>
    </div>
    {isOverlayActive && <Overlay 
             setIsoverlayActive={setIsoverlayActive} 
             type={type} 
             img={image} 
             name={name} 
             height={height} 
             weight={weight}
             stat1 = {stat1}
             stat2 = {stat2}
             stat3 = {stat3}
             stat4 = {stat4}
             stat5 = {stat5}
             stat6 = {stat6}
             bs1 = {bs1}
             bs2 = {bs2}
             bs3 = {bs3}
             bs4 = {bs4}
             bs5 = {bs5}
             bs6 = {bs6}
             />}
    </>
    )
}


function Overlay({
                  setIsoverlayActive, 
                  type, 
                  img, 
                  name, 
                  height, 
                  weight, 
                  stat1, 
                  stat2, 
                  stat3, 
                  stat4, 
                  stat5, 
                  stat6,
                  bs1,
                  bs2,
                  bs3,
                  bs4,
                  bs5,
                  bs6
                }){
  return (
    <div className={`overlay ${type}`}>
      <button className={`close-button ${type}`}onClick={()=> setIsoverlayActive(false)}>X</button>
      <div className='left-overlay'>
        <img className='left-overlay-img' src={img}/>
        <h3 className='left-overlay-name'>{name}</h3>
      </div>
      <div className={`right-overlay ${type}`}>
        <table className={`right-overlay-table ${type}`}>
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>Weight: </td>
                      <td>{weight}</td>
                    </tr>
                    <tr>
                      <td>Height: </td>
                      <td>{height}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>Stat1: </td>
                      <td>{stat1}</td>
                    </tr>
                    <tr>
                      <td>Stat2: </td>
                      <td>{stat2}</td>
                    </tr>
                    <tr>
                      <td>Stat3: </td>
                      <td>{stat3}</td>
                    </tr>
                    <tr>
                      <td>Stat4: </td>
                      <td>{stat4}</td>
                    </tr>
                    <tr>
                      <td>Stat5: </td>
                      <td>{stat5}</td>
                    </tr>
                    <tr>
                      <td>Stat6: </td>
                      <td>{stat6}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>Bs1: </td>
                      <td>{bs1}</td>
                    </tr>
                    <tr>
                      <td>Bs2: </td>
                      <td>{bs2}</td>
                    </tr>
                    <tr>
                      <td>Bs3: </td>
                      <td>{bs3}</td>
                    </tr>
                    <tr>
                      <td>Bs4: </td>
                      <td>{bs4}</td>
                    </tr>
                    <tr>
                      <td>Bs5: </td>
                      <td>{bs5}</td>
                    </tr>
                    <tr>
                      <td>Bs6: </td>
                      <td>{bs6}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App;