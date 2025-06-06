import type Instrumento from "../models/Instrumento";


export async function getInstrumentoJSONFetch(){
	const urlServer = 'http://localhost:8080/api/instrumentos';
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	console.log(response);
	return await response.json();
}
export async function getCategoriasJSONFetch(){
	const urlServer = 'http://localhost:8080/api/categorias';
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	console.log(response);
	return await response.json();
}

export async function getInstrumentoXIdFecth(id:number){
	const urlServer = 'http://localhost:8080/api/instrumentos/'+id;
    console.log(urlServer);
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	return await response.json() as Instrumento;
    
}

export async function deleteInstrumentoXId(id: number) {
	const urlServer = `http://localhost:8080/api/instrumentos/${id}`;
	
	const response = await fetch(urlServer, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors'
	});

	if (!response.ok) {
		throw new Error(`Error al eliminar instrumento con ID ${id}: ${response.statusText}`);
	}
}


export async function saveInstrumento(instrumento: Instrumento, formData: FormData) {
    const id = instrumento.id;
    let urlServer = 'http://localhost:8080/api/instrumentos';
    let method = "POST";

    if (id && id > 0) {
        urlServer = `http://localhost:8080/api/instrumentos/${id}`;
        method = "PUT";
    }

    await fetch(urlServer, {
        method: method,
        body: formData,
    });
}

export async function savePlato(instrumento?: Instrumento) {
	let urlServer = 'http://localhost:8080/api/insert';
	let method:string = "POST";
	if(instrumento && instrumento.id > 0){
		urlServer = 'http://localhost:8080/api/update';
		method = "PUT";
	}
	await fetch(urlServer, {
	  "method": method,
	  "body": JSON.stringify(instrumento),
	  "headers": {
		"Content-Type": 'application/json'
	  }
	});
}




   
