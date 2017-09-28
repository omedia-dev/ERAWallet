package com.datachan.ChainUtilities;

import android.support.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;

import java.io.ByteArrayOutputStream;

public class RNChainUtilities extends ReactContextBaseJavaModule {
    public RNChainUtilities(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ChainUtilities";
    }

    @ReactMethod
    public void base58encode(ReadableArray input, Promise promise) {
        try {
            String result = Base58.encode(getByteArrayFromInput(input));
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void base58decode(String input, Promise promise) throws Exception {
        try {
            byte[] result = Base58.decode(input);
            promise.resolve(getWritableArray(result));
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void intToByteArray(int input, Promise promise) throws Exception {
        try {
            byte[] result = Bytes.intToByteArray(input);
            promise.resolve(getWritableArray(result));
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void intFromByteArray(ReadableArray input, Promise promise) {
        try {
            int result = Bytes.intFromByteArray(getByteArrayFromInput(input));
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void longToByteArray(String input, Promise promise) throws Exception {
        try {
            byte[] result = Bytes.longToByteArray(Long.parseLong(input, 10));
            promise.resolve(getWritableArray(result));
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void longFromByteArray(ReadableArray input, Promise promise) {
        try {
            long result = Bytes.longFromByteArray(getByteArrayFromInput(input));
            promise.resolve(Long.toString(result));
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void floatToByteArray(String input, Promise promise) throws Exception {
        try {
            byte[] result = Bytes.floatToByteArray(Float.parseFloat(input));
            promise.resolve(getWritableArray(result));
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void floatFromByteArray(ReadableArray input, Promise promise) {
        try {
            float result = Bytes.floatFromByteArray(getByteArrayFromInput(input));
            promise.resolve(Float.toString(result));
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void stringToByteArray(String input, Promise promise) throws Exception {
        try {
            byte[] result = Bytes.stringToByteArray(input);
            promise.resolve(getWritableArray(result));
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void stringFromByteArray(ReadableArray input, Promise promise) {
        try {
            String result = Bytes.stringFromByteArray(getByteArrayFromInput(input));
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @NonNull
    private WritableArray getWritableArray(byte[] result) {
        WritableArray data = Arguments.createArray();
        for (int i = 0; i < result.length; i++) {
            data.pushInt(result[i]);
        }
        return data;
    }

    @NonNull
    private byte[] getByteArrayFromInput(ReadableArray input) {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        for (int i = 0; i < input.size(); i++) {
            output.write(input.getInt(i));
        }
        return output.toByteArray();
    }
}
