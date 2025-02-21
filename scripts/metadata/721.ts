export const get721Metadata = (
  policyId: string,
  name: string,
  attributes?: Record<string, unknown>,
) => {
  return {
    [policyId]: {
      [name]: {
        ...attributes,
        files: [
          {
            mediaType: "image/png",
            name: name,
            src: "ipfs://QmPS4PBvpGc2z6Dd6JdYqfHrKnURjtRGPTJWdhnAXNA8bQ",
          },
        ],
        image: "ipfs://QmPS4PBvpGc2z6Dd6JdYqfHrKnURjtRGPTJWdhnAXNA8bQ",
        mediaType: "image/png",
        name: name,
      },
    },
  };
};
