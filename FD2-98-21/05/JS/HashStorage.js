function HashStorage () {

    this.storage = {};

    this.addValue = function (key, value) {
        this.storage[key] = value;
    }

    this.getValue = function (key) {
        return this.storage[key];
    }

    this.deleteValue = function (key) {
        if (key in this.storage) {
            return delete this.storage[key];
        }
        else {
            return false;
        }
    }

    this.getKeys = function () {
        return Object.keys(this.storage)
    }
}