import React from 'react';
import "../sass/hotkeyEditor.sass";

const HotkeyEditor = props => {
  return (
    <div className="hotkey-field">
      <input type="text" className="hotkey-field__url" 
        value={props.URL} 
        onChange={props.onURLchange}
      />
      <input type="text" className="hotkey-field__hotkey" 
        value={"ctrl + " + props.hotkey}
        onChange={props.onHotkeyChange}
      />
    </div>
  );
};

export default HotkeyEditor;