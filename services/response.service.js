const _this = {
    error: (msg, error = false, code = 401) => {
        const r = {valid: false, msg: msg, code:code};

        if (error) {
            r.error = error;
        }

        return r;
    },
    ok: (objects = {}, msg = false, code = 200) => {
        const r = {valid: true, objects: objects}

        if (msg) {
            r.msg = msg;
        }

        return r;
    }
}

module.exports = _this;