<!--
 * @Author: your name
 * @Date: 2021-01-15 16:14:43
 * @LastEditTime: 2021-02-07 13:44:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \element_vue3.0\src\mock\modules\README.md
-->
# 文件结构说明
集中放置接口
## 接口描述
	userMenuList: {          //接口名称  必须
	  url: "/userMenuList",  //接口路径  必须
	  type: "post",	         //接口方法  必须
	  mock: true,            //是否启用mock 不设置为false  非必须
	  response: () => {      //mock的返回数据 非必须
	    return menuItem;
	  }
	}

	
## 菜单接口返回字段说明
	{
		id: 4,
		name: "标签四", 
		children: [                   //非必须
			{
				id: 5,                //必须且唯一
				name: "标签四一",      //必须
				url: "label4/Label41" //作为菜单项时必须
			}
		]
	},