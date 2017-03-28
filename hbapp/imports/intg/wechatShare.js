import { Meteor } from 'meteor/meteor';

export default function wechatShare(title, type) {
  if (Meteor.isCordova) {
    Meteor.startup(() => {
      let scene = '';
      if (type === 'wechat') {
        scene = Wechat.Scene.SESSION;
      } else if (type === 'circle') {
        scene = Wechat.Scene.TIMELINE;
      }
      Wechat.share({
        message: {
          title: title,
          description: Meteor.settings.public.WECHAT_SHARE_DESC,
          thumb: Meteor.settings.public.WECHAT_SHARE_THUMB || '',
          // mediaTagName: "TEST-TAG-001",
          // messageExt: "这是第三方带的测试字段",
          // messageAction: "<action>dotalist</action>",
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: Meteor.absoluteUrl(window.location.pathname.substring(1))
          }
        },
        scene: scene
      }, function () {

      }, function (reason) {
        alert("Failed: " + reason);
      });
    });
  }
}