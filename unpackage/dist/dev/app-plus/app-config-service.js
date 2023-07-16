
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","navigationBar":{"backgroundColor":"#3c9cff","titleText":"咸虾米的圈子","type":"default","titleColor":"#ffffff"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"quanzi_ketang","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.8.7","entryPagePath":"pages/index/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#888","selectedColor":"#3c9cff","borderStyle":"black","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"/static/images/quanzi.png","selectedIconPath":"/static/images/quanzi-fill.png"},{"pagePath":"pages/self/self","text":"我的","iconPath":"/static/images/user.png","selectedIconPath":"/static/images/user-fill.png"}],"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/index/index","meta":{"isQuit":true,"isEntry":true,"isTabBar":true,"tabBarIndex":0,"navigationBar":{"type":"default"},"isNVue":false}},{"path":"pages/self/self","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"enablePullDownRefresh":false,"navigationBar":{"titleText":"个人中心","type":"default"},"isNVue":false}},{"path":"pages/edit/edit","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"发布长文","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate","meta":{"navigationBar":{"titleText":"注销账号","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/userinfo/userinfo","meta":{"navigationBar":{"titleText":"个人资料","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile","meta":{"navigationBar":{"titleText":"绑定手机号码","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage","meta":{"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/login/login-withoutpwd","meta":{"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/login/login-withpwd","meta":{"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/login/login-smscode","meta":{"navigationBar":{"titleText":"手机验证码登录","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/register/register","meta":{"navigationBar":{"titleText":"注册","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/register/register-by-email","meta":{"navigationBar":{"titleText":"邮箱验证码注册","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/retrieve/retrieve","meta":{"navigationBar":{"titleText":"重置密码","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email","meta":{"navigationBar":{"titleText":"通过邮箱重置密码","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/common/webview/webview","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"修改密码","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/register/register-admin","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"注册管理员账号","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"设置密码","type":"default"},"isNVue":false}},{"path":"uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"实名认证","type":"default"},"isNVue":false}},{"path":"pages/detail/detail","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"详情页","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  