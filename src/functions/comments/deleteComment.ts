export const deleteComment = async (taskId: string | number, commentId: string | number) => {
    try {


        const responce = await fetch (`api/task/${taskId}/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if(!responce.ok) throw new Error ('Failed to delete comment');

        const data = await responce.json();
        console.log(data);
        return data;

    } catch (error: Error | unknown) {
        return error;  
    }
}