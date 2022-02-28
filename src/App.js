import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import gun from './gun.gif'
// import putler from './putler.gif'
// import gun2 from './gun2.gif'

const App = () => {

  const[newHomeTeam, setNewHomeTeam] = useState('')
  const[newVisitorTeam, setNewVisitorTeam] = useState('')
  const[newResult, setNewResult] = useState('')
  const[results, setResults] = useState([]) 

  useEffect(() => { 
    console.log('effect') 
    axios 
    .get('/api/results') 
    .then(response => { 
    console.log('promise fulfilled') 
    setResults(response.data) 
    }) 
    }, []) 
    console.log('render', results.length, 'results')
  
  const addResult = (event) => {
    event.preventDefault()
    const resultObject = {
      hometeam: newHomeTeam,
      visitorteam: newVisitorTeam,
      result: newResult,
      id: results.length + 1,
    }
    axios
    .post('/api/results', resultObject)
    .then(response => {
    console.log('palvelimen vastaus: ', response)
    console.log("results-taulukko: ", results)
    setResults(results.concat(resultObject))
    setNewResult('')
    setNewHomeTeam('')
    setNewVisitorTeam('')
    })
  }

  const handleHomeTeamChange = (event) => {
    setNewHomeTeam(event.target.value)
  }

  const handleVisitorTeamChange = (event) => {
    setNewVisitorTeam(event.target.value)
  }

  const handleResultChange = (event) => {
    setNewResult(event.target.value)
  }
  return (
    <div>
      {console.log("tulokset: ", results)}
      {/* {results.map(r => <li key={r.id}>{r.hometeam} vs. {r.visitorteam}: {r.result}</li>)} */}
           
      <div id="form">
      {/* <img width="200px" src={gun2} alt="lataan..." />
      <img src={putler} alt="lataan..." />
      <img width="200px" src={gun} alt="lataan..." /> */}
      <h2>Tulospalvelu</h2>
      <form onSubmit={addResult}>
        <table>
          <tbody>
          <tr>
          <td>Nimi: </td><td><input value={newHomeTeam} onChange={handleHomeTeamChange} /></td>
          </tr>
          <tr>
            <td>Tulos, kierros 1: </td><td><input value={newVisitorTeam} onChange={handleVisitorTeamChange} /></td>
          </tr>
          <tr>
            <td>Tulos, kierros 2: </td><td className='result'><input value={newResult} onChange={handleResultChange} /></td>
          </tr>
          </tbody>   
          </table>          
        <button type="submit">Lähetä</button>
        </form>
        </div>
        
          <table>
            <tbody>
            <tr>
          <th width="250px">Nimi</th><th width="250px">Tulos, kierros 1</th><th>Tulos, kierros 2</th>
          </tr><tr>
          <td>{results.map(r => <p key={r.id}>{r.hometeam}</p>)}{newHomeTeam}</td>
          <td>{results.map(r => <p key={r.id}>{r.visitorteam}</p>)}{newVisitorTeam}</td>
          <td>{results.map(r => <p key={r.id}>{r.result}</p>)}{newResult}</td>
        </tr>
        </tbody>
        </table>
        
        
    </div>
  );
}

export default App;
