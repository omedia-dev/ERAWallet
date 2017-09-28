declare module "crypto" {
    const createHash: (algo: string) => CryptoHash;

    interface CryptoHash {
        end(buffer: Buffer): void;

        read(): Buffer;

        update(input: string, encoding?: string): CryptoHash;

        digest(encoding?: CryptoEncoding): Buffer;
    }

    type CryptoEncoding = "hex" | "base64";
}
