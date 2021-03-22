import React, {Component} from 'react'

export default class Search extends Component {

	// allPosts

    render() {
        return (
            <div>
				<input onInput={(e) => this.props.changeState(e)} type="text" placeholder={'Поиск'}/>
            </div>
        )
    }
}