

    function geID<Type>(id: string): Type {
        const object: any = document.getElementById(id);
        if (!object) {
            throw new Error(`Element not founf id: ${id}`);
        }
        return object;
    }

export default geID;
