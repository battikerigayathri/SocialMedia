
export async function serverFetch(query: string, variables: any, options: any) {

  try {
    // http://13.201.206.93/graphql
    const data = await fetch(
      `https://03ac-2401-4900-1cb1-fc38-1043-d899-1c0-c667.ngrok-free.app/graphql`, //http://stg-api.ebikego.vithiit.com
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
