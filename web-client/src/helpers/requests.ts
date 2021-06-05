export const graphqlRequest = async ({
  query,
  variables = {},
}: {
  query: any;
  variables?: any;
}) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  };

  const url = import.meta.env.VITE_API;

  const result = await fetch(url, options);
  const resJson = await result.json();
  return resJson;
};
