import React from 'react';
import ReactInfiniteScroll from 'react-infinite-scroller';

export default props => (
    <ReactInfiniteScroll
        pageStart={props.page}
        hasMore={!props.last}
        loadMore={props.loadMore}
        loader={props.loader}
    >
        {props.children}
    </ReactInfiniteScroll>
);