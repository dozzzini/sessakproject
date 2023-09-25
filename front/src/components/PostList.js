import React from 'react';

const PostList = ({ posts, selectPost }) => {
	return(
	<>
		<ul>
		{posts.map((post) => (
			<li key={post.id} onClick={() => selectPost(post)}>
			{post.title}
			</li>
		))}
    	</ul>
	</>
	)
};

export default PostList;