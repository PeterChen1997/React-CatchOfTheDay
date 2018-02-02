import React from 'react'

import { getFunName } from '../helpers'

class StorePicker extends React.Component {
    goToStore(event) {
        event.preventDefault()
        console.log(this.storeInput)
        console.log(this)
    }

    render() {  
        return (
            <form className="store-selector" onSubmit={(e) => {this.goToStore(e)}}>
                { /* run the on submit fun */ }
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
                { /* bind the storeInput with input */ }
                <button type="submit">Visit the store -></button>
            </form>
        )
    }
}


export default StorePicker