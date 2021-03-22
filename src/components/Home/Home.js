import React from 'react';

const Home = props => {
	let counterLiked = 0;
	let counterImportant = 0;
	props.allTexts.forEach(item => {
		if (item.liked) {
			counterLiked++;
		}

		if (item.important) {
			counterImportant++;
		}
	});

    return (
        <div>
			<h1>Всего постов: {props.allTexts.length}</h1>
			<h2>Понравилось вам из них: {counterLiked}</h2>
			<h2>В избранном: {counterImportant}</h2>
        </div>
    )
}

export default Home;