import ReactDom from 'react-dom';

export default function ModalPortal({ children }) {
    //브라우저 환경일떄만 작동하도록  -> 서버에서는 렌더 XX CSR에서만 렌더하도록
    if (typeof window === 'undefined') {
        return null;
    }

    const node = document.getElementById('portal');
    return ReactDom.createPortal(children, node);
}

