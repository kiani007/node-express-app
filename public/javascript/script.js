document.addEventListener('DOMContentLoaded', () => {
    const getAllUsersBtn = document.getElementById('getAllUsersBtn');
    const getAllPostsBtn = document.getElementById('getAllPostsBtn');
    const contentDiv = document.getElementById('content');
    const createPostBtn = document.getElementById("CreatePostBtn");
    const createPostForm = document.getElementById("createPostForm");
    const editPostForm = document.getElementById("editPostForm");

    createPostBtn.addEventListener("click", toggleCreatePostForm);
    getAllUsersBtn.addEventListener('click', fetchAndRenderUsers);
    getAllPostsBtn.addEventListener('click', fetchAndRenderPosts);
    contentDiv.addEventListener('click', handlePostActions);
    editPostForm.addEventListener('submit', updatePost);

    async function fetchAndRenderUsers() {
        try {
            const response = await fetch('/users/getAllUsers');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            renderUsers(data);
            contentDiv.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    }

    async function fetchAndRenderPosts() {
        try {
            const response = await fetch('/users/getAllPost');
            if (!response.ok) throw new Error('Failed to fetch posts');
            const data = await response.json();
            renderPosts(data);
            contentDiv.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch (error) {
            console.error('Error fetching posts:', error.message);
        }
    }

    function renderUsers(users) {
        let html = '<h2>User List</h2>';
        if (users && users.length > 0) {
            for (const user of users) {
                html += `<div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${user.name}</h5>
                                <p class="card-text">${user.email}</p>
                            </div>
                        </div>`;
            }
            contentDiv.innerHTML = html;
        }
    }

    function renderPosts(posts) {
        let html = '<h2>Post List</h2>';
        if (posts && posts.length > 0) {
            for (const post of posts) {
                html += `<div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.content}</p>
                                <button class="btn btn-primary edit-post" data-id="${post.id}">Edit</button>
                                <button class="btn btn-danger delete-post" data-id="${post.id}">Delete</button>
                            </div>
                        </div>`;
            }
        } else {
            html += '<p>No posts found</p>';
        }
        contentDiv.innerHTML = html;
    }
createPostForm.style.display === "none"
    function toggleCreatePostForm(event) {
        event.preventDefault();
        if (createPostForm.style.display === "none") {
            contentDiv.style.display = "none";
            createPostForm.style.display = "block";
        } else {
            createPostForm.style.display = "none";
        }
        contentDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function handlePostActions(event) {
        if (event.target.classList.contains('edit-post')) {
			const ddd = event.target.dataset;
			console.log(ddd);
			 contentDiv.style.display = "none";
            // createPostForm.style.display = "block";
			editPostForm.style.display = "block";
			updatePost(event,postId);
        }

        if (event.target.classList.contains('delete-post')) {
			const postId = event.target.dataset.id;
			
        
        }
    }

    async function updatePost(event,postId) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const content = formData.get('content');

        try {
            const response = await fetch(`/users/post/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });

            if (!response.ok) {
                throw new Error('Failed to update post');
            }

            console.log('Post updated successfully');
            window.location.reload();
           
        } catch (error) {
            console.error('Error updating post:', error.message);
        }
    }
});