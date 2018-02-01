import React from 'react'

class StorePicker extends React.Component {
    render() {
        return (
            <form className="store-selector">
                { /* form for enter*/ }
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder="Store Name" />
                <button type="submit">Visit the store -></button>
            </form>
        )
    }
}


export default StorePicker