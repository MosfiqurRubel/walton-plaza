export const splitName = (str: string) => {
  const parts = str.split("|");
  return {
    firstLine: parts[0] ? parts[0].trim() : str,
    secondLine: parts[1] ? parts[1].trim() : "",
  };
};

// export const fetchGraphQL = async (query: string, variables = {}) => {
//   try {
//     const response = await fetch("/api/graphql", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ query, variables }),
//     });

//     const result = await response.json();

//     if (result.errors) {
//       console.error("GraphQL Errors:", result.errors);
//       return null;
//     }
//     return result.data;
//   } catch (error) {
//     console.error("Network error:", error);
//     return null;
//   }
// };
