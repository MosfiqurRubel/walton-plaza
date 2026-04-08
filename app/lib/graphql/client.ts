export async function fetchGraphQL(query: string, variables = {}) {
  const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await res.json();

  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    throw new Error(json.errors[0]?.message || "GraphQL Error");
  }

  return json.data;
}
