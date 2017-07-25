//
//  JJHtmlListener.m
//  Tachograph
//
//  Created by 刘毅 on 2017/6/28.
//  Copyright © 2017年 vpjacob. All rights reserved.
//

#import "JJHtmlListener.h"
#import "APIManager.h"
#import "APIWidgetContainer.h"
#import "APIEvent.h"
#import "APIWebView.h"
#import "APIScriptMessage.h"
#import "APIModuleMethod.h"

static JJHtmlListener *instance = nil;

@interface JJHtmlListener()<APIWebViewDelegate,APIModuleMethodDelegate,APIScriptMessageDelegate>
@property (nonatomic, strong) APIWidgetContainer *windowContainer;
@end

@implementation JJHtmlListener

+(instancetype)allocWithZone:(struct _NSZone *)zone
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [super allocWithZone:zone];
        [instance addObserver];
        [instance initSetting]; //初始化设置
    });
    return instance;
}

+(instancetype)manager
{
    return [[self alloc] init];
}

-(APIWidgetContainer *)getAPIWidgetContainer
{
    return self.windowContainer;
}

-(void)addObserver
{
    [[APIEventCenter defaultCenter] addEventListener:self selector:@selector(handleCallEvent:) name:@"call"];
}

-(void)initSetting
{
    
    [[APIManager sharedManager] setWebViewDelegate:self];
    [[APIManager sharedManager] setModuleMethodDelegate:self];
    [[APIManager sharedManager] setScriptMessageDelegate:self];
    
    [self addObserver];
    
    // 这里的widget://表示widget的根目录路径
    NSString *url = @"widget://html/equipment/allType.html";
    APIWidgetContainer *widgetContainer = [APIWidgetContainer widgetContainerWithUrl:url];
    [widgetContainer startLoad];
    self.windowContainer = widgetContainer;
}

#pragma mark - 监听html页面发送的事件
- (void)handleCallEvent:(APIEvent *)event {
    //接收到html页面发出的call消息，执行呼叫
    NSString *account = event.userInfo[@"account"];
    NSNumber *accountType = @([event.userInfo[@"accountType"] intValue]);
    ;
}

#pragma mark - APIWebViewDelegate
- (BOOL)webView:(APIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
    NSString *url = request.URL.absoluteString;
    if ([url hasPrefix:@"http://www.taobao.com"]) {
        return NO;
    } else if ([url hasPrefix:@"http://www.baidu.com"]) {
        return YES;
    }
    return YES;
}

#pragma mark - APIScriptMessageDelegate---监听
- (void)webView:(APIWebView *)webView didReceiveScriptMessage:(APIScriptMessage *)scriptMessage {

    
    //
    //    if ([scriptMessage.name isEqual:@"abc"]) {
    //        NSString *msg = [NSString stringWithFormat:@"收到来自Html5的操作请求，访问的名称标识为%@，传入的参数为:%@", scriptMessage.name, scriptMessage.userInfo];
    //                UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"" message:msg delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil];
    //                [alert show];
    //
    //        [webView sendResultWithCallback:scriptMessage.callback ret:@{@"result":@"value"} err:nil delete:YES];
    //    } else if ([scriptMessage.name isEqual:@"requestEvent"]) {
    //        [[APIEventCenter defaultCenter] sendEventWithName:@"fromNative" userInfo:@{@"value":@"哈哈哈，我是来自Native的事件"}];
    //    }
}

#pragma mark - APIModuleMethodDelegate
- (BOOL)shouldInvokeModuleMethod:(APIModuleMethod *)moduleMethod {
    if ([moduleMethod.module isEqualToString:@"api"] && [moduleMethod.method isEqualToString:@"sms"]) {
        return NO;
    }
    return YES;
}


@end
