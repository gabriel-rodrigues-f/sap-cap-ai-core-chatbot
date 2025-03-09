class BufferAdapter {
    parseArrayToVectorBuffer(array) {
        const sizeFloat = 4;
        const sizeDimensions = 4;
        const bufferSize = array.length * sizeFloat + sizeDimensions;
        const buffer = Buffer.allocUnsafe(bufferSize);
        buffer.writeUInt32LE(array.length, 0);
        array.forEach((value, index) => {
            buffer.writeFloatLE(value, index * sizeFloat + sizeDimensions);
        });
        return buffer;
    };
};

module.exports = new BufferAdapter();