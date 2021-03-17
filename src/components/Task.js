import React, { useState, useEffect } from 'react'
import '../styles/Task.scss'
import Main from '../components/Main'

function Task() {
    const [states, setStates] = useState({
      searchText: "",
      amount: 7,
      apiUrl: "https://pixabay.com/api",
      apiKey: "20440908-bda69edb9fa53c777351119cb",
      images: "",
      page: 3,
      width: 746.11,
      height: 400,
    });
    const [mouseOver, setMouseOver] = useState(false);

    useEffect(() => {
      async function data() {
        await new Promise(res=> {
          const fetchData = async () => {
            await fetch(
              `${states.apiUrl}/?key=${states.apiKey}&per_page=${
                states.amount
              }&page=${states.page}&safesearch=${true}`
            )
              .then((response) => response.json())
              .then((json) => setStates({ ...states, images: json }));
          }
          fetchData()
          res()
        })
        .catch(err => console.log('Error in Fetching Data: ', err))

      }
      data()
      
    }, [states.page])

    const mouseOverHandler = () => setMouseOver(true);
    const mouseLeaveHandler = () => setMouseOver(false);

    return (
      <div className="big-container">
        <Main>
          {states.images &&
            Object.values(states.images.hits).map((i) => {
              return <div className='content-wrapper' key={i.id}>
                      <img
                        style={{width: `${states.width}px`}}
                        alt=""
                        src={i.webformatURL}
                        onMouseOver={mouseOverHandler}
                        onMouseLeave={mouseLeaveHandler}
                      />
                      {mouseOver ? <div className="hover-text">{i.user}</div> : ""}
                    </div>
            })}
        </Main>
        {states.images && Object.values(states.images.hits).map(i=> {
          return <h5 key={i.id} style={{margin: '0'}}>Tags: {i.tags}, User ID: {i.iser_id}, Total Views: {i.views}</h5>
        })}
        <div className='video-container'>
          <video loop autoPlay muted 
          src='https://vod-progressive.akamaized.net/exp=1616016468~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F755%2F16%2F403777550%2F1727191875.mp4~hmac=7ad7a5ee77a221485ad737714cb725607527257272d987222d5447a6a617b1cc/vimeo-prod-skyfire-std-us/01/755/16/403777550/1727191875.mp4?filename=Daffodil+-+34826.mp4'
          height='300px'
          width='533px'
          />
          <video loop autoPlay muted 
          src='https://vod-progressive.akamaized.net/exp=1616018424~acl=%2A%2F1290021508.mp4%2A~hmac=ef4f68d75570bc69448fb344a17dfbbe11014eb2b249e25b0c1aa11669a65131/vimeo-prod-skyfire-std-us/01/788/13/328940142/1290021508.mp4?filename=Ranunculus+-+22634.mp4'
          height='300px'
          width='533px'
          />
        </div>
      </div>
    );
  }
  
  export default Task;
