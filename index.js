"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const container = document.querySelector('.container');
const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const appendToDom = (data) => {
    data.forEach((item) => {
        let divNode = document.createElement('div');
        divNode.classList.add('divNode');
        divNode.innerHTML += `
    <pre>
    {
     "userId": ${item.userId} 
     "id": ${item.id}
     "title": ${item.title}
     "body": ${item.body}
    }
    </pre>`;
        container === null || container === void 0 ? void 0 : container.appendChild(divNode);
    });
};
// For this function I assume, that both number and string fields can be changed. So that could be 'id' or 'title' for instance which are of type number and string.
//But not sure if it would make sense in real projects to change "id" and "userId".
function updateObjectInArray(array, key, newKeyValue) {
    return array.map((post) => (Object.assign(Object.assign({}, post), { [key]: newKeyValue })));
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedPosts = yield fetchData('http://jsonplaceholder.typicode.com/posts');
    const updatedPosts = updateObjectInArray(fetchedPosts, 'title', 'some changed title');
    appendToDom(updatedPosts);
}))();
