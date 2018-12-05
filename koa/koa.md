KOA:
1.简单、第三方中间件 ->做东西
2.express、koa原理

koa本身、有用组件(cookie,session,static,中间件)

express和koa区别:
1.没有static->koa-static
2.koa强依赖router——>没有get,post,use也不能指定地址

ctx.req,ctx.res ->原生node的
ctx.request, ctx.response ->koa封装的