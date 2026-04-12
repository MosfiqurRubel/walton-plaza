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

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#fafafa" offset="20%" />
      <stop stop-color="#f0f0f0" offset="50%" />
      <stop stop-color="#fafafa" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#fafafa" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate
    attributeName="x"
    from="-${w}"
    to="${w}"
    dur="1.2s"
    repeatCount="indefinite"
  />
</svg>
`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
