#项目初始化
	1.安装vue-cli
		npm install -g vue-cli
	2.初始化项目
		vue init webpack 项目名称
	3.进入项目
		cd 项目名称
	4.安装依赖
		npm install
	5.启动项目
		npm run dev

#项目目录结构
	index.html: 项目根视图
	.postcssrc.js: postcss配置文件
	static: 静态文件目录

#vue基础
	Vue组件包含3个部分
		template: 视图，只能存在一个根标签
		script: 逻辑
		style:	样式
	Mustache: 模板
		表现形式: {{语法}} 注意：双大括号只能存在单行语句，有返回结果,并且不能作用在html标签的属性上
			{{变量名称}}
			{{1+1}}
			{{三目运算符}}
			{{'string'}}

	vue指令:
			v-html: 渲染文本,会解析文本中的html标签
			<p v-html='要渲染的文本'></p>
			v-text: 渲染文本,不会解析文本中html标签
			<p v-text='要渲染的文本'></p>
			v-bind: 绑定属性,简写:attribute=''
			<p v-bind:attribute = ''></p>
			v-once: 只渲染一次
			v-pre: 禁用标签里面的表达式{{}}

	条件渲染
		v-if
		v-else
		v-elseif
		v-show
		v-if与v-show的区别：v-if条件不成立时在html结构中不存在，v-show条件不成立时设置样式为display:none,v-if有更高的切换开销，v-show则是更高的初始渲染开销，因此条件变化不大用v-if,相反用v-show.
		<p v-if=''></p>
		<p v-else></p>

		<template v-if=''></template>
	列表渲染
		v-for
		<ul>
			<li v-for='(v,k) in collections' v-bind:key='k'></li>
		</ul>
		每个列表都要绑定一个key,并且这个key值是唯一的，同时为了提高性能尽量避免使用遍历对象或数组的下标
	事件监听
		v-on
		v-on:eventType='执行函数或语句'
		简写@eventType=''
		vue实例中methods对象中的方法
		事件修饰符
		v-on:eventType.事件修饰符=''
		键盘修饰符
		v-on:eventTtype.键盘修饰符=''
		鼠标按钮修饰符
		v-on:eventType.left/middle/right=''
	数组更新检测
		变异方法(能改变原数组的方法: pop,push,shift,unshift,splice,sort,reverse)：引起视图更新
		替换数组：不引起视图更新
		通过数组的下标或者对象的键名更新数据时：不引起视图更新
	
	计算属性(注意使用时不要带上括号)
		computed(sync同步操作)
		在computed中获取值时可以使用get方法，修改依赖data中的值是使用Vue.set/vm.$set方法
		与methods的区别：computed会缓存相关依赖的结果，当computed中的方法不发生任何改变时，不会重新计算，而methods中的方法每一次都会计算
	
	表单输入绑定
		v-model='': 双向数据绑定,一般与vue实例中的watch配合监听输入信息变化

		<template>
			<input type='text' v-model='msg'>
			{{msg}} //此处实时显示表单输入内容
		</template>
		<script>
			export default {
				el: '',
				data() {
					return {
						msg:''
					}
				},
				watch: {
					msg(data) {
						console.log(data); //实时监听内容变化,为异步操作
					}
				}
			}
			注意三者msg名称的一致性
		修饰符(对输入内容进行限制)
		v-model.lazy
		v-model.number
		v-model.trim

	class与style绑定
		绑定html class
		v-bind:class='{类名:布尔值}'
		:class = ['跟类名名称一样的数据']
		:class = '含有类名的数据对象'
		数组语法
		内联样式
		v-bind:sytle='{}'

#组件
	1.单文件组件基本结构
		template:只能有一个根标签
		script： 行为
		style ： 样式,有一个scoped属性，使得样式只在当前组件生效
		<template>
			<div class='name'></div>
		</template>
		<script>
			export default {
				name: '',
				data() {
					return {

					}
				}
			}
		</script>
		<style scoped>
			
		</style>
	2.父子组件
		父——>子: props
			数据传递类型验证
				数据类型验证
				多数据类型验证
				必选项require：boolean为true时与默认值互斥
				默认值default：与必选项Boolean为true时互斥
				obj,arr类型默认值： 设置默认值时要以函数的形式
			子组件不能直接修改父组件传递过来的数据，如果要改变可通过派发事件通知父组件修改，或者在子组件的data属性中复制传递过来的数据，然后对这个数据副本进行修改，这就是单向数据流
			validator：可以对传递过来的数据进行自定义的验证，是一个函数，参数值是传递过来的数据
		parent.vue:
			<template>
				<div class='parent'>
					<son v-bind:title='msg' :age='age' :num='num' :obj='obj'/>
				</div>
			</template>
			<script>
				import son from './son.vue'
				export default {
					name: 'parent',
					data() {
						return {
							msg: 'props'，
							age: 10,
							num: 5,
							obj: {
								name: 't-bin'
							}
						}
					},
					components: {
						son
					}
				}
			</script>
			<style scoped>
				
			</style>
		son.vue: 
			<template>
				<div class='son'>
					{{title}}
				</div>
			</template>
			<script>
				export default {
					name: 'son',
					data() {
						return {

						}
					},
					props: {
						age: [Number]
						title: {
							type: String,
							default: 
						},
						num: {
							type: Number,
							required: true
						},
						obj: {
							type: Object,
							default() {
								return {
									name: 'vue'
								}
							}
						}
					}
				}
			</script>
			<style scoped>
				
			</style>
		
		子——>父: $emit event
		parent.vue:
			<template>
				<div class='parent'>
					<son v-bind:title='msg' @parent='receive'/>
				</div>
			</template>
			<script>
				import son from './son.vue'
				export default {
					name: 'parent',
					data() {
						return {
							msg: 'props'，
							age: 10,
							num: 5,
							obj: {
								name: 't-bin'
							}
						}
					},
					components: {
						son
					},
					methods: {
						receive(data) {
							//data:子组件传递过来的数据
						}
					}
				}
			</script>
			<style scoped>
				
			</style>
		son.vue: 
			<template>
				<div class='son'>
					{{title}}
					<button @click='child'>btn</button>
				</div>
			</template>
			<script>
				export default {
					name: 'son',
					data() {
						return {

						}
					},
					props: {
						age: [Number]
						title: {
							type: String,
							default: 
						},
						num: {
							type: Number,
							required: true
						},
						obj: {
							type: Object,
							default() {
								return {
									name: 'vue'
								}
							}
						}
					},
					methods: {
						child(event) {
							//$emit(参数一(父组件要监听的事件)，参数二(要传递给父组件的data))
							this.$emit('parent', 'message');
						}
					}
				}
			</script>
			<style scoped>
				
			</style>
	3.插槽slot和缓存
		单个插槽
		具名插槽: 传递多个插槽接收时可以用一个父容器接收
		作用域插槽：数据是子组件传递给父组件，与父组件传子组件的props过程相反
			注意： 在2.5.0之前，必须使用在template上
		parent.vue:
			<template>
				<div class='parent'>
					<son>
						<!-- 不具名插槽 -->
						<p>i am the slot.</p>
						<!-- 具名插槽slot = '名称' 作用域插槽slot-scope='一个对象'-->
						<p slot='named' slot-scope='obj'>i am the named {{obj.title}}.</p>
					</son>
				</div>
			</template>
			<script>
				import son from './son.vue'
				export default {
					name: 'parent',
					data() {
						return {
							
						}
					},
					components: {
						son
					}
				}
			</script>
			<style scoped>
				
			</style>
		son.vue: 
			<template>
				<div class='son'>
					<!-- 不具名插槽 -->
					<slot>
						<p>如果不传递数据则显示</p>
					</slot>
					<!-- 具名插槽 name = '父组件里插槽的名称'-->
					<slot name='named' :title='msg'>传递数据</slot>
				</div>
			</template>
			<script>
				export default {
					name: 'son',
					data() {
						return {
							msg: 'slot'
						}
					},
					props: {
						age: [Number]
						title: {
							type: String,
							default: 
						},
						num: {
							type: Number,
							required: true
						},
						obj: {
							type: Object,
							default() {
								return {
									name: 'vue'
								}
							}
						}
					}
				}
			</script>
			<style scoped>
				
			</style>
		插槽中html标签的样式在父子组件中都生效，同时设置则子组件优先
	4.动态组件
		keep-alive：视图数据不发生改变时可以缓存动态组件，避免重新渲染
		parent.vue:
			<template>
				<div class='parent'>
					<!-- 方法1 -->
					<!-- {{currentView}} -->
					<!-- 方法2 -->
					<keep-alive><component :is='currentView'></component></keep-alive>
					<button @click='changeView'>change</button>
				</div>
			</template>
			<script>
				import son1 from './son1.vue'
				import son2 from './son2.vue'
				export default {
					name: 'parent',
					data() {
						return {
							msg: 'props'，
							age: 10,
							num: 5,
							obj: {
								name: 't-bin'
							},
							currentView: 'son1'
						}
					},
					components: {
						son1,
						son2
					},
					methods: {
						changeView() {
							this.currentView = 'son2';
						}
					}
				}
			</script>
			<style scoped>
				
			</style>
		son1.vue: 
			<template>
				<div class='son'>
					son1
				</div>
			</template>
			<script>
				export default {
					name: 'son',
					data() {
						return {

						}
					},
					
				}
			</script>
			<style scoped>
				
			</style>
		son2.vue: 
			<template>
				<div class='son'>
					son2
				</div>
			</template>
			<script>
				export default {
					name: 'son',
					data() {
						return {

						}
					},
					
				}
			</script>
			<style scoped>
				
			</style>
	5.is
		wrong:
			<table>
				<row></row>
				<row></row>
			</table>
		right:
			<table>
				<tr is='row'></tr>
				<tr is='row'></tr>
			</table>
		Vue.component('row', {
			template: '<tr><td></td></td>'	
		})
	6.ref
		通过ref属性操作dom或者获取组件的属性或方法
	7.给组件绑定原生事件，使用native修饰符
		<component @click.native='handle'></component>
		以上触发的是原生事件，而不是组件派发出来的事件
	8.非父子组件间传值(Bus/总线/发布订阅模式/观察者模式)
		<div id='app'>
			<child content='content1'></child>
			<child content='content2'></child>
		</div>
		<script>
			Vue.prototype.bus = new Vue();
			Vue.component('child', {
				data() {
					return {
						selfContent: this.content
					}
				},
				template: '<div @click="change">{{selfContent}}</div>'
				props: {
					content: {
						type: String
					}
				},
				methods: {
					change() {
						this.bus.$emit('change', this.selfContent);
					}
				},
				mounted() {
					let _this =this;
					this.bus.$on('change', function(msg) {
						_this.selfContent = msg;	
					})
				}
			})
			let vm =new Vue({
				el: '#app'
			})
		</script>
#动画与过渡
	注意：所有动画都是浮动的，所以会导致产生底部滚动条，可以用绝对定位解决
	1.在css过渡和动画中自动应用class
		过渡:
		v-enter: 开始
		v-enter-active: 过程
		v-enter-to: 结束
		v-leave: 开始
		v-leave-active: 过程
		v-leave-to: 结束
		注: v表示自定义的名称
		动画:
		v-enter-active:
		v-leave-active:
	2.可以配合使用第三方css动画库，如animate.css
		自定义类名(第三方库中动画的类名class)：
			enter-active-class = '自定义类名'
			leave-active-class = '自定义类名'
		引入第三方库的方法：
			1)在index.html中用link引入
			2)import 'xxx.css' (需要先安装到模块包中)
		<template>
			<div class='son'>
				<button @click='transition'>transition</button>
				<transition name='fade'>
					<p v-show='show'>show/hide</p>
				</transition>
				<button @click='animate'>animate</button>
				<transition name='ani'>
					<p v-show='show'>animate</p>
				</transition>
			</div>
		</template>
		<script>
			export default {
				name: 'son',
				data() {
					return {
						show: true,
						ani: true
					}
				},
				methods: {
					transition() {
						this.show = !this.show;
					},
					animate() {
						this.ani = !this.ani;
					}
				}
			}
		</script>
		<style scoped>
			.fade-enter-active, .fade-leave-active {
				transition: opacity .5s;
			}
			.fade-enter, .fade-leave-to {
				opacity: 0;
			}
			.fade-enter-to, .fade-leave {
				opacity: 1;
			}

			ani-enter-active {
				animation: bounce-in 1s ease;
			}
			ani-leave-active {
				animation: bounce-in 1s ease reverse;
			}
			@keyframes bounce-in {
				0% {
					transform: scale(0);
				}
				50% {
					transform: scale(1.5);
				}
				100% {
					transform: scale(1);
				}
			}
		</style>
	3.一些属性
		:duration-自定义动画时长
		type-在使用第三方动画库和同时设置自定义过渡时，设定以哪个时长为准
		appear,appear-active-class: 设定初始化时的动画，也就是刚进入页面时的动画
	4.更复杂的过渡：动态过渡，状态过渡(tweens.js)

#自定义指令
	1.在main.js中定义全局指令
		Vue.directive('focus', {
			inserted(el) {
				el.focus();
			}
		})
	2.在子组件中定义指令
		export default {
			name: '',
			data() {
				return {

				}
			},
			directives: {
				foucus: {
					inserted(el) {
						el.focus();
					}
				}
			}
		}
		v-directive在标签中调用

#过滤器
	filters: {
		name(val) {
			//对val进行处理
		}
	}
	{{text | name}}

#axios(更多细节参考github文档)
	1.安装 npm install axios --save-dev
	2.在main.js中引入
		import Axios from 'axios'
		Vue.prototype.$axios = Axios;
	3.在组件中使用
		import qs from 'qs'
		export default {
			name: '',
			data() {
				ruturn {

				}
			},
			created() {
				//get request(default)
				this.$axios('url',{params: {type: '',count: }}).then((res) => {
					console.log(res);
					}).catch((error) => {
						console.log(error);
						});
				//post request 
				this.$axios.post('url', qs.stringify({
					name: '',
					age: ''
					})).then((res) => {
						console.log(res);
						}).catch((error) => {
							console.log(error);
							})
			}
		}
		注意：axios接受的post请求参数的格式是form-data格式,引入qs模块对其进行处理
	4.拦截器：作用是对发送数据和响应结果进行检查，以保证数据正确

#跨域解决方法: 只适用于测试阶段
	1.在config文件夹中的index.js文件里找到以下属性并改写:
		//处理跨域请求
    proxyTable: {
        '/api': {
            target: 'url', //要跨域的地址
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
  2.在main.js文件中添加以下内容：
   	Vue.prototype.HOST = 'api';
  3.在axios请求中重新修改地址：
   	url: this.HOST + 'xxx'

#mock: 数据模拟
	1.自己创建json文件，使用get请求形式访问数据
		优点： 方便，快捷
		缺点： 只能get请求
	2.项目中集成服务器，模拟各种操作
		优点： 模拟真实线上环境
		缺点： 增加开发成本
	3.直接使用线上数据
		优点： 真实
		缺点： 不一定每个项目都存在
	4.数据模拟库：mockjs
		1)安装：npm install mockjs
		2)使用：
			var Mock = require('mockjs');
			var data = Mock.mock({
					// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
			    'list|1-10': [{
		        // 属性 id 是一个自增数，起始值为 1，每次增 1
		        'id|+1': 1
			    }]
				});
		3)输出结果：console.log(JSON.stringify(data, null, 4));

#路由vue-router
	1)安装：npm install vue-router --save-dev
	2)引入:
		import Vue from 'vue'
		import Router from 'vue-router'
		Vue.use(Router);
	3)配置路由文件
		var router = new Router({
			routes: {
				path: 'url',
				component: '对应的组件'
			}
		});
		以上内容一般提取到另外一个js文件对路由进行集中管理，再在主文件(main.js)中引入，并挂载到vue实例上
		new Vue({
			el: '#app',
			template: '<App/>',
			router,
			components: {
				App
			}
		})
	4)视图加载位置,在组件中显示
		<router-view></router-view>
		多视图路由:
			var router = new Router({
				routes: {
					path: 'url',
					components: {
						default: '默认显示组件',
						a: 'a组件',
						b: 'b组件'
					}
				}
			});
			<router-view></router-view>
			<router-view name='a'></router-view>
			<router-view name='b'></router-view>
	5)路由跳转
		router-link:
			//固定地址
			<router-link to='url'></router-link>
			//动态地址
			<router-link :to='url'></router-link>
			//
			<router-link to='{path: 'url'}'></router-link>
			js: this.$router.go(num), this.$router.push(url)
			watch router:
				var router = new Router({
					routes: {
						path: 'url',
						component: {
							template: '<div>{{$route.params.id}}</div>'
							beforeRouterUpdate(to, from, next) {
								//to: 
								//from:
								next(); //required
							}
						}
					}
				});
	6)路由嵌套
		export default new Router({
			routes: [{
				name: '',
				path: 'url',
				component: ,
				//嵌套路由
				children: [{
						name: '',
						path: '组件名称',
						component: 
					}]
			}]
		})
	7)路由传递参数
		<router-link :to='{name:'组件名称' ,params:{num: 123}}'></router-link>
		获取参数：$route.params.num
		<router-link :to='{path:'url' ,query:{num: 123}}'></router-link>
	8)路由高亮效果
		在router-link标签中添加exact属性，使得该链接在当前页面时处于激活状态
		<router-link to='url' exact></router-link>
		设置链接激活时使用的CSS类名.默认值可以通过路由的构造选项linkActiveClass来全局配置。
		默认值："router-link-active"
		在路由构造选项中修改默认值为'active'，便于设置样式：
			new Router({
				routes: {
					path: 'url',
					component: 
				}，
				linkActiveClass: 'active'
			})
			mode属性对url进行处理，默认值hash,可选值history|abstract(nodejs环境)

#饿了么Element组件库
	1)安装
		npm install element-ui --save-dev
	2)引入
		完整引入
		在main.js中写入以下内容：
			import Vue from 'vue';
			import ElementUI from 'element-ui';
			import 'element-ui/lib/theme-chalk/index.css';
			import App from './App.vue';

			Vue.use(ElementUI);
			new Vue({
			  el: '#app',
			  render: h => h(App)
			});
		需要注意的是，样式文件需要单独引入
		按需引入
			安装：npm i babel-plugin-component -D
			在.babelrc文件的相同属性添加以下内容：
				{
				  "presets": [["es2015", { "modules": false }]],
				  "plugins": [
				    [
				      "component",
				      {
				        "libraryName": "element-ui",
				        "styleLibraryName": "theme-chalk"
				      }
				    ]
				  ]
				}
	3)使用
			如果你只希望引入部分组件，比如Button和Select，那么需要在main.js中写入以下内容：
				import Vue from 'vue';
				import { Button, Select } from 'element-ui'; //引入ele的相关组件时要放在对象中
				import App from './App.vue';

				Vue.component(Button.name, Button);
				Vue.component(Select.name, Select);
				/* 或写为
				 * Vue.use(Button)
				 * Vue.use(Select)
				 */
				new Vue({
				  el: '#app',
				  render: h => h(App)
				});
			另外可以在子组件中这样使用
	
#Swiper	
	1)安装：npm install vue-awesome-swiper --save-dev
	2)引入
		//全局挂载
		import Vue from 'vue'
		import VueAwesomeSwiper from 'vue-awesome-swiper'
		// require styles
		import 'swiper/dist/css/swiper.css'
		Vue.use(VueAwesomeSwiper, /* { default global options } */)

		//组件挂载
		// require styles
		import 'swiper/dist/css/swiper.css'
		import { swiper, swiperSlide } from 'vue-awesome-swiper'
		export default {
		  components: {
		    swiper,
		    swiperSlide
		  }
		}
	3)使用
		方法一：SPA worked by the component, find swiper instance by ref attribute.
			<!-- The ref attr used to find the swiper instance -->
			<template>
			  <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
			    <!-- slides -->
			    <swiper-slide>I'm Slide 1</swiper-slide>
			    <swiper-slide>I'm Slide 2</swiper-slide>
			    <swiper-slide>I'm Slide 3</swiper-slide>
			    <swiper-slide>I'm Slide 4</swiper-slide>
			    <swiper-slide>I'm Slide 5</swiper-slide>
			    <swiper-slide>I'm Slide 6</swiper-slide>
			    <swiper-slide>I'm Slide 7</swiper-slide>
			    <!-- Optional controls -->
			    <div class="swiper-pagination"  slot="pagination"></div>
			    <div class="swiper-button-prev" slot="button-prev"></div>
			    <div class="swiper-button-next" slot="button-next"></div>
			    <div class="swiper-scrollbar"   slot="scrollbar"></div>
			  </swiper>
			</template>
			<script>
			  export default {
			    name: 'carrousel',
			    data() {
			      return {
			        swiperOption: {
			          // some swiper options/callbacks
			          // 所有的参数同 swiper 官方 api 参数
			          // ...
			        }
			      }
			    },
			    computed: {
			      swiper() {
			        return this.$refs.mySwiper.swiper
			      }
			    },
			    mounted() {
			      // current swiper instance
			      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
			      console.log('this is current swiper instance object', this.swiper)
			      this.swiper.slideTo(3, 1000, false)
			    }
			  }
			</script>
		方法二：SSR worked by the directive, find swiper instance by directive arg.
			<!-- You can custom the "mySwiper" name used to find the swiper instance in current component -->
			<template>
			  <div v-swiper:mySwiper="swiperOption" @someSwiperEvent="callback">
			    <div class="swiper-wrapper">
			      <div class="swiper-slide" v-for="banner in banners">
			        <img :src="banner">
			      </div>
			    </div>
			    <div class="swiper-pagination"></div>
			  </div>
			</template>
			<script>
			  export default {
			    data () {
			      return {
			        banners: [ '/1.jpg', '/2.jpg', '/3.jpg' ],
			        swiperOption: {
			          pagination: {
			            el: '.swiper-pagination'
			          },
			          // some swiper options...
			        }
			      }
			    },
			    mounted() {
			      setTimeout(() => {
			        this.banners.push('/4.jpg')
			        console.log('banners update')
			      }, 3000)
			      console.log(
			        'This is current swiper instance object', this.mySwiper, 
			        'It will slideTo banners 3')
			      this.mySwiper.slideTo(3, 1000, false)
			    }
			  }
			</script>

#vue-lazyload
	1)安装：npm install vue-lazyload -D
	2)引入
		在mian.js中
			import Vue from 'vue'
			import App from './App.vue'
			import VueLazyload from 'vue-lazyload'

			Vue.use(Vuelazylaod);
			//or with option
			Vue.use(Vuelazyload, {
				preload: 1.3,
				error: 'dist/error.png',
				loading: 'dist/loading.gif',
				attempt: 1
			});

			new Vue({
				el: 'body',
				components: {
					App
				}
			})
	3)使用
		<template>
		  <div ref="container">
     <img v-lazy="imgUrl"/>
     <div v-lazy:background-image="imgUrl"></div>

     <!-- with customer error and loading -->
     <img v-lazy="imgObj"/>
     <div v-lazy:background-image="imgObj"></div>

     <!-- Customer scrollable element -->
     <img v-lazy.container ="imgUrl"/>
     <div v-lazy:background-image.container="img"></div>

		    <!-- srcset -->
		    <img v-lazy="'img.400px.jpg'" data-srcset="img.400px.jpg 400w, img.800px.jpg 800w, img.1200px.jpg 1200w">
		    <img v-lazy="imgUrl" :data-srcset="imgUrl' + '?size=400 400w, ' + imgUrl + ' ?size=800 800w, ' + imgUrl +'/1200.jpg 1200w'" />
		  </div>
		</template>
		<script>
			export default {
			  data () {
			    return {
			    	//在js中引入本地图片，必须使用require来引入，如果是网络地址就直接使用
			      imgObj: {
			        src: require('xxx.png'),
			        error: require('xxx.png'),
			        loading: require('xxx.png')
			      },
			      imgUrl: 'http://xx.com/logo.png' // String
			    }
			  }
			}
		</script>

#rem&less
	1)rem处理
		在index.html的script标签中添加以下代码
		(function(doc, win) {
			var docEl = doc.documentElement,
					resizeEvt = 'orientationchange' in window? 'orientationchange': 'recalc',
					recalc = function() {
						var clientWidth = docEl.clientWidth;
						if(!clientWidth) return;
						if(clientWidth >= 750) {
							docEl.style.fontSize = '100px';
						}else {
							docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
						}
					}
			if(!doc.addEventListener) return;
			win.addEventListener(resizeEvt, recalc, false);
			doc.addEventListener('DOMContentLoaded', recalc, false);
		} (document, window));
	2)安装less和less-loader
		npm install less less-loader --save-dev
	3)修改配置bulid文件夹中webpack.base.conf.js文件
		在module属性的rules末尾添加以下内容：
			{
				test: /\.less/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			}
		如果在package.json文件中没有以上的3个loader，请使用npm安装补充
	4)使用
		在组件中的style标签上添加lang='less':
		<style scoped lang = 'less'></style>
	
#Vuex：当你必须依赖vuex来解决状态(数据)共享时，你就使用它
	1)安装：npm install vuex --save-dev
		view -> (dispatch) Action -> (Commit) Mutation ->(Mutate) State -> View
		注意: Action不是必需品，如果有异步操作才可能用到它，否则可以不使用它
	2)main.js中引入或单独提取到一个store.js文件中
		import Vue from 'vue'
		import Vuex from 'vuex'
		Vue.use(Vuex);
	3)main.js中使用或单独提取到一个store.js文件中
		//创建一个store
		const store = new Vuex.Store({
			state: {
				count: 0
			},
			mutations: {
				increment(state) {
					state.count++
				}
			}，
			actions: {
				//这里也可以更改状态(数据)
				increment(context) {
					context.commit('increment')
				}
			}
		});
		new Vue({
			el: '',
			template: '<App />',
			store,
			components: {App}
		})
	4)获取
		this.$store.state.count
	5)在methods添加方法来更改
		this.$store.commit: 'increment'

#npm发布组件
	1)npm官网注册账号
	2)cmd下登录账号： npm login
	3)发布： npm publish
	4)创建自己的组件
		初始化项目
		修改package.json文件
			'private': false
			'main': 'dist/vue-xx-counter.min.js'
	5)修改webpack.prod.config.js文件
		修改out输出目录
		删除无用内容
	6)修改输出
		修改mian.js文件，输出自己的组件

#vue-resource
	After vue 2.0 , it stop updating.

