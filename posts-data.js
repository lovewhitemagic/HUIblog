// 文章数据配置文件
// 添加新文章时，只需在此数组中添加对应信息即可
const postsData = [
  {
    file: '20250715.html',
    date: '2025-07-15',
    title: '麦当劳里的思考：独立开发的孤独与坚持',
    tags: ['独立开发', 'App开发', '创业思考', '孤独感', '坚持', '麦当劳', '生活感悟'],
    image: 'posts/images/Snipaste_2025-09-13_14-52-08.jpg'
  },
  {
    file: '20250424.html',
    date: '2025-04-24',
    title: '记录生活：从自拍到期待爱情的时光',
    tags: ['生活记录', '自拍', '回忆', '爱情期待', '时间感', '情感随想'],
    image: 'posts/images/Snipaste_2025-09-13_14-50-23.jpg'
  },
  {
    file: '20241110.html',
    date: '2024-11-10',
    title: '独立开发反思：设计与完美主义的平衡',
    tags: ['独立开发', 'UI设计', 'Figma', '产品设计', '完美主义', '自我反思'],
    image: 'posts/images/IMG_1857.jpg'
  },
  {
    file: '20241007.html',
    date: '2024-10-07',
    title: '生活小记：感冒康复与日常温暖',
    tags: ['生活随想', '日常记录', '感冒', '康复', '3008', '小红书', '内容创作'],
    image: 'posts/images/IMG_3289.jpg'
  }
];

// 导出数据供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = postsData;
}