export const createUser = async (formData: FormData) => {

  try {

    const responce = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      body: formData
    })

    const data = await responce.json();
      if (!responce.ok) throw new Error(data.error || "Upload failed");

    window.location.href = '/login';

  } catch (error) {
    console.error(error)
  }

}