import React from 'react';
import logger from '../../loggers/logger';
import DemoSchema from './DemoSchema';
import CAF from '../common/CustomAutoForm';

class AutoForm extends React.Component {
  handleOnSubmit() {
    logger.log("handleOnSubmit");
  }
  
  /**
   * quill container see quill doc, http://quilljs.com/docs/quickstart/
   * CAF please see meteor-react-autoform, https://github.com/Aluminati/meteor-react-autoform
   * 
   * @memberOf AutoForm
   */
  render() {
    const container = {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    }
    return (
      <div>
        <h2>Add New Post dddd</h2>
        <CAF
          buttonLabel="test"
          buttonProps={{ disabled: true }}
          muiTheme={true}
          onSubmit={this.handleOnSubmit}
          schema={DemoSchema}
          type="insert"
          container={container}
          />
      </div>
    )
  }
}

export default AutoForm;
