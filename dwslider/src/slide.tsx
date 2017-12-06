import * as React from 'react';
import { SlideProps } from './interfaces';
class Slide extends React.Component<SlideProps, any> {
  render() {
    var { url, content } = this.props.data;
    return (
      <div>
        {url && <img src={url} />}
        {content && <h1>{content}</h1>}
        {!url && !content && <h2>No Contnet</h2>}
      </div>
    );
  }
}

export default Slide;
