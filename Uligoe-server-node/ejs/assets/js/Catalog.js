class Catalog {
    constructor(el, pos) {
        if (el && typeof el === 'string') {
            this._el = document.querySelector(el);
        }
        else {
            this._el = el;
        }
        if (pos && typeof pos === 'string') {
            this._pos = document.querySelector(pos)
        }
        else {
            this._pos = pos
        }

        this._interimObj = { children: [] };
        this._items = [];

        this.init();
        this.mount();
    }

    init() {
        const domList = this._el.querySelectorAll('h1,h2,h3');
        domList.forEach(item => {
            const curTagName = item.tagName;
            const v = item.textContent;
            item.id = v;
            this[curTagName](v);
        })
        this._items.push(this._interimObj);
    }

    mount() {
        this.mountElement(this._items, this._pos);
    }

    mountElement(_items, _parent) {
        if (!Array.isArray(_items)) {
            return
        }
        _items.forEach(item => {
            if (item.headTitle) {
                const oHref = document.createElement('a');
                oHref.innerHTML = item.headTitle;
                oHref.href = `#${item.headTitle}`;
                oHref.style.display = 'block';
                oHref.className = item.level;
                _parent.appendChild(oHref);
            }

            if (item.children) {
                this.mountElement(item.children, _parent);
            }
        })
    }

    H1(v) {
        if (this._interimObj) { this._items.push(this._interimObj); }
        var obj = {
            headTitle: v,
            children: [],
            level: 'level1'
        };
        this._interimObj = obj;
    }

    H2(v) {
        this._interimObj.children.push({
            headTitle: v,
            children: [],
            level: 'level2'
        });
    }

    H3(v) {
        this._interimObj.children[this._interimObj.children.length - 1].children.push({
            headTitle: v,
            level: 'level3'
        });
    }
}
