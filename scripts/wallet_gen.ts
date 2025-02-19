import { Crypto } from "@spacebudz/lucid";

// Generates a 24 word seed phrase, by BIP-32
const seed = Crypto.generateSeed();

// Logs the seed phrase.
console.log(seed);
