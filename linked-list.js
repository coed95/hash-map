import { Node } from "./node.js";

export class LinkedList {
    constructor() {
        this.head = null;
    }

    append(key, value) {
        const newNode = new Node(key, value);

        if (this.head === null) {
            this.head = newNode;
            return;
        }

        let current = this.head;

        while (current.next !== null) {
            current = current.next;
        }

        current.next = newNode;
    }

    find(key) {
        let current = this.head;

        while (current !== null) {
            if (current.key === key) {
                return current;
            }

            current = current.next;
        }

        return null;
    }

    remove(key) {
        if (this.head === null) {
            return false;
        }

        if (this.head.key === key) {
            this.head = this.head.next;
            return true;
        }

        let current = this.head;

        while (current.next !== null) {
            if (current.next.key === key) {
                current.next = current.next.next;
                return true;
            }

            current = current.next;
        }

        return false;
    }
}