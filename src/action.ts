
export async function serverFetch(query: string, variables: any, options: any) {

  try {
    // http://13.201.206.93/graphql
    const data = await fetch(
      `/api/graphql`, //http://stg-api.ebikego.vithiit.com
      {
        method: 'POST',
        headers: {
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
