import React, {Component} from 'react';
import Header from "./ui/Header/Header";
import Home from "./components/Home/Home";
import {Route} from 'react-router-dom';
import SignIn from "./components/SignIn/SignIn.js";
import Blog from "./components/Blog/Blog";

export default class App extends Component {
    state = {
        articles: [
            {title: 'О работе', text: 'Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он', liked: false, important: false},
            {title: 'О жизни за городом', text: 'Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он', liked: false, important: false},
            {title: 'О образовании', text: 'Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он', liked: false, important: false}
        ],
        filter: 'all'
    };

    addText = (title, text) => {
        const texts = [...this.state.articles];
        texts[this.state.articles.length] = {
            title,
            text
        };
        this.setState({
            articles: texts
        })
    };

    likeText = (index) => {
        const texts = [...this.state.articles];
        texts[index].liked = !this.state.articles[index].liked;
        this.setState({
            articles: texts
        });
    };

    doImportant = (index) => {
        const texts = [...this.state.articles];
        texts[index].important = !this.state.articles[index].important;
        this.setState({
            articles: texts
        });
    };

    deleteItem = (index) => {
        const texts = [...this.state.articles];
        texts.splice(index, 1);
        this.setState({
            articles: texts
        });
    }

    sortByLiked = (e) => {
        // debugger;
        e.preventDefault();
        this.setState({
            filter: 'liked'
        });
    };

    sortByAll = (e) => {
        e.preventDefault();
        this.setState({
            filter: 'all'
        });
    }

    sortByImportant = (e) => {
        e.preventDefault();
        this.setState({
            filter: 'important'
        });
    };

    render() {
        return (
            <div>
                <Header/>
                <Route path='/' exact component={props => <Home allTexts={this.state.articles}/>}/>
                <Route path='/about' component={SignIn}/>
                <Route path='/blog' render={props => <Blog sortByImportant={this.sortByImportant} sortByAll={this.sortByAll} sortByLiked={this.sortByLiked} filter={this.state.filter} onDelete={this.deleteItem} addText={this.addText} doImportant={this.doImportant} like={this.likeText} articles={this.state.articles}/>}/>
            </div>
        )
    }
}