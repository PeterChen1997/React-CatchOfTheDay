import React from 'react'

class AddFishForm extends React.Component {
    createFish(event) {
        event.preventDefault()
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value
        }
        console.log(fish)
        this.props.addFish(fish)
        this.fishForm.reset()
    }

    render () {
        return (
            <form className="fish-edit" onSubmit={(e) => this.createFish(e)} ref={(input) => this.fishForm = input}>
                <input required ref={(input) => this.name = input} type="text" placeholder="Fish Name" />
                <input required ref={(input) => this.price = input} type="text" placeholder="Fish Price" />
                <select ref={(input) => this.status = input}>
                    <option value="avaliable">Fresh !</option>
                    <option value="unavaliable">Sold Out !</option>
                </select>
                <textarea required ref={(input) => this.desc = input} type="text" placeholder="Fish Desc" ></textarea>
                <input required ref={(input) => this.image = input} type="text" placeholder="Fish Image" />
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
}

export default AddFishForm