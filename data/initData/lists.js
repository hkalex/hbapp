// Country
db.lists.update(
  { _id: ObjectId("584578319c234327441e842c") },
  {
    $set: {
      title: '国家',
      code: 'Country',
      detail: [
        {
          title: '澳大利亚',
          code: 'AU',
          seq: 1,
          allowSearch: true,
          items: [
            {
              title: '悉尼',
              code: 'SYD',
              seq: 1,
              allowSearch: true
            },
            {
              title: '墨尔本',
              code: 'MEL',
              seq: 2,
              allowSearch: true
            },
            {
              title: '布里斯班',
              code: 'BRI',
              seq: 3,
              allowSearch: true
            },
            {
              title: '黄金海岸',
              code: 'GC',
              seq: 4,
              allowSearch: true
            },
            {
              title: '阿德莱德',
              code: 'ALD',
              seq: 5,
              allowSearch: true
            },
            {
              title: '珀斯',
              code: 'PER',
              seq: 6,
              allowSearch: true
            }
          ]
        },
        {
          title: '美国',
          code: 'US',
          seq: 2,
          allowSearch: true,
          items: [
            {
              title: '纽约',
              code: 'NY',
              seq: 1,
              allowSearch: true
            },
            {
              title: '亚特兰大',
              code: 'ATL',
              seq: 2,
              allowSearch: true
            },
            {
              title: '旧金山',
              code: 'SF',
              seq: 3,
              allowSearch: true
            },
            {
              title: '洛杉矶',
              code: 'LC',
              seq: 4,
              allowSearch: true
            },
            {
              title: '华盛顿',
              code: 'WC',
              seq: 5,
              allowSearch: true
            },
            {
              title: '西雅图',
              code: 'SEA',
              seq: 6,
              allowSearch: true
            },
            {
              title: '芝加哥',
              code: 'CHI',
              seq: 7,
              allowSearch: true
            },
            {
              title: '奥克兰',
              code: 'OAK',
              seq: 8,
              allowSearch: true
            },
            {
              title: '达拉斯',
              code: 'DAL',
              seq: 9,
              allowSearch: true
            },
            {
              title: '休斯敦',
              code: 'HOU',
              seq: 10,
              allowSearch: true
            },
            {
              title: '迈阿密',
              code: 'MIA',
              seq: 11,
              allowSearch: true
            }
          ]
        },
        {
          title: '加拿大',
          code: 'CA',
          seq: 3,
          allowSearch: true
        },
        {
          title: '英国',
          code: 'UK',
          seq: 4,
          allowSearch: true
        },
        {
          title: '意大利',
          code: 'IT',
          seq: 5,
          allowSearch: true
        },
        {
          title: '葡萄牙',
          code: 'PT',
          seq: 6,
          allowSearch: true
        },
        {
          title: '日本',
          code: 'JP',
          seq: 7,
          allowSearch: true
        },
        {
          title: '马来西亚',
          code: 'MY',
          seq: 8,
          allowSearch: true
        },
        {
          title: '韩国',
          code: 'KR',
          seq: 9,
          allowSearch: true
        },
        {
          title: '泰国',
          code: 'TH',
          seq: 10,
          allowSearch: true
        },
        {
          title: '德国',
          code: 'DE',
          seq: 11,
          allowSearch: true
        }
      ]
    }
  },
  true
);

// Project.Status
db.lists.update(
  { _id: ObjectId("58453dac089da8c463f17f48") },
  {
    $set: {
      title: '状态',
      code: 'Project.Status',
      detail: [
        {
          title: '预售',
          code: 'P',
          seq: 1
        },
        {
          title: '热售中',
          code: 'A',
          seq: 2
        },
        {
          title: '全部售罄',
          code: 'S',
          seq: 3
        },
        {
          title: '下架',
          code: 'I',
          seq: 4
        }
      ]
    }
  },
  true
);

// Project.Tag
db.lists.update(
  { _id: ObjectId("5845627c089da8c463f17f4b") },
  {
    $set: {
      title: '项目标签',
      code: 'Project.Tag',
      detail: [
        {
          title: '允许贷款',
          code: 'MA',
          seq: 1
        },
        {
          title: '房屋托管',
          code: 'HM',
          seq: 2
        },
        {
          title: '包租协议',
          code: 'RE',
          seq: 3
        },
        {
          title: '移民身份',
          code: 'CI',
          seq: 4
        },
        {
          title: '绝佳位置',
          code: 'EL',
          seq: 5
        },
        {
          title: '精装修',
          code: 'BD',
          seq: 6
        }
      ]
    }
  },
  true
);

// Project.Class
db.lists.update(
  { _id: ObjectId("58456494089da8c463f17f4d") },
  {
    $set: {
      title: '项目类别',
      code: 'Project.Class',
      detail: [
        {
          title: '投资房',
          code: 'I',
          seq: 1
        },
        {
          title: '学区房',
          code: 'S',
          seq: 2
        },
        {
          title: '移民房',
          code: 'M',
          seq: 3
        }
      ]
    }
  },
  true
);

// Project.Type
db.lists.update(
  { _id: ObjectId("5845648f089da8c463f17f4c") },
  {
    $set: {
      title: '房子种类',
      code: 'Project.Type',
      detail: [
        {
          title: '别墅',
          code: 'H',
          seq: 1
        },
        {
          title: '公寓',
          code: 'A',
          seq: 2
        },
        {
          title: '连排别墅',
          code: 'V',
          seq: 3
        },
        {
          title: '土地',
          code: 'L',
          seq: 4
        },
        {
          title: '商用',
          code: 'B',
          seq: 5
        }
      ]
    }
  },
  true
);

db.lists.update (
  {_id: ObjectId("585b8f990df7bfa84cd6f837") },
  {
    $set: {
      title: '订单步骤',
      code: 'Order.step',
      detail: [
        {
          title: '已付订金',
          code: 'D',
          seq: 1
        },
        {
          title: '大订金',
          code: 'C',
          seq: 2
        },
        {
          title: '等待交房',
          code: 'W',
          seq: 3
        },
        {
          title: '贷款',
          code: 'L',
          seq: 4
        },
        {
          title: '付尾款',
          code: 'P',
          seq: 5
        },
        {
          title: '交房',
          code: 'DC',
          seq: 6
        }
      ]
    }
  },
  true
);
db.lists.update (
  {_id: ObjectId("5870a6ee0b9edb01185e6b2e") },
  {
    $set: {
      title: '咨询类别',
      code: 'Info.Type',
      detail: [
        {
          title: '不限',
          code: 'ALL',
        },
        {
          title: '移民',
          code: 'I',
        },
        {
          title: '投资',
          code: 'P',
          seq: 3
        },
        {
          title: '留学',
          code: 'S',
        },
        {
          title: '知识',
          code: 'K',
        },
        {
          title: '基金',
          code: 'F',
        },
        {
          title: '案例',
          code: 'E',
        },
      ]
    }
  },
  true
);
