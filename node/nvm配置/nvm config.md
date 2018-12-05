#nvm config:
##去github下载nvm安装包，并解压到一个英文文件夹内(dev),查看解压文件内有没有settings.txt文件,如果没有就手动新建一个;
##打开settings.txt文件,补充以下内容:
###root: C:dev\nvm
###path: C:dev\nodejs
###arch: 64
###proxy: 
保存settings.txt内容
##配置环境变量
###win+r ——>sysdm.cpl ——> 打开系统属性面板,选择高级选项—— >点击环境变量——>在弹出的面板中点击新增两个变量,输入变量名和变量值:
	%NVM_HOME%	C:dev\nvm
	%NVM_SYMLINK%	C:dev\nodejs
###在用户变量中选中path选项,点击编辑,在弹出的面板中点击编辑文本,%NVM_HOME%;%NVM_SYMLINK%;注意这两个变量不能有空格,分号为英文的
###最后点击保存并退出

#查看是否配置成功(或者powershell中输入dir env:[options])
##win+r ——> cmd ——> set [options]
###set NVM_HOME
###set NVM_SYMLINK
###set path

#查看nvm版本信息
##win+r ——> cmd ——> nvm

#npm config:
##打开cmd窗口，输入npm  config set prefix "C:\dev\nvm\npm",回车，可以在用户文件夹下找到一个.npmrc的文件，里面的内容是prefix=C:\dev\nvm\npm( 可以加入cache=C:\nvm\npm-cache这一行内容)
##继续在命令窗口输入npm  install -g npm,回车，以后只要用npm  -g 包名称就可以把包安装到全局路径下
##配置npm环境变量：变量名： NPM_HOME,变量值：C:\dev\nvm\npm,然后在path添加;%NPM _ HOME%,并且一定要添加在% NVM_SYMLINK%之前
##保存退出即可

#NRM config
##cmd窗口输入npm  install -g nrm
##查看镜像地址：nrm  ls
##切换地址： nrm use 地址