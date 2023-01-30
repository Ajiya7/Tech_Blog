async function editFormHandler(event) {
    event.preventDefault();
    console.log("dfghjytyk")
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
  
}

document.querySelector('.edit_post').addEventListener('click', editFormHandler);