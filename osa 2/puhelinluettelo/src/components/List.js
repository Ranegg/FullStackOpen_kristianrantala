import React from 'react';

const List = ( {removePerson, person} ) => {

    return (
        <p>
            {person.name} {person.number} 
            <button onClick={removePerson}>delete</button>
        </p>
    )
}

export default List