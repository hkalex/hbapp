import { Meteor } from 'meteor/meteor';

import '/imports/startup/attachUserSchema';
import C from '/imports/consts/Constants';

C.APP_CODE = 'C';

Meteor.startup(() => {
  $('html').attr('class', 'backgroundsize bgpositionshorthand bgpositionxy bgrepeatround bgrepeatspace bgsizecover borderradius cssanimations csscalc csstransforms supports csstransforms3d csstransitions no-flexboxtweener fontface inlinesvg localstorage multiplebgs preserve3d sessionstorage smil svgclippaths svgfilters svgforeignobject canvas todataurljpeg todataurlpng todataurlwebp no-touch');
  $('body').addClass('layout-fixed');
});