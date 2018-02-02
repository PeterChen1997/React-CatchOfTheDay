import React from 'react'

import { formatPrice } from '../helpers'

class Order extends React.Component {
    constructor() {
        super()
        this.renderOrder = this.renderOrder.bind(this)
    }

    renderOrder(key) {
        const count = this.props.order[key]
        const fish = this.props.fishes[key]
        const deleteBtn = <button onClick={() => this.props.deleteOrder(key)}>x</button>

        if(!fish || fish.status === 'unavailable') {
            return <li key={key}>Sorry, {fish ? fish.name : 'fish' } is no longer available! {deleteBtn}</li>
        }

        return (
            <li key={key}>
                <span>{count} 1bs {fish.name} {deleteBtn}</span>
                <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        )
    }

    render() {
        const orderIds = Object.keys(this.props.order)
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key]
            const count = this.props.order[key]
            const isAvailable = fish && fish.status === 'available'
            if(isAvailable) {
                return prevTotal + (count * fish.price || 0)
            } else {
                return prevTotal
            }
        }, 0)
        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Order