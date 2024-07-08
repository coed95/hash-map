import { LinkedList } from "./linked-list.js";

class HashMap {
    constructor(size = 16) {
        this.buckets = new Array(size).fill(null).map(() => new LinkedList());
    }

    checkIndex(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
    }

    hash(key) {
        let hash = 0;

        for (let index = 0; index < key.length; index++) {
            hash = (hash << 5) - hash + key.charCodeAt(index);
            hash |= 0;
        }

        return Math.abs(hash) % this.buckets.length;
    }

    clear() {
        this.buckets = new Array(this.buckets.length).fill(null).map(() => new LinkedList());
    }

    set(key, value) {
        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];
        const node = bucket.find(key);

        if (node) {
            node.value = value;
        }
        else {
            bucket.append(key, value);
        }
    }

    get(key) {
        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];
        const node = bucket.find(key);

        return node ? node.value : null;
    }

    has(key) {
        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];
        const node = bucket.find(key);

        return node ? true : false;
    }

    remove(key) {
        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];

        return bucket.remove(key);
    }

    length() {
        let keys = 0;

        for (const bucket of this.buckets) {
            let current = bucket.head;

            while (current !== null) {
                keys++;
                current = current.next;
            }
        }

        return keys;
    }

    keys() {
        let totalKeys = [];
    
        for (const bucket of this.buckets) {
            let current = bucket.head;
    
            while (current !== null) {
                totalKeys.push(current.key);
                current = current.next;
            }
        }
    
        return totalKeys;
    }

    values() {
        let totalValues = [];

        for (const bucket of this.buckets) {
            let current = bucket.head;

            while (current !== null) {
                totalValues.push(current.value);
                current = current.next;
            }
        }

        return totalValues;
    }

    entries() {
        let totalEntries = [];

        for (const bucket of this.buckets) {
            let current = bucket.head;

            while (current !== null) {
                totalEntries.push([current.key, current.value]);
                current = current.next;
            }
        }

        return totalEntries;
    }
}