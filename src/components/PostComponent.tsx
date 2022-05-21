import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { persistor, voteDown, voteUp } from "../store";
import { Post } from "../types/Post";
import { ellipsis } from "../util";

type PostProps = { post: Post, index: number };

export const PostComponent = ({ post, index }: PostProps) => {
    const [vote, setVote] = useState('EMPTY');
    const [voted, setVoted] = useState(false);
    const dispatch = useDispatch();

    const { positive, negative } = post.votes;
    const positivePercent = positive / (positive + negative) * 100;
    const negativePercent = negative / (negative + positive) * 100;

    const doVote = () => {
        if (voted)  {
            setVote('EMPTY');
            setVoted(false);
            return;
        }

        if (vote == 'UP') {
            dispatch(voteUp(index));
        }

        if (vote == 'DOWN') {
            dispatch(voteDown(index));
        }
        
        setVoted(true);
    };

    return <article className="post featured-card__content">
        <div className="container">
            <img
                className="picture"
                src={`/assets/img/${post.picture}`}>
            </img>
            
            <div className="subcontainer">
                <div className="text">
                    <h2 className="featured-card__title">{post.name}</h2>
                    <p className="featured-card__desc">
                        {ellipsis(post.description)}
                    </p>
                </div>

                <div className="control">
                    <div className="date">
                        {voted
                            ? 'Thank you for your vote'
                            : moment(post.lastUpdated).fromNow()
                        }
                    </div>
                    <div className="buttons">
                        <button
                            className={`icon-button ${vote == 'UP' ? 'selected' : ''}`}
                            aria-label="thumbs up"
                            onClick={() => setVote('UP')}>
                            <img src="assets/img/thumbs-up-1.svg" alt="thumbs up" />
                        </button>
                        <button
                            className={`icon-button ${vote == 'DOWN' ? 'selected' : ''}`}
                            aria-label="thumbs down"
                            onClick={() => setVote('DOWN')}>
                            <img src="assets/img/thumbs-down.svg" alt="thumbs down" />
                        </button>
                        <button
                            className="vote-button"
                            aria-label="thumbs down"
                            onClick={doVote}>
                            {`Vote ${voted ? 'again' : 'now'}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="featured-card__buttons">
            <div
                className="icon-button"
                aria-label="thumbs up"
                style={{ width: positivePercent + '%' }}>
                <img src="assets/img/thumbs-up-1.svg" alt="thumbs up" />
                <span className="percent">
                    {positivePercent.toFixed(1)}%
                </span>
            </div>
            <div
                className="icon-button"
                aria-label="thumbs down"
                style={{ width: negativePercent + '%' }}>
                <span className="percent">
                    {negativePercent.toFixed(1)}%
                </span>
                <img src="assets/img/thumbs-down.svg" alt="thumbs down" />
            </div>
        </div>
    </article>;
};
