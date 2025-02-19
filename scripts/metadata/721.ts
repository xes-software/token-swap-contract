export const get721Metadata = (policyId: string, name: string) => {
  return {
    [policyId]: {
      [name]: {
        Base: "Tan",
        Cigarette: "None",
        Earring: "None",
        Eyes: "Shades (yellow)",
        "Facial Hair": "None",
        Hair: "Swirl (black)",
        Headwear: "None",
        Mouth: "Lips",
        Top: "Turtleneck (rust)",
        "Top Secondary": "Chain",
        files: [
          {
            mediaType: "image/png",
            name,
            src: "ipfs://QmPS4PBvpGc2z6Dd6JdYqfHrKnURjtRGPTJWdhnAXNA8bQ",
          },
        ],
        image: "ipfs://QmPS4PBvpGc2z6Dd6JdYqfHrKnURjtRGPTJWdhnAXNA8bQ",
        mediaType: "image/png",
        name,
      },
    },
  };
};
