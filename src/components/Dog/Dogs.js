import React from "react";
import Dog from "./Dog";

function Dogs({ results}) {
	let data = [];
	if (results.data) {
		data = results.data || [];
	}

	if(data.length > 0){
		return (
			<div className="row">
				{data.map((dog) => (
					<Dog
						key={dog.id}
						name={dog.name}
						image={dog.reference_image_id}
						breed={dog.breed_group}
						breedFor={dog.bred_for}
						lifeSpan={dog.life_span}
						temperament={dog.temperament}
						origin={dog.origin}
						height={dog.height.metric}
					/>
				))}
			</div>
		);
	}else{
		return (
			<p className="text-center">No adorable dogs found..</p>
		);
	}
}

export default Dogs;
