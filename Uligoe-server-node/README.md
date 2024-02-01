<p align="center">
    <img width="100" src="http://www.lifeshot.top/upload/d106dcf86139d1c1199744400.png" alt="uligoe logo" />
</p>

<p align="center"><b>Uligoe</b> 一个简单轻量化的个人博客系统。</p>

<p align="center">测试版本</p>


------------------------------



# Uligoe演示地址🚀

- 前台演示：[www.lfeshot.top](http://www.lifeshot.top)
- 管理后台演示：[www.lifeshot.top/admin](http://www.lifeshot.top/admin)
- 用户名：bulv
- 密码：123456



# Uligoe接口文档🚀

## 1、文章相关

### 1.1、发布文章接口

- 请求方法：**POST**

- 请求地址：`/api/article/upload`

- 请求参数：*携带token*

  | 字段名   | 类型   | 选择 | 描述                     |
  | -------- | ------ | ---- | ------------------------ |
  | id       | string | 可选 | 可选传入id，默认自动生成 |
  | status   | string | 可选 | 默认为公开，可选私密     |
  | title    | string | 必选 | 文章标题                 |
  | content  | string | 必选 | 文章内容                 |
  | belongTo | string | 必选 | 从属分类                 |
  | tags     | array  | 可选 | 标签                     |
  | bgImg    | string | 必选 | 封面                     |

- 返回示例：

  ```json
  {
      "code": 1,
      "msg": "发布文章成功"
  }
  ```

  

### 1.2、修改文章接口

- 请求方法：**POST**

- 请求地址：`/api/article/edit`

- 请求参数：*携带token*

  | 字段名   | 类型   | 选择 | 描述               |
  | -------- | ------ | ---- | ------------------ |
  | id       | string | 必选 | 目标文章的id       |
  | status   | string | 必选 | 修改目标文章的状态 |
  | title    | string | 必选 | 文章标题           |
  | content  | string | 必选 | 文章内容           |
  | belongTo | string | 必选 | 从属分类           |
  | tags     | array  | 可选 | 标签               |
  | bgImg    | string | 必选 | 封面               |

- 返回示例：

  ```json
  {
      "code": 1,
      "msg": "修改文章成功"
  }
  ```



### 1.3、回收文章接口

- 请求方法：**GET**

- 请求地址：`/api/article/recycle/:id`

- 请求参数：*携带token*

  | 字段名 | 类型                     | 选择 | 描述             |
  | ------ | ------------------------ | ---- | ---------------- |
  | id     | string                   | 必选 | 回收目标文章的id |
  | mode   | string：`delete|recover` | 可选 | 默认为delete     |

- 返回示例：

  ```json
  {
  	"code": 1,
      "msg": "回收文章成功"
  }
  ```



### 1.4、删除文章接口

- 请求方法：**GET**

- 请求地址：`/api/article/delete/:id`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述             |
  | ------ | ------ | ---- | ---------------- |
  | id     | string | 必选 | 删除目标文章的id |

- 返回示例：

  ```json
  {
  	"code": 1,
      "msg": "删除文章成功"
  }
  ```



### 1.5、获取文章列表接口(Beta)

- 请求方法：**POST**

- 请求地址：`/api/article`

- 请求参数：*可携带token，token有效的可以访问私密文章*

  | 字段名     | 类型    | 选择 | 描述                      |
  | ---------- | ------- | ---- | ------------------------- |
  | keyword    | string  | 可选 | 关键字筛选                |
  | categoryId | string  | 可选 | 分类条件筛选              |
  | tagId      | string  | 可选 | 标签条件筛选              |
  | isDeleted  | boolean | 可选 | 默认为false，true指回收站 |

- 返回示例：

  ```json
  {
  	"code": 1,
  	"msg": "获取文章列表成功",
  	"data":[
          {
  			"id": "70e6c77b-5ae2-47af-8276-97e0dbd00d2a",
  			"status": "公开",
  			"title": "这是文章的标题",
  			"content_url": "这是文章的内容文件地址",
  			"publish_time": "2022-06-28 10:10:00",
  			"visit_count": 1000,
  			"comment_count": 100,
  			"tag_list": [
  				{
  					"id": "5814570b-ef49-4836-a0c0-798235b52dce",
  					"title": "前端",
  					"color": "green"
  				}
  			],
  			"category": "前端",
              "bg_img": "/upload/123123.png"
  		}
      ]
      
  }
  ```
  
  

### 1.6、获取文章列表接口

- 请求方法：**GET**

- 请求地址：`/api/article`

- 请求参数：*可携带token，token有效的可以访问私密文章*

  | 字段名     | 类型    | 选择 | 描述                      |
  | ---------- | ------- | ---- | ------------------------- |
  | pageSize   | number  | 可选 | 默认为10                  |
  | pageNo     | number  | 可选 | 默认为1                   |
  | keyword    | string  | 可选 | 关键字筛选                |
  | categoryId | string  | 可选 | 分类条件筛选              |
  | tagId      | string  | 可选 | 标签条件筛选              |
  | isDeleted  | boolean | 可选 | 默认为false，true指回收站 |

- 返回示例：

  ```json
  {
  	"code": 1,
  	"msg": "获取文章列表成功",
  	"data": {
  		"list": [
  			{
  				"id": "70e6c77b-5ae2-47af-8276-97e0dbd00d2a",
  				"status": "公开",
  				"title": "这是文章的标题",
   				"content_url": "这是文章的内容文件地址",
  				"publish_time": "2022-06-28 10:10:00",
  				"visit_count": 1000,
  				"comment_count": 100,
  				"tag_list": [
  					{
  						"id": "5814570b-ef49-4836-a0c0-798235b52dce",
  						"title": "前端",
                          "color": "green"
  					}
  				],
  				"category": "前端"
  			}
  		],
		"pageNo": 1,
  		"pageSize": 10,
  		"total": 20
  	}
  }
  ```



### 1.7、获取文章内容接口

- 请求方法：**GET**

- 请求地址：`/api/articles/content/:id`

- 请求参数：

  | 字段名 | 类型   | 选择 | 描述     |
  | ------ | ------ | ---- | -------- |
  | id     | string | 必选 | 文章的id |

- 返回示例：

  ```json
  {
  	"code": 1,
  	"msg": "获取文章内容成功",
  	"data": {
  		"info": { /* 文章具体信息 */},
           "content": /* 文章具体内容 */
  	}
  }
  ```




## 2、分类相关

### 2.1、获取分类列表接口

- 请求方法：**GET**

- 请求地址：`/api/category`

- 请求参数：无

- 返回示例：

  ```JSON
  {
  	"code": 1,
      "msg": "获取分类列表成功",
      "data": [
          {
              "id": "70e6c77b-5ae2-47af-8276-97e0dbd00d2a",
              "title": "前端",
              "cover_img": "/upload/9136301621f5821b199df2d02.JPG",
              "description": "这是分类的描述文本，如果需要可以展示在页面上"
          }
      ]
  }
  ```



### 2.2、添加分类接口

- 请求方法：**POST**

- 请求地址：`/api/category/upload`

- 请求参数：*携带token*

  | 字段名      | 类型   | 选择 | 描述                     |
  | ----------- | ------ | ---- | ------------------------ |
  | id          | string | 可选 | 可选传入id，默认自动生成 |
  | title       | string | 必选 | 分类的标题               |
  | coverImg    | string | 必选 | 分类的背景图             |
  | description | string | 可选 | 分类的描述，默认为空     |

- 返回示例：

  ```json
  {
  	"code": 1,
      "msg": "添加分类成功"
  }
  ```

  

### 2.3、修改分类接口

- 请求方法：**POST**

- 请求地址：`/api/category/upload`

- 请求参数：*携带token*

  | 字段名      | 类型   | 选择 | 描述                 |
  | ----------- | ------ | ---- | -------------------- |
  | id          | string | 必选 | 修改目标分类的id     |
  | title       | string | 必选 | 分类的标题           |
  | coverImg    | string | 必选 | 分类的背景图         |
  | description | string | 可选 | 分类的描述，默认为空 |

- 返回示例：

  ```json
  {
  	"code": 1,
      "msg": "修改分类成功"
  }
  ```

  

### 2.4、删除分类接口

- 请求方法：**GET**

- 请求地址：`/api/category/delete/:id`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述             |
  | ------ | ------ | ---- | ---------------- |
  | id     | string | 必选 | 删除目标分类的id |

- 返回示例：

  ```json
  {
  	"code": 1,
      "msg": "删除分类成功"
  }
  ```

  



##  3、标签相关

### 3.1、获取标签列表接口

- 请求方法：**GET**

- 请求地址：`/api/tag`

- 请求参数：无

- 返回示例：

  ```JSON
  {
  	"code": 1,
      "msg": "获取标签列表成功",
      "data": [
          {
              "id": "70e6c77b-5ae2-47af-8276-97e0dbd00d2a",
              "title": "vue",
              "color": "rgb(60, 179, 113)"
          }
      ]
  }
  ```

  

### 3.2、添加标签接口

- 请求方法：**POST**

- 请求地址：`/api/tag/upload`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述                     |
  | ------ | ------ | ---- | ------------------------ |
  | id     | string | 可选 | 可选传入id，默认自动生成 |
  | title  | string | 必选 | 标签的标题               |
  | color  | string | 必选 | 标签的颜色               |

- 返回示例：

  ```json
  {
  	"code": 1,
      "msg": "添加标签成功"
  }
  ```

  

### 3.3、修改标签接口

- 请求方法：**POST**

- 请求地址：`/api/tag/edit`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述             |
  | ------ | ------ | ---- | ---------------- |
  | id     | string | 必选 | 修改目标标签的id |
  | title  | string | 必选 | 标签的标题       |
  | color  | string | 必选 | 标签的颜色       |

- 返回示例：

  ```json
  {
  	"code": 1,
      "msg": "修改标签成功"
  }
  ```

  

### 3.4、删除标签接口

- 请求方法：**GET**

- 请求地址：`/api/tag/delete/:id

- 请求参数：

  | 字段名 | 类型   | 选择 | 描述             |
  | ------ | ------ | ---- | ---------------- |
  | id     | string | 必选 | 删除目标标签的id |

- 返回示例：*携带token*

  ```json
  {
  	"code": 1,
      "msg": "删除标签成功"
  }
  ```

  

## 4、评论相关

### 4.1、发布评论接口

- 请求方法：**POST**

- 请求地址：`/api/comment/upload`

- 请求参数：

  | 字段名    | 类型                | 选择 | 描述                           |
  | --------- | ------------------- | ---- | ------------------------------ |
  | id        | string              | 可选 | 可选传入id，默认自动生成       |
  | status    | string：`公开|私密` | 可选 | 默认为公开                     |
  | content   | string              | 必选 | 评论内容                       |
  | user      | string              | 必选 | 评论者姓名                     |
  | email     | string              | 必选 | 评论中邮箱                     |
  | articleId | string              | 可选 | 评论的目标文章，不传为站点评论 |
  | replayTo  | string              | 可选 | 评论的目标评论                 |

- 返回示例：

  ```json
  {
      "code": 1,
      "msg": "评论发布成功"
  }
  ```

  

### 4.2、删除评论接口

- 请求方法：**GET**

- 请求地址：`/api/comment/delete/:id`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述             |
  | ------ | ------ | ---- | ---------------- |
  | id     | string | 必选 | 删除目标评论的id |

- 返回示例：

  ```json
  {
      "code": 1,
      "msg": "评论删除成功"
  }
  ```

  

### 4.3、获取评论接口

- 请求方法：**POST**

- 请求地址：`/api/comment`

- 请求参数：*可携带token，token有效的可以访问私密评论*

  | 字段名    | 类型                      | 选择 | 描述          |
  | --------- | ------------------------- | ---- | ------------- |
  | pageSize  | number                    | 可选 | 默认为10      |
  | pageNo    | number                    | 可选 | 默认为1       |
  | type      | string：`article|station` | 可选 | 默认为article |
  | articleId | string                    | 可选 | 默认筛选全部  |
  | keyword   | string                    | 可选 | 关键字筛选    |
  | replyTo   | string                    | 可选 | 回复的评论    |

- 返回示例：

  ```json
  {
  	"code": 1,
      "msg": "获取评论列表成功",
      "data": {
          "list": [
          	{
              	"id": "70e6c77b-5ae2-47af-8276-97e0dbd00d2a",
              	"status": "公开",
              	"content": "这是一条测试的评论:)",
              	"user": "bulv",
              	"email": "bulv0620@163.com",
              	"article_id": "80e6b77b-5ae2-47af-8276-97e0d1154d2a",
              	"publish_time": "2022-06-28 10:10:00",
              	"article_title": "这是目标文章的标题",
                  "reply_to": "",
                  "reply_count": 0
          	}
      	],
          "pageNo": 1,
          "pageSize": 10,
          "total": 20
      }
  }
  ```



## 5、文件相关

### 5.1、上传文件接口

- 请求方法：**POST**

- 请求地址：`/api/file/upload`

- 请求参数：*携带token*

  | 字段名 | 类型 | 选择 | 描述     |
  | ------ | ---- | ---- | -------- |
  | file   | file | 必选 | 文件内容 |

- 返回示例：

  ```JSON
  {
      "code": 1,
      "msg": "上传成功",
      "data": {
          "url": "/upload/9136301621f5821b199df2d02.JPG"
      }
  }
  ```



### 5.2、导入文件到库接口

- 请求方法：**POST**

- 请求地址：`/api/file/insert`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述                     |
  | ------ | ------ | ---- | ------------------------ |
  | id     | string | 可选 | 可选传入id，默认自动生成 |
  | name   | string | 必选 | 库里面显示文件的名字     |
  | url    | string | 必选 | 文件的访问位置           |
  | type   | string | 可选 | 可选传入类型，默认为img  |

- 返回示例：

  ```json
  {
  	"code": 1,
      "msg": "导入成功",
  }
  ```



### 5.3、获取文件列表接口

- 请求方法：**GET**

- 请求地址：`/api/file/:type`

- 请求参数：

  | 字段名 | 类型   | 选择 | 描述                    |
  | ------ | ------ | ---- | ----------------------- |
  | type   | string | 可选 | 可选传入类型，默认为img |

- 返回示例：

  ```json
  {
  	"code": 1,
  	"msg": "获取文件列表成功",
  	"data": [
  		{
  			"id": "70e6c77b-5ae2-47af-8276-97e0dbd00d2a",
              "name": "test"
              "url": "/upload/9136301621f5821b199df2d03.JPG"
  		}
  	]
  }
  ```




### 5.4、删除文件接口

- 请求方法：**GET**

- 请求地址：`/api/file/delete/:id/:filename`

- 请求参数：*携带token*

  | 字段名   | 类型   | 选择 | 描述                 |
  | -------- | ------ | ---- | -------------------- |
  | id       | string | 必选 | 删除目标文件的id     |
  | filename | string | 必选 | 删除目标文件的文件名 |

- 返回示例：

  ```json
  {
  	"code": 1,
  	"msg": "删除文件成功"
  }
  ```



##  6、管理员信息内容

### 6.1、管理员登录接口

- 请求方法：**POST**

- 请求地址：`/api/admin/login`

- 请求参数：

  | 字段名   | 类型   | 选择 | 描述   |
  | -------- | ------ | ---- | ------ |
  | username | string | 必选 | 用户名 |
  | password | string | 必选 | 密码   |

- 返回示例：

  ```JSON
  {
      "code": 1,
      "message": "登录成功",
      "data": {
          "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJidWx2IiwiaWF0IjoxNjU2NDAxOTQ5LCJleHAiOjE2NTY0MDIwMDl9.UvJ8DN_3zJbeEN92AMoHOOA4Q_arxnqVvQiYrf6dBo8"
      }
  }
  ```



### 6.2、管理员修改密码接口

- 请求方法：**POST**

- 请求地址：`/api/admin/pwd`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述   |
  | ------ | ------ | ---- | ------ |
  | oldPwd | string | 必选 | 旧密码 |
  | newPwd | string | 必选 | 新密码 |

- 返回示例：

  ```JSON
  {
  	"code": 1,
      "msg": "修改密码成功"
  }
  ```



### 6.3、管理员获取信息接口

- 请求方法：**GET**

- 请求地址：`/api/admin/info`

- 请求参数：无

- 返回示例：

  ```json
  {
  	"code": 1,
  	"msg": "获取信息成功",
  	"data": {
          "username": "admin",
  		"name": "bulv",
  		"github": "https://github.com/bulv0620",
  		"email": "bulv0620@163.com",
          "description": "这是一些描述信息，用于介绍博主"
  	}
  }
  ```



### 6.4、管理员修改信息接口

- 请求方法：**POST**

- 请求地址：`/api/admin/edit`

- 请求参数：*携带token*

  | 字段名      | 类型   | 选择 | 描述       |
  | ----------- | ------ | ---- | ---------- |
  | name        | string | 必选 | 姓名       |
  | github      | string | 必选 | github地址 |
  | email       | string | 必选 | 邮箱地址   |
  | description | string | 必选 | 描述信息   |

- 返回示例：

  ```JSON
  {
  	"code": 1,
  	"msg": "修改信息成功"
  }
  ```

  

## 7、链接相关

### 7.1、获取链接类别接口

- 请求方法：**GET**

- 请求地址：`/api/link/class`

- 请求参数：*携带token*

- 返回示例：

  ```JSON
  {
  	"code": 1,
  	"msg": "获取链接类别列表成功",
      "data": [
          {
              "id": "1",
              "title": "前端链接"
          }
      ]
  }
  ```

  

### 7.2、获取指定类别的链接接口

- 请求方法：**GET**

- 请求地址：`/api/link/list/:classId`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述     |
  | ------ | ------ | ---- | -------- |
  | class  | string | 必选 | 从属类别 |

- 返回示例：

  ```JSON
  {
  	"code": 1,
  	"msg": "获取指定链接列表成功",
      "data": [
          {
              "id": "1",
              "name": "我的博客",
              "url": "http://www.lifeshot.top/"
          }
      ]
  }
  ```




### 7.3、获取所有链接接口

- 请求方法：**GET**

- 请求地址：`/api/link/list`

- 请求参数：无

- 返回示例：

  ```JSON
  {
  	"code": 1,
  	"msg": "获取指定链接列表成功",
      "data": [
          {
              "id": "1",
              "title": "前端链接",
              "list": [
                  {
                      "id": "1",
                      "name": "我的博客",
                      "url": "http://www.lifeshot.top/"
                  }
              ]
          }
      ]
  }
  ```



### 7.4、添加类别接口

- 请求方法：**POST**

- 请求地址：`/api/link/add/class`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述     |
  | ------ | ------ | ---- | -------- |
  | title  | string | 必选 | 类别标题 |

- 返回示例：

  ```JSON
  {
  	"code": 1,
  	"msg": "添加类别成功"
  }
  ```



### 7.5、添加链接接口

- 请求方法：**POST**

- 请求地址：`/api/link/add`

- 请求参数：*携带token*

  | 字段名  | 类型   | 选择 | 描述       |
  | ------- | ------ | ---- | ---------- |
  | name    | string | 必选 | 链接名称   |
  | url     | string | 必选 | 链接地址   |
  | classId | string | 必选 | 从属分类id |

- 返回示例：

  ```JSON
  {
  	"code": 1,
  	"msg": "添加链接成功"
  }
  ```



### 7.6、删除链接类别接口

- 请求方法：**GET**

- 请求地址：`/api/link/delete/class/:id`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述   |
  | ------ | ------ | ---- | ------ |
  | id     | string | 必选 | 分类id |

- 返回示例：

  ```JSON
  {
  	"code": 1,
  	"msg": "删除类别成功"
  }
  ```



### 7.7、删除链接接口

- 请求方法：**GET**

- 请求地址：`/api/link/delete/:id`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述   |
  | ------ | ------ | ---- | ------ |
  | id     | string | 必选 | 链接id |

- 返回示例：

  ```JSON
  {
  	"code": 1,
  	"msg": "删除链接成功"
  }
  ```



### 7.8、更新类别顺序接口(Beta)

- 请求方法：**POST**

- 请求地址：`/api/link/pos`

- 请求参数：*携带token*

  | 字段名 | 类型  | 选择 | 描述                       |
  | ------ | ----- | ---- | -------------------------- |
  | list   | array | 必选 | 修改的类id和对应位置的数组 |

- 返回示例：

  ```JSON
  {
  	"code": 1,
  	"msg": "修改类别顺序成功"
  }
  ```



### 7.9、更新类别信息接口

- 请求方法：**POST**

- 请求地址：`/api/link/update/class`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述     |
  | ------ | ------ | ---- | -------- |
  | id     | string | 必选 | 类别id   |
  | title  | string | 必选 | 类别标题 |

- 返回示例：

  ```JSON
  {
  	"code": 1,
  	"msg": "更新类别成功"
  }
  ```



### 7.10、更新链接信息接口

- 请求方法：**POST**

- 请求地址：`/api/link/update`

- 请求参数：*携带token*

  | 字段名 | 类型   | 选择 | 描述     |
  | ------ | ------ | ---- | -------- |
  | id     | string | 必选 | 链接id   |
  | name   | string | 必选 | 链接名称 |
  | url    | string | 必选 | 链接地址 |

- 返回示例：

  ```JSON
  {
  	"code": 1,
  	"msg": "更新链接成功"
  }
  ```



## 8、数据信息

### 8.1、仪表盘数据接口

- 请求方法：**GET**

- 请求地址：`/api/dashboard`

- 请求参数：*携带token*

- 返回示例：

  ```json
  {
      "code": 1,
      "data": {
          "article_count": 3,
          "comment_count": 8,
          "visit_count": "22",
          "visit_count_list": [
              {
                  "date": "2022-07-07",
                  "visit_count": "0"
              },
              {
                  "date": "2022-07-06",
                  "visit_count": "0"
              },
              {
                  "date": "2022-07-05",
                  "visit_count": "0"
              },
              {
                  "date": "2022-07-04",
                  "visit_count": "0"
              },
              {
                  "date": "2022-07-03",
                  "visit_count": "0"
              },
              {
                  "date": "2022-07-02",
                  "visit_count": "0"
              },
              {
                  "date": "2022-07-01",
                  "visit_count": "0"
              }
          ]
      },
      "message": "获取仪表盘数据成功"
  }
  ```

  
