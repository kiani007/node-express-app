document.addEventListener('DOMContentLoaded', async () => {
    const logoutBtn = document.getElementById('logout');
    const navLinks = document.querySelectorAll(".nav-link");
  

    navLinks.forEach(navLink => {
        navLink.addEventListener("click", async event => {
            navLinks.forEach(link => {
                link.classList.remove("active", "active-tab");
            });
            navLink.classList.add("active", "active-tab");
            await fetchContent(navLink.id);
        });
    });

    await fetchContent("getAllUsersBtn");

    async function fetchContent(tabId) {
        try {
            let endpoint;
            switch (tabId) {
                case "getAllUsersBtn":
                    endpoint = "/users/getAllUsers";
                    break;
                case "getAllPostsBtn":
                    endpoint = "/users/getAllPosts";
                    break;
                case "CreatePostBtn":
                    renderCreatePostForm();
                    return;
                default:
                    return;
            }
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch content');
            }
            const data = await response.json();
            const content = getTabContentById(tabId, data);
            renderContent(content);
        } catch (error) {
            console.error('Error fetching content:', error.message);
        }
    }

    function getTabContentById(tabId, data) {
        switch (tabId) {
            case "getAllUsersBtn":
                return renderUserList(data);
            case "getAllPostsBtn":
                return renderPostList(data);
            default:
                return "";
        }
    }

    function renderUserList(data) {
        if (!data || data.length === 0) {
            return "<h2>User List</h2><p>No users found.</p>";
        }
        return `
            <h2 class="mt-4 mb-3">User List</h2>
            <div class="card">
                <div class="card-body">
                    ${data.map(user => `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">User ID: ${user.id}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">User Name: ${user.name}</h6>
                                <p class="card-text">User Email: ${user.email}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function renderPostList(data) {
        if (!data || data.length === 0) {
            return "<h2>Post List</h2><p>This is the post list content.</p>";
        }
        return `
            <h2 class="mt-4 mb-3">Post List</h2>
            <div class="card post-data">
                <div class="card-body">
                    ${data.map(post => `
                        <div class="card mb-3" data-post-id="${post.id}">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Post ID: ${post.id}</h6>
                                <p class="card-text">${post.content}</p>
                                <div class="card-footer">
                                    <button data-post-id="${post.id}" class="btn btn-primary edit-post-btn">Edit Post</button>
                                    <button data-post-id="${post.id}" class="btn btn-danger delete-post-btn">Delete Post</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

 function renderCreatePostForm(post = null) {
    const titleValue = post ? post[0].title : '';
    const contentValue = post ? post[0].content : '';
    const buttonText = post ? 'Update Post' : 'Create Post';
    const postId = post ? post[0].id : '';

    const form = `
        <h2 class="mt-4 mb-3">${post ? 'Edit Post' : 'Create Post'}</h2>
        <div class="card" style="max-width: 500px;">
            <div class="card-body">
                <form id="createPostForm">
                    <input type="hidden" id="postId" name="postId" value="${postId}">
                    <div class="mb-3">
                        <label for="title" class="form-label d-flex justify-content-start">Title</label>
                        <input type="text" class="form-control" id="title" name="title" value="${titleValue}" required>
                    </div>
                    <div class="mb-3">
                        <label for="content" class="form-label d-flex justify-content-start">Content</label>
                        <textarea class="form-control" id="content" name="content" rows="5" style="max-height: 150px;" required>${contentValue}</textarea>
                    </div>
                    </form>
                <button  id="createPostBtn" class="btn btn-primary create-post-btn">${buttonText}</button>
            </div>
        </div>
    `;
    renderContent(form);
    }

    function renderContent(content) {
        const contentElement = document.getElementById("content");
        contentElement.innerHTML = content;
    }
    const logout = async() => {
         try {
            const response = await fetch(`/users/logout`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Failed');
             }
             setTimeout(() => {
                 window.location.href = '/';
             }, 3000);
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    }
   document.addEventListener('click', async (event) => {
        const postId = event.target.dataset.postId;
       const postCard = event.target.closest('.post');
        if(event.target.classList.contains('create-post-btn')){
            console.log('create post');
            handleSubmit();
        }
        if (event.target.classList.contains('edit-post-btn')) {
            handleEditPost(postId, postCard);
        } else if (event.target.classList.contains('delete-post-btn')) {
            handleDeletePost(postId);
       } else if(event.target.classList.contains('btn-logout')){    
        logout();
       }
    });

    async function handleEditPost(postId, postCard) {
        if (!postId) return;
        try {
            const response = await fetch(`/users/getPost/${postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post for editing');
            }
            const post = await response.json();
            renderCreatePostForm(post);
        } catch (error) {
            console.error('Error editing post:', error.message);
        }
    }

    async function handleDeletePost(postId) {
        if (!postId) return;
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            const response = await fetch(`/users/deletePost/${postId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            console.log('Post deleted successfully!');
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting post:', error.message);
        }
    }

    
   
    const handleSubmit = async() => {
        const form = document.getElementById('createPostForm');
        const formData = new FormData(form);
        const title = formData.get('title');
        const content = formData.get('content');
        const postId = formData.get('postId');
        const url = postId ? `/users/updatePost/${postId}` : '/users/createPost';
        const method = postId ? 'PUT' : 'POST';
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
            if (!response.ok) {
                throw new Error('Failed to save data');
            }
            alert('Data saved successfully!');
            window.location.href = '/';
        } catch (error) {
            console.error('Error saving data:', error.message);
        }
    };
    
});