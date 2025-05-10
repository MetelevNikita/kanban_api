export const authUser = async (dataAuth: {email: string, password: string}) => {

  try {


    const email = dataAuth.email as string;
    const password = dataAuth.password as string;

    console.log(email, password);

    const responce = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })

    if (!responce.ok) {
      console.log('Error:', responce.status)
    }

    const data = await responce.json();
    console.log(data);
    return data;

  } catch (error: Error | unknown) {
    return console.error(error);
  }

}