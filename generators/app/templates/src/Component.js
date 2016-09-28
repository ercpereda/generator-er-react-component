import React from 'react';
import styles from './<%= componentName %>.css';

const <%= componentName %> = props => (
  <div className={styles.component}>
    {props.text}
  </div>
);

<%= componentName %>.propTypes = {
  text: React.PropTypes.string
};

export default <%= componentName %>;
