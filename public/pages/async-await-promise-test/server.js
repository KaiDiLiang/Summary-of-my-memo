const express = require('express');
const app = express();  // express.static 提供静态文件，就是html,css,js文件
app.use(express.static('public'));

/**
 * 数据返回到前端模块start
 * 只是简单实现功能,返回前端需要的数据,并没有做相应的数据验证处理
**/
  // 电话号码返回省和市,为了模拟延迟,使用setTimeout()
  app.post('/phoneLocation', (req, res) => {
    setTimeout(() => {
        res.json({
            success: true,
            obj: {
                province: '广东',
                city: '茂名'
            }
        })
    }, 1000);
  })

  // 返回面值列表(返回promise对象)
  app.post('/faceList', (req, res) => {
    setTimeout(() => {
        res.json(
            {
                success: true,
                obj:['￥20', '￥30', '￥50']
            }           
        )
    }, 1000);
  })   
/** 数据返回模块end */

app.listen(5000, () => {
    console.log('server start');
})