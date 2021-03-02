import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const ListItems = ({ text, setComponentClicked }) => {
  return (
    <div className="listItem">
      <ListItem
        button
        onClick={(component) => setComponentClicked(component.target.innerText)}
      >
        <ListItemText primary={text} />
      </ListItem>
    </div>
  );
};

export default ListItems;
