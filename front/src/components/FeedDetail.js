import { useParams } from 'react-router-dom';
import styles from './FeedDetail.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Feed from './Feed';

const FeedDetail = () => {
	const {idx} = useParams();
	const [loading, setLoading] = useState(true);
	const [feed, setFeed] =useState({});
	const getFeed = async () => {
		const res = (await (axios.get(`/api/feed/${idx}`))).data;
		setFeed(res.data);
		setLoading(false);
	};

	useEffect(() => {
		getFeed();
	}, []);

	return(
		<div className={styles.FeedDetail}>
			게시판 상세보기
			{loading ? (<h2>loading~~</h2>) :
			(		
				<Feed 
				idx={feed.idx}
				title={feed.title}
				content={feed.content}
				date={feed.date}
			/>
			)
			}
		
		</div>
	)
};

export default FeedDetail;