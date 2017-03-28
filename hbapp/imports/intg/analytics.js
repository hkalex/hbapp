import { Meteor } from 'meteor/meteor';

class Analytics {
  setupAV() {
    // 当前版本
    var VERSION = '0.0.1';

    // 获取命名空间
    var AV = window.AV || {};
    window.AV = AV;

    // 命名空间，挂载一些工具方法
    var tool = {};

    // 命名空间，挂载私有方法
    var engine = {};

    var newAnalytics = function (options) {

      // 应用版本
      var appVersion = options.version || null;

      // 推广渠道
      var appChannel = options.channel || null;

      return {

        // 发送统计数据
        send: function (options, callback) {
          var eventsList = [];

          // 判断是否传入的是有值的数组
          if (options && options.length) {
            eventsList = options;
          }
          // 如果不是数组，那就是对象
          else {

            // 判断参数是否正确
            if (!options || !options.event) {
              throw ('EventObject must have a event value.');
            }

            // 单个事件对象
            var eventObj = {

              // 事件名称
              event: options.event,

              // 事件属性，完全自定义
              attr: options.attr,

              // 持续时长
              duration: options.duration,

              // 内部使用
              tag: options.tag
            };
            eventsList.push(eventObj);
          }

          // 处理下数据
          for (var i = 0, l = eventsList.length; i < l; i++) {
            eventsList[i].attributes = eventsList[i].attr;

            // 清理掉多余字段
            delete eventsList[i].attr;
          }

          // 分析统计接口
          var url = 'https://api.leancloud.cn/1.1/stats/open/collect';
          var data = {
            client: {
              id: engine.getId(),

              // 服务器端会统一按照小写字母校验
              platform: 'web',
              app_version: appVersion,
              app_channel: appChannel
            },
            session: {
              id: tool.getId()
            },
            events: eventsList
          };

          Meteor.call('sendAnalytics', {
            url: url,
            method: 'post',
            data: data
          }, function (error, value) {
            if (callback) {
              if (value) {
                callback(value);
              }
              else {
                callback(null, error);
                throw ('Network error.');
              }
            }
          });
        }
      };
    };

    // 主函数
    AV.analytics = function (options) {

      // 创建一个新的实例
      var analyticsObj = newAnalytics(options);

      // 启动自动页面时长统计
      engine.pageView(analyticsObj);

      // 启动自动 session 时长统计
      engine.sessionView(analyticsObj);

      return analyticsObj;
    };

    // 赋值版本号
    AV.analytics.version = VERSION;

    // 挂载私有方法
    AV.analytics._tool = tool;
    AV.analytics._engine = engine;

    engine.getId = function () {
      var key = 'leancloud-analytics-id';
      var id = window.localStorage.getItem(key);
      if (!id) {
        id = tool.getId();
        window.localStorage.setItem(key, id);
      }
      return id;
    };

    // 自动统计页面相关
    engine.pageView = function (analyticsObj) {
      var startTime;
      var endTime;
      var page;

      function start() {
        startTime = tool.now();
        page = window.location.href;
      }

      function end() {
        endTime = tool.now();
        analyticsObj.send({

          // 必须为 _page 表示一次页面访问
          event: '_page',

          // 页面停留时间，单位毫秒
          duration: endTime - startTime,

          // 页面名称
          tag: page
        });
      }

      // 默认自动启动
      start();

      // 监听 url 变化（包括 hash 变化）
      window.addEventListener('hashchange', function () {
        // 页面发生变化，发送一次页面统计
        end();
        // 再次启动新的统计
        start();
      });

      // 当页面关闭的时候
      window.addEventListener('beforeunload', function () {
        // 发送一次
        end();
      });
    };

    // 自动统计一次 session 周期的时间
    engine.sessionView = function (analyticsObj) {
      var startTime = tool.now();
      window.addEventListener('beforeunload', function () {
        var endTime = tool.now();
        analyticsObj.send({

          //必须为 _session.close 表示一次使用结束
          event: '_session.close',

          // 使用时长，单位毫秒
          duration: endTime - startTime
        });
      });
    };

    // 获取一个唯一 id
    tool.getId = function () {

      // 与时间相关的随机因子
      var getIdItem = function () {
        return new Date().getTime().toString(36) + Math.random().toString(36).substring(2, 3);
      };
      return 'AV' + getIdItem() + getIdItem() + getIdItem();
    };

    // 获取当前时间的时间戳
    tool.now = function () {
      return new Date().getTime();
    };
    return AV;
  }

  init(initObj) {
    const AV = this.setupAV(window);
    const analytics = AV.analytics(initObj);
    return analytics;
  }
}

const analytics = new Analytics();

export default analytics;