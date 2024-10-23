// @flow
import React from 'react';
import classNames from 'classnames';

/**
 * Timeline
 */
const Timeline = (props) => {
    const children = props.children || null;
    const Tag = props.tag;

    return (
        <Tag className={classNames('timeline-alt', 'py-0', props.className)} {...props}>
            {children}
        </Tag>
    );
};

Timeline.defaultProps = {
    tag: 'div',
};

export default Timeline;
