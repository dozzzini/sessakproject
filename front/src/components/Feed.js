const Feed = ({idx, title, content, date}) => {
	return(
		<div>
			<h3>{idx}</h3>
			<h3>{title}</h3>
			<h3>{content}</h3>
			<h3>{date}</h3>
		</div>
	)
};

export default Feed;