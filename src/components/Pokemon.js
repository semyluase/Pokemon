import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import PokemonLists from './PokemonLists';

const Pokemon = ({ pokemonData, next, prev, nextUrl, prevUrl, details }) => {
	return (
		<div>
			{details === false ? (
				<div>
					<Row className="d-flex justify-content-center">
						<Col lg="5" className="my-4">
							<div className="d-flex justify-content-between">
								<Button
									type="button"
									color="primary"
									onClick={prev}
									disabled={prevUrl === null ? true : false}
								>
									Prev
								</Button>
								<Button
									type="button"
									color="primary"
									onClick={next}
									disabled={nextUrl === null ? true : false}
								>
									Next
								</Button>
							</div>
						</Col>
					</Row>
					<Row className="d-flex justify-content-center">
						{pokemonData.map((pokemon) => (
							<PokemonLists
								pokemonSprites={pokemon.sprites}
								pokemonTypes={pokemon.types}
								pokemonName={pokemon.name}
								pokemonWeight={pokemon.weight}
								pokemonHeight={pokemon.height}
								pokemonSpecies={pokemon.species}
								pokemon={pokemon}
								key={pokemon.id}
							/>
						))}
					</Row>
				</div>
			) : (
				<h1>Details</h1>
			)}
		</div>
	);
};

export default Pokemon;
