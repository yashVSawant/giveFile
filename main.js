const mainDiv = document.getElementById('main');
const getPosts = document.getElementById('getPosts')
const postBlog = document.getElementById('submit')
//console.log(mainDiv);

getPosts.addEventListener('click',async(e)=>{
    if(e.target.classList.contains('postComment')){
        const comment = e.target.parentNode.childNodes[2].value;
        const id = e.target.parentNode.parentNode.id;
        //console.log(comment,'id:',id)
        try{
            const getPost = await axios.post('http://localhost:2000/postComment',{comment,id});
            // console.log(getPost.data);
            // const blog = document.getElementById(`${getPost.data.id}`);
            const commentSection = document.getElementById(`comment${id}`)
            // console.log(commentSection)
            postComments(comment,commentSection);
        }catch(err){
            console.log(err)
        } 
        
    }
    if(e.target.classList.contains('plus')){
        const id = e.target.parentNode.id;
        // console.log(id)
        e.target.className='minus';
        e.target.innerText='-';
        console.log(e.target)
        try{
            const getBlogData = await axios.get(`http://localhost:2000/getBlogData?id=${id}`);
            //console.log(getBlogData.data)
            createBlog(getBlogData.data.author,getBlogData.data.description,id);
            const getComments = await axios.get(`http://localhost:2000/getComments?id=${id}`);
            //console.log(getComments.data);
            const blog = document.getElementById(`${id}`);
            // const commentSection = blog.childNodes[2].childNodes[4];
            const commentDiv = document.getElementById(`comment${id}`);
            //console.log(commentDiv);
            for(let comment of getComments.data){
                console.log();
                postComments(comment.comment,commentDiv,comment.id);
            }
                
        }catch(err){
            console.log(err)
        }
    }else if(e.target.classList.contains('minus')){
        e.target.parentNode.removeChild(e.target.parentNode.childNodes[2]);
        e.target.className='plus';
        e.target.innerText='+';
    }
    if(e.target.classList.contains('delComment')){
        
       console.log(e.target.parentNode.id) 
       const commentId = e.target.parentNode.id*-1;

       try{
        const gotInfo = await axios.get(`http://localhost:2000/deleteComment?id=${commentId}`);
        e.target.parentNode.remove(e.target);
        console.log(gotInfo)
       }catch(err){
        console.log(err)
       }
       
    }
})
function postComments(comment,commentSection,id){
    const div = document.createElement('div');
    const newComment = document.createElement('p');
    const delComment = document.createElement('button');
    div.id=id*-1;
    newComment.innerText = comment;
    delComment.innerText='x';
    div.className='comment';
    delComment.className='delComment'
    div.appendChild(newComment);
    div.appendChild(delComment);
    commentSection.appendChild(div);
}

postBlog.addEventListener('click',async(e)=>{
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    console.log(author);
    try{
        const getpost = await axios.post('http://localhost:2000/postBlog',{title,author,description})
        const data = getpost.data;
        console.log(data.id)
        // createBlog(data.title,data.author,data.description,data.id);
        createDiv(data.title,data.id);
    }catch(err){
        console.log(err)
    }
})

function createBlog(author,description,id){
    
    const newBlogDiv = document.getElementById(`${id}`);
    const div = document.createElement('div');
    // const newTitel = document.createElement('div');
    const newAuthor = document.createElement('div');
    const newDescription = document.createElement('div');
    const comment = document.createElement('input');
    const postComment = document.createElement('button');
    const getComment = document.createElement('div');
    getComment.id = `comment${id}`
    // newTitel.innerText=title;
    newAuthor.innerText=`Author: ${author}`;
    newDescription.innerText=`Description: ${description}`;
    postComment.innerText='post';
    postComment.className='postComment'
    comment.type='text';
    // div.appendChild(newTitel);
    div.appendChild(newAuthor);
    div.appendChild(newDescription);
    div.appendChild(comment);
    div.appendChild(postComment);
    div.appendChild(getComment);
    newBlogDiv.appendChild(div);
    //getPosts.appendChild(div);
}

window.addEventListener('DOMContentLoaded',async()=>{
    try{
        const getBlogs = await axios.get('http://localhost:2000/getBlogs');
        for(let data of getBlogs.data){
            createDiv(data.title,data.id);
            // createBlog(data.title,data.author,data.description,data.id);
            // const getComments = await axios.get(`http://localhost:2000/getComments?id=${data.id}`);
            // for(let commentData of getComments.data){
            //     // console.log(commentData.comment,commentData.BlogId)
            //     // const blog = document.getElementById(`${commentData.BlogId}`);
            //     // const commentSection = blog.childNodes[5];
            //     // postComments(commentData.comment,commentSection);
            // }
        }
    }catch(err){
        console.log(err)
    }
})

function createDiv(title,id){
    const newBlogDiv = document.createElement('div');
    newBlogDiv.className='newBlog';
    newBlogDiv.id=id;
    const maxOrMin = document.createElement('button');
    maxOrMin.className='plus';
    maxOrMin.innerText='+';
    const Title = document.createElement('h3');
    Title.innerText=title;
    newBlogDiv.appendChild(Title);
    newBlogDiv.appendChild(maxOrMin);
    getPosts.append(newBlogDiv);
}