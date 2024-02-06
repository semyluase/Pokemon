const getAllPokemon = async (url) => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => resolve(data));
	});
};

const getPokemon = async (url) => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => resolve(data));
	});
};

export { getAllPokemon, getPokemon };
