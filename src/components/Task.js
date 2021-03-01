import React, { useState, useEffect } from 'react'
import '../styles/Task.scss'
import Component from '../components/Component'

//izmantoju async await asinhronam darbibam un useEffect, lai nebutu infinite loop, jo setState paarrenderee. 
//izmantoju pixabay.com api avotu. apikey ir seit? No stress. 

//fetch ka vienu no parametriem ir amount, jo tur ir milzum daudz attelu
//papildus divas pogas, kuras ielade citas lapas, kuraas ir citas bildes kjedee


const Task =() => {
    const [states, setStates] = useState({
        searchText: '',
        amount: 5,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '20440908-bda69edb9fa53c777351119cb',
        images: '',
        page: 3,
        width: 700,
        height: 400
    })
      
useEffect(() => {
    const fetchData = async () => {
    await fetch(`${states.apiUrl}/?key=${states.apiKey}&per_page=${states.amount}&page=${states.page}&safesearch=${true}`) //iznaca url ar vairakiem parametriem
    .then(response => response.json())
    .then(json => setStates({...states, images: json}))  //json dati tiek parnesti uz states  
    }
    fetchData()
},[states.page]) //dependency ir page lapas

    return  <div className='big-container'>
                <Component>
                        {states.images && Object.values(states.images.hits).map(i=> {
                            return    <img alt='' src={i.webformatURL} />})}
                </Component>
                <div className='button-wrapper'>
                    <button onClick={()=> setStates({...states, page: states.page - 1 })}>Previous Page</button>
                    <button className='bottom' onClick={()=> setStates({...states, page: states.page + 1 })}>Next Page</button>
                </div>

            </div>
        
    
}

export default Task
