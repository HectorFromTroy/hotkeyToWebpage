import React, { useState, useEffect, useReducer } from 'react';
import HotkeyEditor from "./HotkeyEditor.jsx";
import { hotkeysReducer } from "../reducers/index.jsx";
import shortId from "short-id";
import "../sass/app.sass"

const App = props => {

  const [hotkeys, dispatch] = useReducer(hotkeysReducer, {});

  const [URLforAdding, setURLforAdding] = useState("");
  const [hotkey, setHotkey] = useState("");

  useEffect(()=>{
    //retrieves existing hotkeys from chrome.storage
    chrome.storage.sync.get(null, response => {
      dispatch({
        type: "INITIAL",
        payload: response
      });
    });
  }, []);

  const validateHotkey = event => {
    //KeyA
    const value = event.target.value;
    setHotkey(value[value.length - 1].toUpperCase());
  };

  const deleteHtkFromStorage = htk => {
    chrome.storage.sync.remove(htk);
  };

  const addHtkToStorage = (htk, URL) => {
    chrome.storage.sync.set({
      [[htk]]: URL
    });
  };

  const fromObjectToArray = () => {
    const array = [];
    for(let htk in hotkeys){
      array.push({
        htk,
        URL: hotkeys[htk]
      });
    }
    return array;
  };

  return (
    <div className="app">
      <ul className="hotkeys-list">
        {
        fromObjectToArray().map(htkItem => 
        <li 
          className="hotkey-item"
          key={htkItem.htk}
          onClick={event => {
            dispatch({
              type: "DELETE",
              payload: {
                htk: htkItem.htk
              }
            });

            deleteHtkFromStorage(htkItem.htk);

            //add info to editor
            setURLforAdding(htkItem.URL);
            setHotkey(htkItem.htk.toUpperCase());
          }}
        >
          <span>{htkItem.URL} Ctrl + {htkItem.htk}</span>
          <span className="hotkey-item__delete"
            onClick={event => {
              console.log("DELETE")
              event.stopPropagation();
              dispatch({
                type: "DELETE",
                payload: {
                  htk: htkItem.htk
                }
              });
              deleteHtkFromStorage(htkItem.htk);
            }}
          >X</span>
        </li>)}
      </ul>
      <HotkeyEditor 
        URL={URLforAdding}
        hotkey={hotkey}
        onURLchange={event => setURLforAdding(event.target.value)}
        onHotkeyChange={validateHotkey}
      />
      <button className="add-new-htk-btn"
        onClick={()=> {
          //validating
          if(URLforAdding === "" || hotkey === "" || hotkeys[hotkey]){
            return;
          }

          dispatch({
            type: "ADD",
            payload: {
              htk: hotkey,
              URL: URLforAdding
            }
          });

          addHtkToStorage(hotkey, URLforAdding);

          setURLforAdding("");
          setHotkey("");
        }}
      >Add</button>
    </div>
  );
};

export default App;