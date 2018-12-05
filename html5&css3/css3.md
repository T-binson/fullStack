    div>p: 子代
    div+p： div后面相邻的第一个p
    div~p: div后面所有的兄弟p

#1、属性选择器：
    id选择器    #     通过id 来选择
    类名选择器  .     通过类名来选择
    属性选择器  []    通过标签属性来选择器

    语法：
    标志性符号：[]
    ^: 开头  $:结尾  *：包含
    E[title]  : 选中页面的E元素，并且E需要带有title属性
    E[title="abc"] :选中页面的E元素，并且E需要带有title属性,属性值为abc
    E[title^="abc"] :选中页面的E元素，并且E需要带有title属性,属性值以abc开头
    E[title$="abc"] :选中页面的E元素，并且E需要带有title属性,属性值以abc结尾
    E[title*="abc"] :选中页面的E元素，并且E需要带有title属性,属性值包含abc

#2、结构伪类选择器：
    E：first-child　选中父元素中的第一个子元素
    E：last-child　选中父元素中的最后一个子元素
    E：nth-child(5)　选中父元素中的第5个子元素
      n: 0,1,2,3,4。。。
      偶数： 2n  even
      奇数：2n-1 odd
      前5个： -n+5 不能写作n-5
    E：nth-last-child(3): 从后向前选择， 选中倒数第3个

    div:nth-child(9)

    注意：所选到的元素的类型 必须是指定的类型E,否则选择无效；

    E：empty 表示元素为空的状态
    E:target: 表示元素被激活的状态  要配合锚点使用

#伪元素：
    通过css模拟出html效果
    E::before
    E::after  必须有content 属性

    伪元素选择器：
        E::first-letter　选中第一个字母
        E::first-line选中第一行
        E::selection: 表示选择的区域 通过设置 color  background


#CSS3中新增了两种颜色模式：

    RGBA:     red  green blue (0-255)   alpha: 透明度 （0-1）

    HSLA:
        H:色调  0-360
        S:饱和度 0%-100%
        L:亮度    0%-100%
        A：alpha 透明度 0-1

#盒子模型：
    三个盒子： content-box   padding-box(各大浏览器暂不支持)  border-box
    box-sizing: border-box(内减模式)border-box(内减模式) /content-box（外加模式）(默认值)

    box-sizing: border-box   盒模型

    私有化前缀：
       浏览器私有化前缀：
          -webkit-: 谷歌 苹果
          -moz-:火狐
          -ms-：ie
          -o-：欧朋
		css3的样式不改变盒模型

#边框
    边框圆角：
        border-radius:30px;
        border-radius:30px 40px 50px 60px;
        赋值规律： 从左上开始，顺时针赋值，如果这个角没有值 ，去对角；
        border-radius: 40px/60px;(水平方向/垂直方向)
        优先赋值百分比，便于适配各种屏幕
    边框阴影：
        box-shadow: 水平位移  垂直位移  模糊程度  阴影大小  阴影颜色  外/内阴影(inset)

    边框图片：
        border-image-source: 图片路径
        border-image-slice: 裁剪
        border-image-width: 边框宽度
        border-image-repeat: 边框图片的平铺
            repeat:  图片显示不完整
            round: 图片平铺 优化了，图片会完整显示
            stretch: 拉伸

#背景：
    背景可以改变大小，可以有多个背景
    background-size:  30px 30px;
    background-size:  30% 30%;
    background-size:  cover; 覆盖
    background-size:  contain; 包含

    可以有多个背景:
        多个背景按照正常的语法格式书写，每个背景使用逗号隔开


    背景原点：
       background-origin:
           content-box
           padding-box(默认值)
           border-box

    背景裁剪
       background-clip:
           content-box
           padding-box
           border-box
#渐变
    线性渐变(属于背景图片)：
        background-image: linear-gradient(方向，起始颜色，终止颜色);

        方向：to left right bottom top   35deg(角度)

    径向渐变：
        background-image: radial-gradient(辐射半径，中心位置，起始颜色，终止颜色);
        中心点位置：at left right center bottom top
#过渡
    transition-property: 属性;控制需要过渡的属性
    transition-duration: 时间;控制时长
    transition-timing-function: linear/ease/ease-in/ease-out/ease-in-out;控制速度
    transition-delay: 延迟时间;控制延迟时长
    简写形式：
    transition: property duration timing-function delay,property duration timing-function delay...;
    transition: all duration;
#2D转换
    1、移动 translate(x, y) 可以改变元素的位置，x、y可为负值；
    a) 移动位置相当于自身原来位置
    b)  x轴方向向右，y轴正方向朝下，z轴方向朝向用户
    c) 除了可以像素值，也可以是百分比，相对于自身的宽度或高度
    d) 进行z轴平移时，给父盒子设置透视属性(perspective)呈现3d效果

    2、缩放 scale(x, y) 可以对元素进行水平和垂直方向的缩放，x、y的取值可为小数；

    3、旋转 rotate(deg) 可以对元素进行旋转，正值为顺时针，负值为逆时针；

    a) 当元素旋转以后，坐标轴也跟着发生的转变
    b) 调整顺序可以解决，把旋转放到最后

    4、倾斜 skew(deg, deg) 可以使元素按一定的角度进行倾斜，可为负值，第二个参数不写默认为0。

    5、矩阵matrix() 把所有的2D转换组合到一起，需要6个参数（了解）。

    6、transform-origin可以调整元素转换的原点

    7、透视属性：加给变换的父盒子，设置的是用户的眼睛距离平面的距离，呈现近大远小的效果

    我们可以同时使用多个转换，其格式为：transform: translate() rotate() scale() ...等，其顺序会影响转换的效果。
    注：因为涉及矩阵运算，所以无法通过dom操作获取变换的值，如旋转角度，如有需要先存起来
    		transform一定要加初始值,多个变换时，执行顺序倒序，即从后往前，原理跟矩阵乘法有关
#3d转换
    默认情况下所有元素都是呈现2d的，因此想要看到元素的3d效果，只要给元素的父元素添加transform-style: preserve-3d;就可以了(类似perspective属性)
    transform-style: preserve-3d;

    backface-visibility：设置元素背面是否可见

    伪元素获取自定义属性值
    <span data-text="txt">txt</span>
    <style>
      span::before {
        content: attr(data-text);/*content的内容为txt*/
      }
    </style>
#伸缩布局
    CSS3在布局方面做了非常大的改进，使得我们对块级元素的布局排列变得十分灵活，适应性非常强，其强大的伸缩性，在响应式开中可以发挥极大的作用。
##概念
    主轴：Flex容器的主轴主要用来配置Flex项目，默认是水平方向
    侧轴：与主轴垂直的轴称作侧轴，默认是垂直方向的
    方向：默认主轴从左向右，侧轴默认从上到下
    主轴和侧轴并不是固定不变的，通过flex-direction可以互换。

    1、必要元素：
      a、指定一个盒子为伸缩盒子 display: flex
      b、设置属性来调整此盒的子元素的布局方式 例如 flex-direction
      c、明确主侧轴及方向
      d、可互换主侧轴，也可改变方向
    2、各属性详解
      a、flex-direction调整主轴方向（默认为水平方向）
      该属性通过定义flex容器的主轴方向来决定felx子项在flex容器中的位置
        row            水平方向
        row-reverse    反转
        column         垂直方向
        column-reverse 反转列
      b、justify-content设置或检索弹性盒子元素(flex容器)在主轴（横轴）方向上的对齐方式。
        flex-start     起点对齐
        flex-end       终点对齐
        center         中间对齐
        space-around   环绕
        space-between  两端对齐
      c、flex控制子项目的缩放比例
        不指定flex 属性，则不参与分配
      d、align-items设置或检索弹性盒子元素(flex容器)在主轴（横轴）方向上的对齐方式。 
        flex-start     起点对齐
        flex-end       终点对齐
        center         中间对齐
        stretch:       拉伸
#web字体
##字体格式
  1、TureTpe(.ttf)
      .ttf字体是Windows和Mac的最常见的字体，是一种RAW格式，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome4+、Safari3+、Opera10+、iOS Mobile、Safari4.2+；
  2、OpenType(.otf)格式
     .otf字体被认为是一种原始的字体格式，其内置在TureType的基础上，支持这种字体的浏览器有Firefox3.5+、Chrome4.0+、Safari3.1+、Opera10.0+、iOS Mobile、Safari4.2+；
  3、Web Open Font Format(.woff)格式
     woff字体是Web字体中最佳格式，他是一个开放的TrueType/OpenType的压缩版本，同时也支持元数据包的分离，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome6+、Safari3.6+、Opera11.1+；
  4、Embedded Open Type(.eot)格式
     .eot字体是IE专用字体，可以从TrueType创建此格式字体，支持这种字体的浏览器有IE4+；
  5、SVG(.svg)格式
     .svg字体是基于SVG字体渲染的一种格式，支持这种字体的浏览器有Chrome4+、Safari3.1+、Opera10.0+、iOS Mobile Safari3.2+
  6、下载字体的网站.
     推荐http://www.zhaozi.cn/、http://www.youziku.com/ 查找更多中文字体
##引入相应的字体
     1、把下载的字体放到相应的字体文件中，如fonts
     2、在需要使用改字体的HTML中引入
        eg:
           <style>
              @font-face {
                font-family: "字体名称";
                src: url('../fonts/MiFie-Web-Font.eot');//字体路径
                src: url('../fonts/MiFie-Web-Font.eot?#iefix') format('embedded-opentype'), 
                url('../fonts/MiFie-Web-Font.woff') format('woff'), 
                url('../fonts/MiFie-Web-Font.ttf') format('truetype'), 
                url('../fonts/MiFie-Web-Font.svg#MiFie-Web-Font') format('svg');
              }
              .自定义某个字体类名 {
                font-family: "字体名称";
              }
           </style>
##字体图标
     优点：
          1、将所有图标打包成字体库，减少请求;
          2、具有矢量性，可保证清晰度;
          3、使用灵活，便于维护;
     相关资源：
          Font Awesome 使用介绍
          http://fontawesome.dashgame.com/
          定制自已的字体图标库
          http://iconfont.cn/
          https://icomoon.io/
          SVG素材
          http://www.iconsvg.com/
     使用方法：
          eg:
          @font-face {
            font-family: 'Wjs font';

            src: url('../fonts/MiFie-Web-Font.eot');
            src: url('../fonts/MiFie-Web-Font.eot?#iefix') format('embedded-opentype'), 
            url('../fonts/MiFie-Web-Font.woff') format('woff'), 
            url('../fonts/MiFie-Web-Font.ttf') format('truetype'), 
            url('../fonts/MiFie-Web-Font.svg#MiFie-Web-Font') format('svg');
          }
          .wjsFont {
            position: relative;
            top: 1px;
            display: inline-block;
            font-family: 'Wjs font';
            font-style: normal;
            font-weight: normal;
            line-height: 1;

            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .wjsfont-logo::before{
            content: '\e920';
          }
