import { AutoForm } from 'meteor/aldeed:autoform';

import '../../imports/ui/common/summerNoteTemplate.html';
import '../../imports/ui/common/summerNote.js';

import '../../imports/db/images';

AutoForm.addInputType('RichTextEditor', {
  template: 'summerNoteTemplate',
  valueOut: function() {
    return this.summernote('code');
  }
});
