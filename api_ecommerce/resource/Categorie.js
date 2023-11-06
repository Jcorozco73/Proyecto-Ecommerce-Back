export default {
    categorie_list: (categorie) => {
        return {
            id: categorie.id,
            title: categorie.title,
            imagen: categorie.imagen,
            state: categorie.state
           
        }
           
           
    }
}

