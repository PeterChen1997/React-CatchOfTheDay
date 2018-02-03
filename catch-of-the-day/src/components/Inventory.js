import React from 'react'

import base from '../base'
import AddFishForm from './AddFishForm'

class Inventory extends React.Component {
    constructor() {
        super()
        // this.renderInventory = this.renderInventory.bind(this)
        this.authenticate = this.authenticate.bind(this)
        this.authHandler = this.authHandler.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderLogin = this.renderLogin.bind(this)
        this.logout = this.logout.bind(this)
        
    }

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        base.onAuth((user) => {
            if(user) {
                this.authHandler(null, { user })
            }
        })
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key]
        const updateFish = {
            ...fish,
            [e.target.name]: e.target.value
        }
        this.props.updateFish(key, updateFish)
    }

    authenticate(provider) {
        base.authWithOAuthPopup(provider, this.authHandler)
    }

    logout() {
        base.unauth()
        this.setState({ uid: null })
    }

    authHandler(err, authData) {
        console.log(authData)
        if(err) {
            console.error(err)
            return;
        }

        const storeRef = base.database().ref(this.props.storeId)

        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {}

            if(!data.owner) {
                storeRef.set({
                    owner: authData.user.uid
                })
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            })
        })
    }

    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}>Log In With Github</button>
            </nav>
        )
    }

    renderInventory = (key) => {
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
                <button onClick={() => this.props.deleteFish(key)}>Delete Fish</button>
            </div>
        )
    }

    render () {
        const logout = <button onClick={this.logout}>logout</button>
        if(!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you aren't the owner of this store!</p>
                    {logout}
                </div>
            )
        }
        return (
            <div>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Samples Fishes</button>
            </div>
        )
    }

    static proptypes = {
        fishes: React.PropTypes.object.isRequired,
        updateFish: React.PropTypes.func.isRequired,
        deleteFish: React.PropTypes.func.isRequired,
        addFish: React.PropTypes.func.isRequired,
        loadSamples: React.PropTypes.func.isRequired,
        storeId: React.PropTypes.string.isRequired
    }
}

export default Inventory