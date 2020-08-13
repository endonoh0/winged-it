import React from 'react'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

const MenuBar = ({ health, diet, searchTags, removeTag, firstLetterToUpperCase }) => {
    return(
        <div className="menubar">
            <div className="menubar_content">
            <h1><Badge variant="dark">Health</Badge></h1>
            {health && health.map(tag => {
                return (
                    <ListGroup variant="flush">
                    <ListGroup.Item
                        variant="light"
                        className="health-labels"
                    >
                    <Badge pill variant="success">
                    {firstLetterToUpperCase(tag.value)}
                    </Badge>
                    </ListGroup.Item>
                    </ListGroup>
                )
            })}
            <h1><Badge variant="dark">Diet</Badge></h1>
            {/* Diet items */}
            {diet && <ListGroup variant="flush">
              <ListGroup.Item
              variant="light"
              className="health-labels"
            >
              <Badge pill variant="info">
                {firstLetterToUpperCase(diet)}
              </Badge>
              </ListGroup.Item>
            </ListGroup>}

            <h1><Badge variant="dark">Ingredients</Badge></h1>
            {/* Recipe Items */}
            {searchTags &&
              searchTags.map(tag => { return (
                <ListGroup variant="flush">
                  <ListGroup.Item
                    action variant="light"
                    className="health-labels"
                    onClick={e => removeTag(tag)}
                  >
                    <Badge pill variant="danger">
                      {tag}
                    </Badge>
                  </ListGroup.Item>
                </ListGroup>)
            })}
            </div>
        </div>
    )
}

export default MenuBar;