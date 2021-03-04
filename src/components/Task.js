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
    width: 700,
    height: 400,
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${states.apiUrl}/?key=${states.apiKey}&per_page=${
          states.amount
        }&page=${states.page}&safesearch=${true}`
      )
        .then((response) => response.json())
        .then((json) => setStates({ ...states, images: json }));
    };
    fetchData();
  }, [states.page]);

  console.log(states.images.hits);
  return (
    <div className="big-container">
      <div className="button-wrapper">
        <button onClick={() => setStates({ ...states, page: states.page - 1 })}>
          Previous Page
        </button>
        <button
          className="bottom"
          onClick={() => setStates({ ...states, page: states.page + 1 })}
        >
          Next Page
        </button>
      </div>
      <Main>
        {states.images &&
          Object.values(states.images.hits).map((i) => {
            return (
              <div className="content-wrapper">
                <img alt="" src={i.webformatURL} />
                <div className="hover-text">{i.user}</div>
              </div>
            );
          })}
      </Main>
    </div>
  );
}

export default Task;
