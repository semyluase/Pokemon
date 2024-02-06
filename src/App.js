import React, { useEffect, useState } from 'react';
import Pokemon from './components/Pokemon';
import { getAllPokemon, getPokemon } from './services/pokemon';

const App = () => {
	const [pokemonData, setPokemonData] = useState([]);
	const [nextUrl, setNextUrl] = useState('');
	const [prevUrl, setPrevUrl] = useState('');
	const [loading, setLoading] = useState(true);
	const [details, setDetails] = useState(false);
	const initialUrl = 'https://pokeapi.co/api/v2/pokemon';
	useEffect(() => {
		const fetchData = async () => {
			let response = await getAllPokemon(initialUrl);
			setNextUrl(response.next);
			setPrevUrl(response.previous);
			await loadingPokemon(response.results);
			setLoading(false);
			setDetails(false);
		};
		fetchData();
	}, []);

	// next page pokemon list
	const next = async () => {
		setLoading(true);
		let data = await getAllPokemon(nextUrl);
		await loadingPokemon(data.results);
		setNextUrl(data.next);
		setPrevUrl(data.previous);
		setLoading(false);
		setDetails(false);
	};

	// prev page pokemon list
	const prev = async () => {
		if (!prevUrl) return;
		setLoading(true);
		let data = await getAllPokemon(prevUrl);
		await loadingPokemon(data.results);
		setNextUrl(data.next);
		setPrevUrl(data.previous);
		setLoading(false);
		setDetails(false);
	};

	// set pokemon to card
	const loadingPokemon = async (data) => {
		let _pokemonData = await Promise.all(
			data.map(async (pokemon) => {
				let pokemonResults = await getPokemon(pokemon.url);
				return pokemonResults;
			}),
		);
		setPokemonData(_pokemonData);
	};

	return (
		<div>
			{/* navbar */}
			<nav class="navbar navbar-expand-lg navbar-light bg-primary bg-opacity-25">
				<div class="container">
					<a class="navbar-brand fw-bold" href="/">
						Poke Dex
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<a class="nav-link" href="#">
									My Pokemon
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			{/* Pokemon List Component */}
			<div className="container">
				{loading ? (
					<div
						className="d-flex justify-content-center align-content-center"
						style={{
							height: '100vh',
							position: 'absolute',
							top: '50vh',
							left: '50vw',
						}}
					>
						<div
							className="spinner-border text-primary"
							style={{ width: '6rem', height: '6rem' }}
							role="status"
						>
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				) : (
					<Pokemon
						pokemonData={pokemonData}
						next={next}
						prev={prev}
						nextUrl={nextUrl}
						prevUrl={prevUrl}
						details={details}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
