import Typo from 'typo-js';
import dicData from './dictionaries/en_US.dic';
import affData from './dictionaries/en_US.aff';

let dictionary: Typo;
try {
    dictionary = new Typo('en_US', affData, dicData);
} catch (error) {
    console.error('Error creating Typo object:', error);
}

function spellcheck(word: string): boolean {
    if (word) {
        const wordLowercase = word.toLowerCase().replace(/[^\w\s]|_/g, '');
        if (wordLowercase) {
            const ret: boolean = dictionary.check(wordLowercase);
            console.log('checking word "' + wordLowercase + '" returned ' + ret);
            return ret;
        } else {
            console.log('word lowercase is undefined or null or empty');
        }
    }
    return false;
}

function createHighlightSpan(word: string): HTMLSpanElement {
    const span: HTMLSpanElement = document.createElement('span');
    span.style.textDecoration = 'underline';
    span.style.textDecorationColor = 'red';
    span.style.textDecorationStyle = 'wavy';
    const textNode: Text = document.createTextNode(word);
    span.appendChild(textNode);
    span.classList.add('typo-highlight');
    return span;
}


function highlightTypos(): void {
    const elements: NodeListOf<HTMLElement> = document.querySelectorAll('*');
    for (let i = 0; i < elements.length; i++) {
        const element: HTMLElement = elements[i];
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            const text: string = (<HTMLInputElement>element).value;
            const words: string[] = text.split(/\s+/);
            for (let j = 0; j < words.length; j++) {
                const word: string = words[j];
                if (word && !spellcheck(word)) {
                    const span: HTMLSpanElement = createHighlightSpan(word);
                    element.parentNode!.insertBefore(span, element.nextSibling);
                }
            }
        } else {
            const childNodes: NodeListOf<ChildNode> = element.childNodes;
            for (let j = 0; j < childNodes.length; j++) {
                const childNode: ChildNode = childNodes[j];
                if (childNode.nodeType === Node.TEXT_NODE) {
                    const words: string[] = childNode.textContent!.split(/\s+/);
                    const parent: Node = childNode.parentNode!;
                    let newContent = '';
                    for (let k = 0; k < words.length; k++) {
                        const word: string = words[k];
                        if (word && !spellcheck(word)) {
                            const span: HTMLSpanElement = createHighlightSpan(word);
                            newContent += span.outerHTML + ' ';
                        } else {
                            newContent += word + ' ';
                        }
                    }
                    const newChildNode = document.createElement('span');
                    newChildNode.innerHTML = newContent;
                    parent.replaceChild(newChildNode, childNode);
                }
            }
        }
    }
}



highlightTypos();

// make the function run every 5 seconds
setInterval(highlightTypos, 5000);