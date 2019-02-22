const _this = {
    error: (msg, code = 401) => {
        return {valid: false, msg: msg, code: code}
    },
    ok: (objects = {}, msg = false, code = 200) => {
        const r = {valid: true, objects: objects}

        if (!msg) {
            r.msg = msg;
        }

        return r;
    }
}

module.exports = _this;