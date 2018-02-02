import React from 'react'

import AddFishForm from './AddFishForm'

class Inventory extends React.Component {
    constructor() {
        super()
        this.renderInventory = this.renderInventory.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key]
        const updateFish = {
            ...fish,
            [e.target.name]: e.target.value
        }
        this.props.updateFish(key, updateFish)
    }

    renderInventory(key) {
        const fish = this.props.fishes[key]

        return (
            <div className="fish-edit" key={key}>
                <input onChange={(e) => this.handleChange(e, key)} required value={fish.name} name="name" type="text" placeholder="Fish Name" />
                <input onChange={(e) => this.handleChange(e, key)} required value={fish.price} name="price" type="text" placeholder="Fish Price" />
                <select onChange={(e) => this.handleChange(e, key)} value={fish.status} name="status">
                    <option value="available">Fresh !</option>
                    <option value="unavailable">Sold Out !</option>
                </select>
                <textarea onChange={(e) => this.handleChange(e, key)} required value={fish.desc} name="desc" type="text" placeholder="Fish Desc" ></textarea>
                <input onChange={(e) => this.handleChange(e, key)} required value={fish.image} name="image" type="text" placeholder="Fish Image" />
            </div>
        )
    }

    render () {
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Samples Fishes</button>
            </div>
        )
    }
}

export default Inventory