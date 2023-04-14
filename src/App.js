//https://jsonplaceholder.typicode.com/posts

import React from 'react';
import './App.css';
import { useContext, useEffect } from 'react';
import { createContext, useReducer, useState } from 'react';



const reducer = (state, action) => {
  if (action.type === 'Postdata') {
    return action.payload;
  }
};


const userData = createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [Ele, setEle] = useState("")




  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((resp) => resp.json())
      .then((res) => {
        dispatch({
          type: 'Postdata',
          payload: res,
        });
      });
  }, []);


  let value = {
    state,
    ele: Ele,
    setEle: setEle,

  }



  return (
    <div className='App'>
      <userData.Provider value={value}>
        <POSTList />
        <POSTDETAIL />
      </userData.Provider>
    </div>
  );
}

const POSTList = () => {
  const { state, setEle } = useContext(userData);
  console.log(state)


  const handlelist = (ele) => {
    setEle(ele)
  }

  return (
    <div className='postlist'>
    <ul className='ul-list'>
      <h1>POST LIST</h1>
      {state.map((ele) => {
        return <li onClick={() => handlelist(ele)}>{ele.title}</li>;
      })}
    </ul>
    </div>
  );
};

const POSTDETAIL = () => {
  const data = useContext(userData)
  const list = data.ele;


  return (
    <div className='details'>

    <ul className="ul-body">
      <h1>POST DETAILS</h1>
      <li>ID- {list.id}</li>
      <li>UserId- {list.userId}</li>
      <li>Title- {list.title}</li>
      <li>Body- {list.body}</li>
    </ul>

    </div>
  )
};

