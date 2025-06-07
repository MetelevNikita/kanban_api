export const createUser = async (formData: FormData) => {

  try {

    const responce = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      body: formData
    })

    const data = await responce.json();

      if (!responce.ok) {
        console.log('Error:', data);
      };

    return data;

  } catch (error) {
    console.error(error)
  }

}