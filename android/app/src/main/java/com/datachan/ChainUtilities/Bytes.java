package com.datachan.ChainUtilities;

import java.nio.ByteBuffer;

class Bytes {

    static byte[] intToByteArray(int value) {
        return new byte[]{
            (byte) (value >> 24),
            (byte) (value >> 16),
            (byte) (value >> 8),
            (byte) value
        };
    }

    static int intFromByteArray(byte[] bytes) {
        return intFromBytes(bytes[0], bytes[1], bytes[2], bytes[3]);
    }

    static byte[] longToByteArray(long value) {
        // Note that this code needs to stay compatible with GWT, which has known
        // bugs when narrowing byte casts of long values occur.
        byte[] result = new byte[8];
        for (int i = 7; i >= 0; i--) {
            result[i] = (byte) (value & 0xffL);
            value >>= 8;
        }
        return result;
    }

    static long longFromByteArray(byte[] bytes) {
        return longFromBytes(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7]);
    }

    static byte[] floatToByteArray(float value) {
        return ByteBuffer.allocate(4).putFloat(value).array();
    }

    static float floatFromByteArray(byte[] bytes) {
        return ByteBuffer.wrap(bytes).getFloat();
    }

    static byte[] stringToByteArray(String value) {
        return value.getBytes();
    }

    static String stringFromByteArray(byte[] bytes) {
        return new String(bytes);
    }

    private static long longFromBytes(
        byte b1, byte b2, byte b3, byte b4, byte b5, byte b6, byte b7, byte b8) {
        return (b1 & 0xFFL) << 56
            | (b2 & 0xFFL) << 48
            | (b3 & 0xFFL) << 40
            | (b4 & 0xFFL) << 32
            | (b5 & 0xFFL) << 24
            | (b6 & 0xFFL) << 16
            | (b7 & 0xFFL) << 8
            | (b8 & 0xFFL);
    }

    private static int intFromBytes(byte b1, byte b2, byte b3, byte b4) {
        return b1 << 24 | (b2 & 0xFF) << 16 | (b3 & 0xFF) << 8 | (b4 & 0xFF);
    }
}
