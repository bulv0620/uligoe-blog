let obj = null;
let time = null;

function Toast(msg, duration) {
    if (obj) {
        clearTimeout(time);
        time = null;
        document.body.removeChild(obj);
    }

    duration = isNaN(duration) ? 3000 : duration;
    let m = document.createElement('div');
    obj = m;
    m.innerHTML = msg;
    document.body.appendChild(m);
    m.style.cssText = `
        font-size: .32rem;
        color: rgb(255, 255, 255);
        background-color: rgba(0, 0, 0, 0.6);
        padding: 10px 18px;
        margin: 0 0 0 -60px;
        border-radius: 4px;
        position: fixed;    
        top: 46%;
        left: 50%;
        text-align: center;
        transition: all .4s ease;
        z-index: 999
    `;
    time = setTimeout(function () {
        let d = 0.5;
        m.style.opacity = '0';
        setTimeout(function () { document.body.removeChild(m) }, d * 1000);
        obj = null;
    }, duration);
}  