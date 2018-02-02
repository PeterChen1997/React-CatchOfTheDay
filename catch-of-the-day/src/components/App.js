import React from 'react'

import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            fishes: {},
            order: {}
        }

        this.addFish = this.addFish.bind(this)
        this.updateFish = this.updateFish.bind(this)
        this.loadSamples = this.loadSamples.bind(this)
        this.addToOrder = this.addToOrder.bind(this)
    }

    componentWillMount() {
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`
        , {
            context: this,
            state: 'fishes'
        })

        // judge is there a local state
        const localState = localStorage.getItem(`order-${this.props.params.storeId}`)
        if(localState) {
            this.setState({
                order: JSON.parse(localState)
            })
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        })
    }

    addFish(fish) {
        const fishes = {...this.state.fishes}
        const timestamp = Date.now()
        fishes[`fish-${timestamp}`] = fish

        this.setState({ fishes })
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes}
        fishes[key] = updatedFish
        console.log(fishes)
        this.setState({ fishes })
    }

    addToOrder(index) {
        const order = this.state.order
        order[index] = order[index] + 1 || 1
        this.setState({ order })
    }

    render () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="FREASH SEAFOOD MARKET" />
                    <ul className="list-of-fishes">
                        {Object
                            .keys(this.state.fishes)
                            .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
                        }
                    </ul>
                </div>
                <Order order={this.state.order} fishes={this.state.fishes}/>
                <Inventory
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                />
            </div>
        )
    }
}

export default App