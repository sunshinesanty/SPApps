import * as React from 'react';
import { ILikeRendererProps, ILikeRendererState } from '../interfaces/ChatInterfaces';
import chatStore from '../Store/chatStore';

class LikeRenderer extends React.Component<ILikeRendererProps, ILikeRendererState> {
    constructor(props: ILikeRendererProps) {
        super(props);
        this.state = {
            isLiked: this.props.likes.findIndex(l =>
                l.username.toLowerCase() === this.props.username.toLowerCase()) > -1,
            likeCount: this.props.likes.length
        };
    }
    componentWillReceiveProps(nextProps: ILikeRendererProps) {
        chatStore.likes.isLikedByUser(nextProps.postID, nextProps.username).then((isLiked: boolean) => {
            this.setState({ isLiked });
        });
    }
    onClicked = (e: any) => {
        e.preventDefault();
        let { isLiked, likeCount } = this.state;
        isLiked = !isLiked;
        likeCount = isLiked ? ++likeCount : --likeCount;
        this.setState({ isLiked, likeCount });
        chatStore.likes.toggleLike(this.props.postID, this.props.username);
    }
    render() {
        const buttonStyle = `btn ${this.state.isLiked ? 'btn-info' : 'btn-default'} btn-sm`;
        const likeCountText = this.state.likeCount > 0 ? `(${this.state.likeCount})` : '';
        return (
            <div>
                <button type="button" className={buttonStyle} onClick={this.onClicked}>
                    <span className="glyphicon glyphicon-thumbs-up" /> {likeCountText}
                </button>
            </div>
        );
    }
}

export default LikeRenderer;
