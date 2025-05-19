export const getAllUsers = async () => {
    try {

        const responce = await fetch(`api/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await responce.json();
        return data;
        
    } catch (error: Error | unknown) {
        console.log(error);
        return [];
    }
}