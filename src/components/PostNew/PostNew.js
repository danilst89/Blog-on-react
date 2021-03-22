import React, {Component} from 'react';
import './PostNew.css';

export default class PostNew extends Component {
	state = {
		valueHeader: '',
		valueText: ''
	}

	changeInputHeader = (e) => {
		this.setState({
			valueHeader: e.target.value,
		})
	}

	changeInputText = (e) => {
		this.setState({
			valueText: e.target.value
		})
	};

	clearInputs = () => {
		this.setState({
			valueHeader: '',
			valueText: ''
		})
	};

	handleClick = () => {
		this.clearInputs();
		this.props.addText(this.state.valueHeader, this.state.valueText);
	};

    render() {
        return (
            <div className={'PostNew'}>
				<div className="InputFlex">
					<h3>Ваш заголовок:</h3>
					<input className={'textArea'} value={this.state.valueHeader} onInput={this.changeInputHeader} type="text"/>
				</div>
				<div className="InputFlex">
					<h4>Ваш текст:</h4>
					<textarea className={'textArea'} value={this.state.valueText} onInput={this.changeInputText} name="text" id="31" cols="30" style={{width: '221px'}} rows="10">Введите текст</textarea>
				</div>
				<button onClick={this.handleClick}  className="InputButton">Опубликовать</button>
            </div>
        )
    }
}