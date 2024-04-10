
export async function serverFetch(query: string, variables: any, options: any) {

  try {
    const data = await fetch(
      `/api/graphql`,
      {
        method: 'POST',
        headers:{
          'content-type': 'application/json',
          //   Authorization: userData ? userData.token : undefined,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
        ...options,
      }
    );
    let parseData = await data.json();
    console.log(parseData, 'action');

    if (parseData?.errors) {
      return { error: parseData?.errors[0] };
    }
    return parseData?.data;
  } catch (error) {
    return { error: error };
  }
}


export const uploadFile = async (file:any) => {
  console.log(file,"waerctfvgbhnj")
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('api/logo-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    });

    // if (!response.ok) {
    //   throw new Error('Failed to upload file');
    // }

    return await response.json(); // Return JSON response
  } catch (error) {
    throw error; // Rethrow the error to handle it where the function is called
  }
};