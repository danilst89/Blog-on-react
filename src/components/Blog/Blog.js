import React from 'react';
import './Blog.css';
import PostNew from "../PostNew/PostNew";
import Search from "../Search/Search";

export default class Blog extends React.Component {
    state = {
        searchValue: ''
    }

    changeSearchState = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    };

    searchInPosts = (search) => {
        if (search.length === 0) {
            return this.props.articles;
        }

        return this.props.articles.filter((item) => {
            return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
    };

    filterPost = (items, filter) => {
        if (filter === 'all') {
            return items;
        } else if (filter === 'liked') {
            if (items.filter(item => item.liked).length !== 0) {
                return items.filter(item => item.liked);
            } else {
                return <h1>Что бы увидеть здесь что-то добавтье пост в понравившиеся</h1>
            }
        } else if (filter === 'important') {
            if (items.filter(item => item.important).length !== 0) {
                return items.filter(item => item.important);
            } else {
                return <h1>Что бы увидеть здесь что-то добавтье пост в избранное</h1>
            }
        }
    };

    render() {
        const texts = this.filterPost(this.searchInPosts(this.state.searchValue), this.props.filter);
        return (
            <div className={'Blog'}>
                <div className="typeFilter">
                    <div className="Filter">
                        <a onClick={(e) => this.props.sortByAll(e)} href={'#'}>Все посты</a>
                        <a onClick={(e) => this.props.sortByLiked(e)} href={'#'}>Понравившиеся</a>
                        <a onClick={(e) => this.props.sortByImportant(e)} href={'#'}>Избранное</a>
                    </div>
                    <div className="Search">
                        <Search stateValue={this.state.searchValue} changeState={this.changeSearchState} searchPost={this.searchInPosts} allPosts={this.props.articles}/>
                    </div>
                </div>
                {Array.isArray(texts) ? texts.map((blog, index) => {
                    return (
                        <div key={index}>
                            <div className={'flex'}>
                                <h2>{blog.title}</h2>
                                <div className="flexComponent">
                                    <i style={blog.important ? {'color': '#fde910'} : {'color' : '#706969'}} onClick={() => this.props.doImportant(index)} className="fas fa-bookmark"/>
                                    <i style={blog.liked ? {'color': 'red'} : {'color' : '#706969'}} onClick={() => this.props.like(index)} className="fas fa-heart"/>
                                    <i onClick={() => this.props.onDelete(index)} className="fa fa-trash"/>
                                </div>
                            </div>
                            <p>{blog.text}</p>
                        </div>
                    )
                }) : texts}
                <PostNew addText={this.props.addText}/>
            </div>
        )
    }
}