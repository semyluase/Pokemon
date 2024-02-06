import React, { useState } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Button,
	Col,
	Row,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
import typeColors from '../helpers/typeColors';
import { getPokemon } from '../services/pokemon';

const PokemonLists = (
	{
		pokemonSprites,
		pokemonTypes,
		pokemonName,
		pokemonWeight,
		pokemonHeight,
		pokemonSpecies,
		pokemon,
	},
	props,
) => {
	const { className } = props;
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	const detailsPokemon = async () => {
		// let data = await getPokemon();
	};
	return (
		<Col lg="3" md="4" className="my-3">
			<Card className="shadow" style={{ borderRadius: '.8rem' }}>
				<CardImg
					top
					width="25%"
					src={pokemonSprites.front_default}
					alt={pokemonName}
				/>
				<CardBody>
					<CardTitle tag="h5" className="text-center">
						{pokemonName.toUpperCase()}
					</CardTitle>
					<div className="d-flex justify-content-center">
						{pokemonTypes.map((type) => {
							return (
								<span
									className="badge mx-2 text-light"
									style={{ backgroundColor: typeColors[type.type.name] }}
								>
									{type.type.name}
								</span>
							);
						})}
					</div>
					<CardText>
						<Row className="bg-success bg-opacity-25 p-2 my-3">
							<Col lg="6" md="6" className="text-center">
								<div className="fw-bold">Weight</div>
								<div>{pokemonWeight}</div>
							</Col>
							<Col lg="6" md="6" className="text-center">
								<div className="fw-bold">Height</div>
								<div>{pokemonHeight}</div>
							</Col>
						</Row>
					</CardText>
					<Button onClick={toggle}>Details</Button>
				</CardBody>
			</Card>
			<div>
				<Modal isOpen={modal} toggle={toggle} className={className}>
					<ModalHeader>{pokemon.name.toUpperCase()}</ModalHeader>
					<ModalBody>
						<Row>
							<Col lg="4" md="4" sm="5">
								<img
									src={pokemon.sprites.front_default}
									width="75%"
									alt={pokemon.name}
								></img>
							</Col>
							<Col lg="8" md="8" sm="7">
								<div>
									{pokemon.types.map((type) => {
										return (
											<span
												className="badge mx-2 text-light"
												style={{ backgroundColor: typeColors[type.type.name] }}
											>
												{type.type.name}
											</span>
										);
									})}
								</div>
							</Col>
						</Row>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={toggle}>
							Do Something
						</Button>{' '}
						<Button color="secondary" onClick={toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		</Col>
	);
};

export default PokemonLists;
