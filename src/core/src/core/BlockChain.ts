export class BlockChain {
    static FEE_POW_MAX = 6;
    static FEE_SCALE = 8;
    static FEE_RATE = BlockChain.FEE_SCALE;
    static FEE_POW_BASE = 1.5;
    static FEE_PER_BYTE = 64;

    static MAX_BLOCK_BYTES = 2 << 21;
    static MAX_REC_DATA_BYTES = BlockChain.MAX_BLOCK_BYTES >> 1;
}
