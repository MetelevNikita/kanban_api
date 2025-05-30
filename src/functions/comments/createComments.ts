export const createComment = async (data: any, id: string | number) => {
    try {


        const {author, text, img} = data;

        if (!text) {
             throw new Error('Comment cannot be empty');
        }


        const responce = await fetch(`http://localhost:3000/api/task/${id}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({author, text, img})
            
        })

        if (!responce.ok) {
            throw new Error('Failed to create comment');
        }

        const newData = await responce.json();
        console.log(newData);
        return newData

        
    } catch (error) {

        console.log(error)
        
    }
}