const container = document.querySelector('.container');

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchData = async (url: string): Promise<Post[]> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const appendToDom = (data: Post[]): void => {
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
    container?.appendChild(divNode);
  });
};

// For this function I assume, that both number and string fields can be changed. So that could be 'id' or 'title' for instance which are of type number and string.
//But not sure if it would make sense in real projects to change "id" and "userId".

function updateObjectInArray<T>(
  array: T[],
  key: keyof T,
  newKeyValue: string | number
): T[] {
  return array.map((post) => ({ ...post, [key]: newKeyValue }));
}

(async () => {
  const fetchedPosts = await fetchData(
    'http://jsonplaceholder.typicode.com/posts'
  );
  const updatedPosts = updateObjectInArray<Post>(
    fetchedPosts,
    'title',
    'some changed title'
  );
  appendToDom(updatedPosts);
})();
