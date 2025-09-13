const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// 配置marked选项
marked.setOptions({
  breaks: true,
  gfm: true
});

// 读取posts-data.js获取文章列表
const postsData = [
  {
    file: '20250715.md',
    date: '2025-07-15',
    title: '麦当劳里的思考：独立开发的孤独与坚持',
    tags: ['独立开发', 'App开发', '创业思考', '孤独感', '坚持', '麦当劳', '生活感悟'],
    image: 'posts/images/Snipaste_2025-09-13_14-52-08.jpg'
  },
  {
    file: '20250424.md',
    date: '2025-04-24',
    title: '记录生活：从自拍到期待爱情的时光',
    tags: ['生活记录', '自拍', '回忆', '爱情期待', '时间感', '情感随想'],
    image: 'posts/images/Snipaste_2025-09-13_14-50-23.jpg'
  },
  {
    file: '20241110.md',
    date: '2024-11-10',
    title: '独立开发反思：设计与完美主义的平衡',
    tags: ['独立开发', 'UI设计', 'Figma', '产品设计', '完美主义', '自我反思'],
    image: 'posts/images/IMG_1857.jpg'
  },
  {
    file: '20241007.md',
    date: '2024-10-07',
    title: '生活小记：感冒康复与日常温暖',
    tags: ['生活随想', '日常记录', '感冒', '康复', '3008', '小红书', '内容创作'],
    image: 'posts/images/IMG_3289.jpg'
  }
];

// 创建HTML目录
const htmlDir = path.join(__dirname, 'posts', 'html');
if (!fs.existsSync(htmlDir)) {
  fs.mkdirSync(htmlDir, { recursive: true });
}

// 转换函数
function convertMarkdownToHtml(mdFile) {
  const mdPath = path.join(__dirname, 'posts', mdFile);
  const htmlFile = mdFile.replace('.md', '.html');
  const htmlPath = path.join(htmlDir, htmlFile);
  
  try {
    // 读取markdown文件
    const mdContent = fs.readFileSync(mdPath, 'utf8');
    
    // 解析frontmatter（如果存在）
    let content = mdContent;
    let frontmatter = {};
    
    if (content.startsWith('---')) {
      const endIndex = content.indexOf('---', 3);
      if (endIndex !== -1) {
        const frontmatterText = content.slice(3, endIndex).trim();
        content = content.slice(endIndex + 3).trim();
        
        // 简单解析frontmatter
        frontmatterText.split('\n').forEach(line => {
          if (line.includes(':')) {
            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':').trim();
            frontmatter[key.trim()] = value;
          }
        });
      }
    }
    
    // 转换markdown为HTML
    const htmlContent = marked.parse(content);
    
    // 修复图片路径
    const fixedContent = htmlContent.replace(/src="images\//g, 'src="../images/');
    
    // 写入HTML文件
    fs.writeFileSync(htmlPath, fixedContent, 'utf8');
    
    console.log(`✅ 转换完成: ${mdFile} -> ${htmlFile}`);
    return true;
  } catch (error) {
    console.error(`❌ 转换失败: ${mdFile}`, error.message);
    return false;
  }
}

// 批量转换所有文章
console.log('开始转换markdown文件为HTML...');
let successCount = 0;
let totalCount = postsData.length;

postsData.forEach(post => {
  if (convertMarkdownToHtml(post.file)) {
    successCount++;
  }
});

console.log(`\n转换完成！成功: ${successCount}/${totalCount}`);

if (successCount === totalCount) {
  console.log('\n🎉 所有文件转换成功！');
  console.log('HTML文件已保存到: posts/html/ 目录');
} else {
  console.log('\n⚠️ 部分文件转换失败，请检查错误信息');
}