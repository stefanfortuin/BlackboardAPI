import { BBNativeBackend, IframeAppLoader } from '@stefanfortuin/blackboardlib-test';

window.onload = () => {
    const ifmw = new IframeAppLoader(document, new BBNativeBackend());
    ifmw.loadApp(__ClientURL__);
};