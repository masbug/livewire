import { getNonce } from '@/utils'

injectModalStyles();

// This code and concept is all Jonathan Reinink - thanks main!
export function showHtmlModal(html) {
    let modal = document.getElementById('livewire-error');

    if (typeof modal != 'undefined' && modal != null) {
        // Modal already exists.
        modal.innerHTML = '';
    } else {
        modal = document.createElement('div');
        modal.id = 'livewire-error';
    }

    let iframe = document.createElement('iframe');
    iframe.id = 'livewire-error-frame';
    modal.appendChild(iframe);

    document.body.prepend(modal);
    document.body.classList.add('has-livewire-modal');

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const noscript = doc.querySelector('noscript');
    if(noscript && noscript.firstElementChild)
        iframe.contentWindow.document.body.appendChild(noscript.firstElementChild);
    else
        iframe.contentWindow.document.body.appendChild(doc.body);
    iframe.contentWindow.document.head.appendChild(doc.head);

    // Close on click.
    modal.addEventListener('click', () => hideHtmlModal(modal));

    // Close on escape key press.
    modal.setAttribute('tabindex', 0);
    modal.addEventListener('keydown', e => {
        if (e.key === 'Escape') hideHtmlModal(modal);
    });
    modal.focus();
}

export function hideHtmlModal(modal) {
    if(modal && modal.parentNode)
        modal.parentNode.removeChild(modal);
    else if(modal)
        modal.outerHTML = '';
    document.body.classList.remove('has-livewire-modal');
}

function injectModalStyles(target= document) {
    let style = document.createElement('style');

    style.innerHTML = `
    .has-livewire-modal {
        overflow: hidden;
    }

    #livewire-error {
        position: fixed;
        width: 100vw;
        height: 100vh;
        padding: 50px;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 200000;
    }

    #livewire-error-frame {
        background-color: #e5e7eb;
        border-radius: 5px;
        width: 100%;
        height: 100%;
        border: none;
    }
    `;

    let nonce = getNonce();

    if (nonce) style.nonce = nonce;

    target.head.appendChild(style);
}
